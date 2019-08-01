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
const _gradePuzzle = (puzzle, sampleSize, populationMean, populationStdDev) => {
    const treeSizeStats = treeSize(puzzle, sampleSize)
    const meanTreeSize = treeSizeStats.mean
    const stdDevTreeSize = treeSizeStats.stdDev
    const puzzleGrade = 
        gradePuzzle(meanTreeSize, populationMean, populationStdDev)
    // Return variables for array destructure by generateSudoku
    return [meanTreeSize, stdDevTreeSize, puzzleGrade]
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
        treeSizeSampleSize, 
        populationMeanTreeSize, 
        populationStdDevTreeSize
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

// Exports
module.exports = {
    generateSudoku: generateSudoku
}