// Own imports
const { solvePuzzle } = require("./solvePuzzle")

// HELPER FUNCTIONS
// Simple reduce function to sum the values in an array
const sumArr = arr => {
    return arr.reduce((acc, cur) => {
        return acc + cur
    }, 0)
}

// Find treeSize of the sudoku puzzle, and return relevant summary statistics -
// treeSize or "entropy" of the puzzle may be used to calculate the difficulty 
// of the puzzle
const treeSize = (sudoku, sampleSize = 50) => {
    // Not interested in nanosecond performance, as the function is expected to
    // run for a number of seconds given a large enough sample size - hence
    // storing only second data from process.hrtime()
    const timeStart = process.hrtime()[0]
    let treeSizeArr = []
    for (let x = 0; x < sampleSize; x ++) {
        treeSizeArr.push(solvePuzzle([sudoku]).sumTreeSize)
    }
    const sum = sumArr(treeSizeArr)
    const mean = sum / sampleSize
    // Array of the squares of the deviations from the mean value
    const squareDevMeanArr = treeSizeArr.map(value => {
        return (mean - value) ** 2
    })
    // Sum of the square of the deviaitions from the mean
    const sumSquareDevMean = sumArr(squareDevMeanArr)
    // Std deviation calc with Bassels correction given that this is a sample 
    // of an assumed normal population
    const stdDev = Math.sqrt(sumSquareDevMean / (sampleSize - 1))
    const timeEnd = process.hrtime()[0]
    // Return mean, and standard deviation of treeSize (may by used as a 
    // measure of difficulty
    return {
        mean: Math.round(mean),
        stdDev: Math.round(stdDev),
        execTime: timeEnd - timeStart
    }
}

// Produce a grade for a puzzle of a given treeSize. Resultant grade is from 
// 1-1000 where:
//      * 1-200 is EASY PEASY / VERY EASY
//      * 201-400 is PEDESTRIAN / EASY
//      * 401-600 is AVERAGE JOE / MODERATE
//      * 601-800 is MILDLY INTIMIDATING / HARD
//      * 801-1000 is POSITIVELY NIGHTMARISH / VERY HARD
// If "x" is the number of standard deviations from the mean for a given tree
// size, then the difficulty, "y" may be calulated by using the following 
// sigmoid-like function:
//      y = 1000 / (1 + 2 ** (- 1.6 * x))
// This distribution produces the following results:
//      * VERY EASY PUZZLES are 1.25 stdDevs or more below the mean, forming
//      around 10.6% of the population
//      * EASY PUZZLES are 0.37 to 1.25 stdDevs below the mean, forming around
//      25.2% of the population
//      * MODERATE PUZZLES are from 0.37 below, to 0.37 stdDevs above the mean
//      forming around 28.6% of the population
//      * HARD PUZZLES are from 0.37 to 1.25 stdDevs above the mean, forming
//      arounf 25.2% of the population
//      * VERY HARD PUZZLES are 1.25 stdDevs or more above the mean, forming
//      around 10.6% of the population
// Default args for mean and stdDev of population treeSize may be found by
// making a large test sample of sudoku puzzles. This grading system relies on
// the difficulty of sudoku puzzles being roughly normally distributed given
// a sudoku which has had the maximum number of clues removed using a random 
// indexArray to remove cells (see ./generatePuzzle for more)
const gradePuzzle = (treeSize, mean = 500, stdDev = 50) => {
    // Calculate standard deviations from mean
    const stdDevFromMean = (treeSize - mean) / stdDev
    // Calculate grade as above
    const grade = 1000 / (1 + 2 ** (- 1.6 * stdDevFromMean))
    return Math.round(grade)
}

// Exports
module.exports = {
    treeSize: treeSize,
    gradePuzzle: gradePuzzle
}