// General imports
const fs = require("fs")

// Own imports
const { generateSolution } = require("./functions/generateSolution")
const { generatePuzzle } = require("./functions/generatePuzzle")
const { treeSize, gradePuzzle } = require("./functions/gradePuzzle")
const { shuffleArray, shuffleIndexArray } = require("./utils/shuffleArray")
const { emptySudoku } = require("./utils/emptySudoku")
const { encode } = require("./functions/sudokuEncode")
const packageJSON = require("../package.json")
const populationJSON = require("./benchmarks/log/population.json")

// Executes the generation of a solution using the logic found in ./functions
const _generateSolution = (seed) => {
    const solution = (solutionObject, recursions) => {
        if (solutionObject.isComplete) {
            return solutionObject.currentSolution
        } else if (recursions < 5000) {
            recursions += solutionObject.recursionCounter
            solutionObject.recursionCounter = 0
            return solution(
                generateSolution(...Object.values(solutionObject)), 
                recursions
            )
        } else {
            return solution({
                indexArray: shuffleArray(solutionObject.indexArray, seed),
                currentSolution: emptySudoku(),
                currentIndexPointer: 0,
                isComplete: false,
                recursionCounter: 0
            }, 0)
        }
    }
    const solutionArray = solution({
        indexArray: shuffleIndexArray(seed),
        currentSolution: emptySudoku(),
        currentIndexPointer: 0,
        isComplete: false,
        recursionCounter: 0
    }, 0)
    const solutionString = solutionArray.join("")
    // Return variables for array destructure by generateSudoku
    return [solutionString, solutionArray]
}
// Executes the generation of a puzzle using the logic found in ./functions
const _generatePuzzle = (seed, solution) => {
    const indexArray = shuffleIndexArray(seed + 1)
    const puzzleArray = generatePuzzle(indexArray, solution)
    const puzzleString = puzzleArray.join("") 
    // Return variables for array destructure by generateSudoku
    return [puzzleString, puzzleArray]
}
const _gradePuzzle = (puzzle, sampleSize) => {
    const { mean, stdDev } = treeSize(puzzle, sampleSize)
    const puzzleGrade = 
        gradePuzzle(mean)
    // Return variables for array destructure by generateSudoku
    return [mean, stdDev, puzzleGrade]
}

const generateSudoku = (
    seed = 1, 
    version = packageJSON.version,
    treeSizeSampleSize = populationJSON.treeSizeSampleSize,
    populationMeanTreeSize = populationJSON.populationMeanTreeSize,
    populationStdDevTreeSize = populationJSON.populationStdDevTreeSize
) => {
    // Not interested in nanosecond performance, as the function is expected to
    // run for a number of seconds - hence storing only second data figure 
    // process.hrtime()
    const timeStart = process.hrtime()[0]
    const [solutionString, solutionArray] = _generateSolution(seed)
    const [puzzleString, puzzleArray] = _generatePuzzle(seed, solutionArray)
    const [meanTreeSize, stdDevTreeSize, puzzleGrade] = _gradePuzzle(
        puzzleArray, 
        treeSizeSampleSize
    )
    const timeEnd = process.hrtime()[0]
    return {
        version: version,
        seed: seed,
        meanTreeSize: meanTreeSize,
        stdDevTreeSize: stdDevTreeSize,
        treeSizeSampleSize: treeSizeSampleSize,
        populationMeanTreeSize: populationMeanTreeSize,
        populationStdDevTreeSize: populationStdDevTreeSize,
        puzzleGrade: puzzleGrade,
        puzzleString: puzzleString,
        puzzleArray: puzzleArray,
        solutionString: solutionString,
        solutionArray: solutionArray,
        encodedSudoku: encode(solutionString, puzzleString),
        timeToCreate: timeEnd - timeStart,
        createdAt: Date()
    }
}

const batchGenerate = (puzzlesRemaining, seed, fields, path = null) => {
    // batchGenerate always called WITHOUT path, so if path is null, then the
    // destination file for sudokus generated may be assumed to not exist, as
    // each file is unique to number of sudokus, inital seed, and date executed
    if (!path) {
        const newFilename = 
            `${puzzlesRemaining}_${seed}_${new Date().getTime()}.json`
        const newPath = `${__dirname}/../out/${newFilename}`
        const sudokuData = {
            sudokus: []
        }
        const sudokuJSON = JSON.stringify(sudokuData)
        // create the destination file for sudokus
        fs.writeFileSync(newPath, sudokuJSON)
        // Continue with function execution with newPath populated...
        return batchGenerate(puzzlesRemaining, seed, fields, newPath)
    } else if (puzzlesRemaining <= 0) {
        return
    } else {
        const currentSudokus = JSON.parse(fs.readFileSync(path)).sudokus
        const newSudokuVerbose = generateSudoku(seed)
        // Populate a new object with only the fields requested by the cli
        const newSudokuObject = {}
        Object.keys(newSudokuVerbose).map(key => {
            if (fields.includes(`${key}`)) {
                newSudokuObject[key] = newSudokuVerbose[key]
            }
        })
        const sudokuData = {
            sudokus: [...currentSudokus, newSudokuObject]
        }
        const sudokuJSON = JSON.stringify(sudokuData)
        fs.writeFileSync(path, sudokuJSON)
        return batchGenerate(puzzlesRemaining - 1, seed + 1, fields, path)
    }
}

// Exports
module.exports = {
    generateSudoku: generateSudoku,
    batchGenerate:  batchGenerate
}