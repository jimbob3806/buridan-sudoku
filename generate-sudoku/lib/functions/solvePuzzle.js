// General imports
const fs = require("fs")

// Own imports
const { candidates } = require("../utils/fetchCell")
const { insertAnswer } = require("../utils/insertAnswer")
const { fetchPuzzles } = require("../utils/fetchPuzzles")
const { encode } = require("../utils/sudokuEncode")

// Takes single puzzle, and returns an array of possible next puzzles based on
// cell with the least possible candidates (selects random cell if many cells
// with same number of candidates exists) - returns a sudoku for each of those
// candidates
const step = sudoku => {
    const candidateArray = sudoku.map((_, index) => {
        return {
            candidates: candidates(sudoku, index),
            cell: index
        }
    })
    // Reduce candidate array to cells which have least number of
    // candidates
    minimumCandidateArray = candidateArray.reduce((acc, cur) => {
        if (sudoku[cur.cell] !== 0) {
            // Ignore if the cell is already populated with an answer
            return acc
        } else if (cur.candidates.length === acc[0]) {
            // Append cur cell if it has same number of candidates as the acc
            // length indicator
            return [...acc, cur]
        } else if (cur.candidates.length < acc[0]) {
            // Rewrite acc if cur cell candidates are less
            return [cur.candidates.length, cur]
        } else {
            // Do nothing if cur cell has more candidates
            return acc
        }
    }, [Infinity])
    // Select a random cell from the array of minimum candidate cells, after
    // first dropping the length indicator at the front of the array
    minimumCandidateArray.shift()
    chosenCandidate = minimumCandidateArray[
        Math.floor(Math.random() * minimumCandidateArray.length)
    ]
    // Check to see if there are any cells with no candidates (invalid sudoku)
    if (chosenCandidate.candidates.length === 0) {
        // Remove sudoku from current tree, as it is the wrong answer!
        return []
    } else {
        // Return an array of new sudokus, using each candidate to populate the 
        // selected cell
        const sudokus = chosenCandidate.candidates.map(value => {
            // Populate chosen cell with one of the candidates
            return insertAnswer(sudoku, value, chosenCandidate.cell)
        })
        return sudokus
    }
}

// Reduces array of puzzles, and returns true if they are all complete
const checkPuzzles = puzzleArray => {
    return puzzleArray.reduce((acc, cur) => {
        if (!acc) {
            // Continue to return false if one puzzle is incomplete
            return false
        } else {
            // See if cur puzzle is complete
            return cur.reduce((bool, cell) => {
                // Continue to return false if one cell is not filled, otherwise
                // check if cur cell is filled
                return !bool ? false : (cell === 0 ? false : true)
            }, true)
        }
    }, true)
}

const solvePuzzle = (puzzleArray, curTreeSize = 1, sumTreeSize = 1) => {  
    if (checkPuzzles(puzzleArray)) {
        // check if all puzzles in the array are completed, and return function 
        // arguments. If all of the puzzles in puzzleArray are not the same,
        // completed puzzle, then the initial puzzle obviously does not have a
        // unique solution, and may be discounted. sumTreeSize
        // may be used to approximate the difficulty of the puzzle (the larger
        // the value, the harder the puzzle)
        return {
            puzzles: puzzleArray,
            curTreeSize: curTreeSize, 
            sumTreeSize: sumTreeSize
        }
    } else {
        // Calulate next step in the tree of puzzles
        newpuzzleArray = puzzleArray.reduce((acc, cur) => {
            return [...acc, ...step(cur)]
        }, [])
        // Call solvePuzzle recursively (with updated tree size values) until
        // puzzle is solved
        const newTreeSize = puzzleArray.length
        const newSumSize = sumTreeSize + newTreeSize
        return solvePuzzle(newpuzzleArray, newTreeSize, newSumSize)
    }
}

// Returns true if the puzzleArray produced by solvePuzzle is formed of
// identical solutions (i.e. there is a unique solution to the puzzle)
const isUnique = solutionArray => {
    if (solutionArray.length === 1) {
        // If there is only one puzzle in the array, then newPuzzle has a unique
        // solution
        return true
    } else {
        firstSolution = solutionArray[0]
        // Check to see if all puzzles returned by solvePuzzle are the same. If
        // they are, then the puzzle obviously still has a unique solution, and
        // so the newPuzzle may be passed on to remove more clues. Otherwise,
        // old puzzle should be kept
        return solutionArray.reduce((acc, cur) => {
            if (!acc) {
                // If one puzzle has been found to be different, continue to 
                // return false
                return false
            } else if (cur === firstSolution) {
                // Continue to return true if puzzles are the same
                return acc
            } else {
                // Return false otherwise - i.e. if puzzles are different
                return false
            }
        }, true)
    }
}

// solves puzzles from a supplied file, and writes results back to that file
const batchSolvePuzzle = file => {
    const puzzles = fetchPuzzles(file)
    // Find solutions to puzzles, returning message if there is no unique 
    // solution
    const solutions = puzzles.map(puzzle => {
        const solutionArray = solvePuzzle([puzzle]).puzzles
        return isUnique(solutionArray) ? solutionArray[0] : "MULTIPLE SOLUTIONS"
    })
    // Create comprehensive solution object for each requested puzzle
    const solutionsData = {
        puzzles: solutions.map((solution, index) => {
            return {
                puzzleArray: puzzles[index],
                puzzleString: puzzles[index].join(""),
                encodedSudoku: solution === "MULTIPLE SOLUTIONS" ? null :
                    encode(solution.join(""), puzzles[index].join("")),
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
    solvePuzzle: solvePuzzle,
    isUnique: isUnique,
    batchSolvePuzzle: batchSolvePuzzle
}