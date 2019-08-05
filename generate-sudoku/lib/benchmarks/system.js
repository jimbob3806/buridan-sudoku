// General imports
const fs = require("fs")

// Own imports
const { populationBenchmark } = require("./population")
const { pushRunJSON } = require("../../cli/pushRunJSON")
const { estTime } = require("../../cli/estTime")
const { cliConfig } = require("../../cli/config")
const populationJSON = require("./log/population.json")

// CLI EXECUTABLE FUNCTION
const systemBenchmark = (
    // System benchmark sample size may only be altered by the cli user by
    // altering the default config
    sampleSize = cliConfig.get("systemBenchmarkSampleSize")
) => {
    // Initiate run.json with function context information, and runData
    // object which may be changed  throughout this function, and pushed to
    // run.json for rendering in the cli using pushRunJSON
    const currentSystemAverageTime = cliConfig.get("systemAverageTime")
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
        EST_END_TIME: estTime(sampleSize * currentSystemAverageTime),
        RESULT: null,
        END_TIME: null
    }
    pushRunJSON(runData)
    // Track process time in seconds
    const startTime = process.hrtime()[0]
    let sumSampleTreeSize = 0
    for (let x = 1; x <= sampleSize; x ++) {
        // Generate a sudoku, and update the console to provide feedback to the
        // cli user
        sumSampleTreeSize = sumSampleTreeSize + populationBenchmark(1)[0]
        runData.MESSAGE = `${x} of ${sampleSize} samples complete`
        runData.PROGRESS = (x / sampleSize) * 100
        pushRunJSON(runData)
    }
    const endTime = process.hrtime()[0]
    // Work out an average time for generating a sudoku based on the mean time
    // for generating the above puzzles, and the mean treeSize of the generated
    // puzzles compared to the populationmean of treeSize
    const sampleMean = sumSampleTreeSize / sampleSize
    const correction =  sampleMean / populationJSON.populationMeanTreeSize
    const averageTime = Math.round(
        (endTime - startTime) / (sampleSize * correction)
    )
    // Set new calculated averageTime to the configstore
    cliConfig.set("systemAverageTime", averageTime)
    // Render result to console
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
