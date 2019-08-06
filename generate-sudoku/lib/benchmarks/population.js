// General imports
const fs = require("fs")

// Own imports
const { generateSudoku } = require("../generateSudoku")
const { sumArray } = require("../utils/sumArray")
const { cliConfig } = require("../../cli/config/cli")

const populationBenchmark = sampleSize => {
    // Generate random seed array of consecutive seeds
    let seedArray = [Math.floor(Math.random() * (10 ** 6))]
    for (let x = 1; x < sampleSize; x ++) {
        seedArray.push(seedArray[0] + x)
    }
    // Generate array of treeSizes corresponding to the random seeds generated
    // above
    const treeSizeArray = seedArray.map(seed => {
        return generateSudoku(seed).meanTreeSize
    })
    // Sum of individual values in the array
    const sum = sumArray(treeSizeArray)
    // Sum of the squares of the individual values in the array
    const sumSquares = sumArray(treeSizeArray.map(val => { return val ** 2 }))
    const mean = sum / sampleSize
    // Array of the squares of the deviations from the mean value
    const squareDevMeanArr = treeSizeArray.map(value => {
        return (mean - value) ** 2
    })
    // Sum of the square of the deviaitions from the mean
    const sumSquareDevMean = sumArray(squareDevMeanArr)
    // Std deviation calc with Bassels correction given that this is a sample 
    // of an assumed normal population
    const stdDev = Math.sqrt(sumSquareDevMean / (sampleSize - 1))
    return [Math.round(mean), Math.round(stdDev), sum, 
        sumSquares, seedArray[0], treeSizeArray]
}

const updatePopulation = (sampleSize, sampleSum, sampleSumSquares) => {
    // Fetch old population.json values
    const populationJSON = 
        JSON.parse(fs.readFileSync(`${__dirname}/log/population.json`))
    // Set new values for the population statistics using old population 
    // statistics, and new stats to be added from function args. Note that 
    // sampleSum, and sampleSumSquares are kept a track of so that new 
    // standard deviation can always be calculated (as shown below). Obviously
    // we could not easily calculate a new standard deviation of the parent 
    // population given an "extra" standard deviation of a sample population -->
    // tracking sumx, and sumxsquared is therefore the easiest way to always be 
    // able to calculate the new population standard deviation
    const {
        populationSize, 
        populationSum, 
        populationSumSquares
    } = populationJSON
    const newPopulationSize = populationSize + sampleSize
    const newPopulationSum = populationSum + sampleSum
    // JS MAX SAFE INTEGER --> max safe integer poses no great risk to the
    // continued accuracy of these sum... values, since assuming a treeSize of
    // ~2000 (well over the average treeSize), treeSizeSquared becomes ~4e+6,
    // allowing for ~2e+12 samples before the JS MAX SAFE INT of ~2e+53 is
    // reached. This is WELL OVER the number of intended samples (~2000 tops)
    const newPopulationSumSquares = populationSumSquares + sampleSumSquares
    const newPopulationMeanTreeSize = newPopulationSum / newPopulationSize
    const newPopulationStdDevTreeSize = Math.sqrt(
        (newPopulationSize * newPopulationSumSquares - newPopulationSum ** 2) /
        (newPopulationSize ** 2 - newPopulationSize)
    )
    const data = {
        treeSizeSampleSize: populationJSON.treeSizeSampleSize,
        populationMeanTreeSize: Math.round(newPopulationMeanTreeSize),
        populationStdDevTreeSize: Math.round(newPopulationStdDevTreeSize),
        populationSize: Math.round(newPopulationSize),
        populationSum: Math.round(newPopulationSum),
        populationSumSquares: Math.round(newPopulationSumSquares)
    }
    // Write new population statistics to file
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/population.json`, 
        jsonData
    )
}

const updateRaw = rawTreeSizeArray => {
    // Append tressSizeArray values to relevant file for later 
    // analysis/reference
    const rawJSON = 
        JSON.parse(fs.readFileSync(`${__dirname}/log/raw.json`))
    const data = {
        treeSizeArray: [...rawJSON.treeSizeArray, ...rawTreeSizeArray]
    }
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/raw.json`, 
        jsonData
    )
}

const logBenchmark = sampleSize => {
    // Perform a population benchmark of a given sample size
    const [mean, stdDev, sum, sumSquares, startSeed, rawTreeSizes] = 
        populationBenchmark(sampleSize)
    // Write data to an individual json file
    const data = {
        startSeed: startSeed,
        sampleSize: sampleSize,
        sampleMean: mean,
        sampleStdDev: stdDev,
        sampleSum: sum,
        sampleSumSquares: sumSquares,
        rawTreeSizes: rawTreeSizes
    }
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/dump/${startSeed}_${sampleSize}.json`, 
        jsonData
    )
    // Write raw tree sizes to the relevant file
    updateRaw(rawTreeSizes)
    return updatePopulation(sampleSize, sum, sumSquares)
}

// Perform many population benchmarks, and log the results to relevant files,
// with basic feedback to the console. Having completed a large sample of 2000
// puzzles in order to generate the grading function, this function is no longer
// supported by the cli
const batchBenchmark = (
    batchSize = 10, 
    batchesRemaining = 10, 
    startTime = process.hrtime()[0]
) => {
    if (batchesRemaining <= 1) {
        // Perform last population benchmark
        console.log(`1 Batch remaining`)
        logBenchmark(batchSize)
        const populationJSON = 
            JSON.parse(fs.readFileSync(`${__dirname}/log/population.json`))
        const endTime = process.hrtime()[0]
        // Log batch process results to console
        const message = `Benchmark completed in ${endTime - startTime} seconds
new population summary statistics:`
        console.log(message)
        return console.log(populationJSON)
    } else {
        // Log some time/status feedback to console
        timeRemaining = 
            batchSize * batchesRemaining * cliConfig.get("systemAverageTime")
        console.log(`Started batch at ${Date()}
${batchesRemaining} batches remaining
Estimated time remaining: ${timeRemaining} seconds`)
        // Perform population benchmark
        logBenchmark(batchSize)
        // Recursively call batchBenchmark, decrementing batchesRemaining
        return batchBenchmark(batchSize, batchesRemaining - 1, startTime)
    }
}

// Exports
module.exports = {
    populationBenchmark: populationBenchmark,
    batchBenchmark: batchBenchmark
}