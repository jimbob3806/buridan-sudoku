// Own imports
const { candidates } = require("./utils/fetchCell")
const { insertAnswer } = require("./insertAnswer")

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
const checkPuzzles = puzzleArr => {
    return puzzleArr.reduce((acc, cur) => {
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

const solvePuzzle = (puzzleArr, curTreeSize = 1, sumTreeSize = 1) => {  
    if (checkPuzzles(puzzleArr)) {
        // check if all puzzles in the array ar completed, and return function 
        // arguments. If all of the puzzles in puzzleArr are not the same,
        // completed puzzle, then the initial puzzle obviously does not have a
        // unique solution, and may be discounted. sumTreeSize
        // may be used to approximate the difficulty of the puzzle (the larger
        // the value, the harde the puzzle)
        return {
            puzzles: puzzleArr,
            curTreeSize: curTreeSize, 
            sumTreeSize: sumTreeSize
        }
    } else {
        // Calulate next step in the tree of puzzles
        newPuzzleArr = puzzleArr.reduce((acc, cur) => {
            return [...acc, ...step(cur)]
        }, [])
        // Call solvePuzzle recursively (with updated tree size values) until
        // puzzle is solved
        const newTreeSize = puzzleArr.length
        const newSumSize = sumTreeSize + newTreeSize
        return solvePuzzle(newPuzzleArr, newTreeSize, newSumSize)
    }
}

// Exports
module.exports = {
    solvePuzzle: solvePuzzle
}