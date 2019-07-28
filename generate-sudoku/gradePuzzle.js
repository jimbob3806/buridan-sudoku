// Own imports
const solvePuzzle = require("./solvePuzzle")

const sumArr = arr => {
    return arr.reduce((acc, cur) => {
        return acc + cur
    }, 0)
}

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

// Exports
module.exports = treeSize