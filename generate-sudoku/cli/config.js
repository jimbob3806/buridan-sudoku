// General imports
const configstore = require("configstore")

// Own imports
const packageJSON = require("../package.json")

const cliConfig = new configstore(packageJSON.cliConfig, { 
    gradingSampleSize: 50,
    systemBenchmarkSampleSize: 10,
    numberOfSudoku: 100,
    sudokuFields: [
        "version",
        "seed",
        "puzzleGrade",
        "encodedSudoku",
        "createdAt"
    ],
    systemAverageTime: 10,
    generateSudokuPath: "./",
    gradePuzzlePath: "./puzzles.json",
    solvePuzzlePath: "./puzzles.json"
})

// cliConfig.set("systemAverageTime", 11)
// console.log(cliConfig.get("systemAverageTime"))

// Exports 
module.exports = {
    cliConfig: cliConfig
}

