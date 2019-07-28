// Own imports
const fetchCell = require("./fetchCell")
const insertAnswer = require("./insertAnswer")

// Takes single puzzle, and returns an array of possible next puzzles based on
// cell with the least possible candidates (selects random cell if many cells
// with same number of candidates exists) - returns a sudoku for each of those
// candidates
const step = sudoku => {
    const candidateArray = sudoku.map((_, index) => {
        return {
            candidates: fetchCell.candidates(sudoku, index),
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
            return [...acc, cur]
        } else if (cur.candidates.length < acc[0]) {
            return [cur.candidates.length, cur]
        } else {
            return acc
        }
    }, [Infinity])
    // Select a random cell from the array of minimum candidate cells
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

// Reduces array of puzzles, and returns true if any of them are complete
const checkPuzzles = puzzleArr => {
    // const boolArr = puzzleArr.map(puzzle => {
    //     return puzzle.reduce((acc, cur) => {
    //         return !acc ? false : (cur === 0 ? false : true)
    //     }, true)
    // })
    // return boolArr.includes(true)
    return puzzleArr.reduce((acc, cur) => {
        if (!acc) {
            return false
        } else {
            return cur.reduce((bool, cell) => {
                return !bool ? false : (cell === 0 ? false : true)
            }, true)
        }
    }, true)
}

const solvePuzzle = (puzzleArr, curTreeSize = 1, sumTreeSize = 1) => {  
    if (checkPuzzles(puzzleArr)) {
        // check if there are any completed puzzles, and return function 
        // arguments. If puzzleArr.length, or curTreeSize is larger than 1,
        // then the original puzzle may not have a unique solution. sumTreeSize
        // may be used to approximate the difficulty of the puzzle (the larger
        // the value, the harde the puzzle)
        return {
            puzzles: puzzleArr,
            curTreeSize: curTreeSize, 
            sumTreeSize: sumTreeSize
        }
    } else {
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
module.exports = solvePuzzle