// General imports
const fs = require("fs")

// Own imports
const { populationBenchmark } = require("./population")
const { pushRunJSON } = require("../../cli/pushRunJSON")
const { estTime } = require("../../cli/estTime")
const systemJSON = require("./log/system.json")
const populationJSON = require("./log/population.json")

// CLI EXECUTABLE FUNCTION
const systemBenchmark = (sampleSize = 10) => {
    // Initiate run.json with function context information, and runData
    // object which may be changed  throughout this function, and pushed to
    // run.json for rendering in the cli using pushRunJSON
    const runData = {
        // Any odd spacing in template strings accomodate for layout in the cli
        CURRENT_FUNCTION: "systemBenchmark",
        SHORT_DESC:      `Find the average time in which your system is capable 
                          of generating a complete puzzle. This process may take
                          a while (approximately 60 - 180 seconds, depending on 
                          system performance)`,
        MESSAGE: "Function is starting, please wait...",
        PROGRESS: 0,
        START_TIME: new Date(),
        EST_END_TIME: estTime(sampleSize * systemJSON.averageTime),
        RESULT: null,
        END_TIME: null
    }
    pushRunJSON(runData)
    const startTime = process.hrtime()[0]
    let sumSampleTreeSize = 0
    for (let x = 1; x <= sampleSize; x ++) {
        sumSampleTreeSize = sumSampleTreeSize + populationBenchmark(1)[0]
        runData.MESSAGE = `${x} of ${sampleSize} samples complete`
        runData.PROGRESS = (x / sampleSize) * 100
        pushRunJSON(runData)
    }
    const endTime = process.hrtime()[0]
    const sampleMean = sumSampleTreeSize / sampleSize
    const correction =  sampleMean / populationJSON.populationMeanTreeSize
    const averageTime = Math.round(
        (endTime - startTime) / (sampleSize * correction)
    )
    const data = { averageTime: averageTime }
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/system.json`, 
        jsonData
    )
    runData.RESULT =     `Benchmark completed in ${endTime - startTime} seconds
                          System average time: ${averageTime} seconds
                          This time is an average/estimated time for the 
                          complete generation, and grading, of 1 sudoku puzzle, 
                          based on the performance of this system on 
                          ${sampleSize}, random samples of puzzle generations.`
    runData.END_TIME = new Date()
    return pushRunJSON(runData)
}

// Exports
module.exports = {
    systemBenchmark: systemBenchmark
}
