// General imports
const fs = require("fs")

// Own imports
const { solvePuzzle, isUnique } = require("./solvePuzzle")
const { sumArray } = require("../utils/sumArray")
const { fetchPuzzles } = require("../utils/fetchPuzzles")
const { cliConfig } = require("../../cli/config/cli")
const { encode } = require("../utils/sudokuEncode")

// Find treeSize of the sudoku puzzle, and return relevant summary statistics -
// treeSize or "entropy" of the puzzle may be used to calculate the difficulty 
// of the puzzle
const treeSize = (sudoku, sampleSize = cliConfig.get("gradingSampleSize")) => {
    // Not interested in nanosecond performance, as the function is expected to
    // run for a number of seconds given a large enough sample size - hence
    // storing only second data from process.hrtime()
    const timeStart = process.hrtime()[0]
    let treeSizeArray = []
    for (let x = 0; x < sampleSize; x ++) {
        treeSizeArray.push(solvePuzzle([sudoku]).sumTreeSize)
    }
    const sum = sumArray(treeSizeArray)
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
// NOTE: 
//      The grading function was originally based on the assumption that sudoku
//      puzzle treeSizes were normally distributed across the population (using
//      standard deviation from population mean treeSize to determine 
//      difficulty). On a sample of 2000 sudoku puzzles, the raw treeSize data
//      for which may be found at ../benchmarks/log/raw.json, the population
//      was found not to be normally distributed, so the following custom 
//      function was implemented instead.
// If "x" is the number of mean treeSize from the mean for a given sudoku, then 
// the difficulty, "y" may be calulated by using the following sigmoid-like 
// function:
//      y = (1000 / (1 + 3.5 ** (- 0.0055 * (x - 220)))) - 175
// This distribution produces the following results:
//      * VERY EASY PUZZLES are of treeSize 0-146, and form about 13.5% of the
//      population
//      * EASY PUZZLES are of treeSize 147-264, and form about 25.6% of the
//      population
//      * MODERATE PUZZLES are of treeSize 265-399, and form about 22.8% of the
//      population
//      * HARD PUZZLES are of treeSize 400-754, and form about 23.1% of the
//      population
//      * VERY HARD PUZZLES are of treeSize 755 and up, and form about 15.0% of 
//       the population
// The grading function, and the numbers above (relating to how much of the
// population each difficulty level accounts for), were found by playing with
// sigmoid functions on a graphing calculator, until a function was found that 
// produced 3 approximately equally sized "mid difficulty" bands, and 2
// approximately equally sized "tail difficulty" bands, based on the treeSizes
// of a sample population of 2000 sudoku puzzles (looking through the treeSizes
// to find how many puzzles were between each set of values above - for example,
// about 13.5% of the treeSizes were 146 or less, and 146 maps to 200 in the
// grading function)
const gradePuzzle = treeSize => {
    // Calculate grade as explained above (explicit brackets used for clarity)
    const grade = (1000 / (1 + 3.5 ** (- 0.0055 * (treeSize - 220)))) - 175
    return Math.round(grade)
}

// solves puzzles from a supplied file, and writes results back to that file
const batchGradePuzzle = file => {
    const puzzles = fetchPuzzles(file)
    // Find solutions to puzzles, returning message if there is no unique 
    // solution
    const solutions = puzzles.map(puzzle => {
        const solutionArray = solvePuzzle([puzzle]).puzzles
        return isUnique(solutionArray) ? solutionArray[0] : "MULTIPLE SOLUTIONS"
    })
    // Calculate puzzle grade, as long as there is a unique solution
    const grades = solutions.map((solution, index) => {
        return solution === "MULTIPLE SOLUTIONS" ? "MULTIPLE SOLUTIONS" :
            gradePuzzle(treeSize(puzzles[index]).mean)
    }) 
    // Create comprehensive grade and solution object for each requested puzzle
    // (may as well pass solution alongside grade, as solution must be 
    // calculated anyway to see if puzzle has unique solution)
    const solutionsData = {
        puzzles: solutions.map((solution, index) => {
            return {
                puzzleArray: puzzles[index],
                puzzleString: puzzles[index].join(""),
                encodedSudoku: solution === "MULTIPLE SOLUTIONS" ? null :
                    encode(solution.join(""), puzzles[index].join("")),
                puzzleGrade: grades[index],
                solution: {
                    // Will obviously return "MULTIPLE SOLUTIONS" automatically
                    // if there were multiple solutions
                    solutionArray: solution,
                    solutionString: solution === "MULTIPLE SOLUTIONS" ? null :
                        solution.join("")
                }
            }
        })
    }
    // Write solutions back to original file
    const solutionsJSON = JSON.stringify(solutionsData)
    return fs.writeFileSync(file, solutionsJSON)
}

// Exports
module.exports = {
    treeSize: treeSize,
    gradePuzzle: gradePuzzle,
    batchGradePuzzle: batchGradePuzzle
}