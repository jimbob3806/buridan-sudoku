// General imports
const configstore = require("configstore")

// Own imports
const packageJSON = require("../../package.json")

const cliConfig = new configstore(packageJSON.cliConfig, { 
    // Sample size used when grading sudokus, or completing system benchmark
    gradingSampleSize: 50,
    systemBenchmarkSampleSize: 10,
    // Default number of sudokus to generate, dir to save file to, and default
    // fields to save
    numberOfSudoku: 100,
    sudokuFields: [
        "version",
        "seed",
        "puzzleGrade",
        "encodedSudoku",
        "createdAt"
    ],
    // Track system average time
    systemAverageTime: 10,
    // Default paths for loading/saving files
    generateSudokuPath: "./",
    gradePuzzlePath: "./puzzles.json",
    solvePuzzlePath: "./puzzles.json"
})

// Exports 
module.exports = {
    cliConfig: cliConfig
}

