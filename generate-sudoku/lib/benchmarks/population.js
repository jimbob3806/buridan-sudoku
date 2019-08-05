// General imports
const fs = require("fs")

// Own imports
const { generateSudoku } = require("../generateSudoku")
const { sumArray } = require("../utils/sumArray")
const { cliConfig } = require("../../cli/config")

const populationBenchmark = sampleSize => {
    let seedArray = [Math.floor(Math.random() * (10 ** 6))]
    for (let x = 1; x < sampleSize; x ++) {
        seedArray.push(seedArray[0] + x)
    }
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
    // Update population.json with new values 

    // Make note on js max int!!!

    const populationJSON = 
        JSON.parse(fs.readFileSync(`${__dirname}/log/population.json`))
    const {
        populationSize, 
        populationSum, 
        populationSumSquares
    } = populationJSON
    const newPopulationSize = populationSize + sampleSize
    const newPopulationSum = populationSum + sampleSum
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
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/population.json`, 
        jsonData
    )


}

const updateRaw = rawTreeSizeArray => {
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
    const [mean, stdDev, sum, sumSquares, startSeed, rawTreeSizes] = 
        populationBenchmark(sampleSize)
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
    updateRaw(rawTreeSizes)
    return updatePopulation(sampleSize, sum, sumSquares)
}

// CLI EXECUTABLE FUNCTION
const batchBenchmark = (
    batchSize = 10, 
    batchesRemaining = 10, 
    startTime = process.hrtime()[0]
) => {
    if (batchesRemaining <= 1) {
        console.log(`1 Batch remaining`)
        logBenchmark(batchSize)
        const populationJSON = 
            JSON.parse(fs.readFileSync(`${__dirname}/log/population.json`))
        const endTime = process.hrtime()[0]
        const message = `Benchmark completed in ${endTime - startTime} seconds
new population summary statistics:`
        console.log(message)
        return console.log(populationJSON)
    } else {
        timeRemaining = 
            batchSize * batchesRemaining * cliConfig.get("systemAverageTime")
        console.log(`Started batch at ${Date()}
${batchesRemaining} batches remaining
Estimated time remaining: ${timeRemaining} seconds`)
        logBenchmark(batchSize)
        return batchBenchmark(batchSize, batchesRemaining - 1, startTime)
    }
}

// Exports
module.exports = {
    populationBenchmark: populationBenchmark,
    batchBenchmark: batchBenchmark
}