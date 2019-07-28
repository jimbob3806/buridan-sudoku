// Exports functions to find the possible candidates, and the current siblings
// of a given cell in a sudoku.

// Own imports
sudokuIndexArray = require("./sudokuIndexArray")

// HELPER FUNCTIONS
// Returns number from 0-8 representing which column the cell index (passed
// in argument) is in
const identifyColumn = cell => {
    return (cell % 9)
}
// Returns number from 0-8 representing which row the cell index (passed
// in argument) is in
const identifyRow = cell => {
    return Math.floor(cell / 9)
} 
// Returns number from 0-8 representing which box the cell index (passed
// in argument) is in. Boxes wrapped by ROW
const identifyBox = cell => { 
    const boxRow = Math.floor(identifyRow(cell) / 3) 
    const boxColumn = Math.floor(identifyColumn(cell) / 3)
    return (boxRow + 3 * boxColumn)
}
// Removes 0s or duplicate values
const uniqueArray = array => {
    return array.reduce((acc, cur) => {
        if (cur === 0) {
            return acc
        } else {
            return acc.includes(cur) ? acc : [...acc, cur] 
        }
    }, [])
}

// EXPORTED FUNCTIONS
// Returns array of numbers (1-9) representing which numbers are in a cell's
// sibling group - WILL RETURN ITSELF AS A SIBLING
const fetchSiblings = (sudoku, cell) => {
    const [cellRow, cellColumn, cellBox] = 
        [identifyRow(cell), identifyColumn(cell), identifyBox(cell)]
    let siblings = []
    sudoku.map((value, index) => {
        const [indexRow, indexColumn, indexBox] = 
            [identifyRow(index), identifyColumn(index), identifyBox(index)]
        // Checking if the current index is in the same row, box, or column
        // as the original cell
        if (
            indexRow === cellRow || 
            indexColumn === cellColumn || 
            indexBox === cellBox
        ) {
            siblings.push(value)
        } else {
            return null
        }
    })
    return uniqueArray(siblings)
}
// Returns array of numbers (1-9) representing the possible candidates in of 
// a cell (compliment of fetchSiblings()) - WILL BE AN ANSWER IF IT IS A
// FILLED CELL
const fetchCandidates = (sudoku, cell) => {
    if (sudoku[cell] !== 0) {
        answer = [sudoku[cell]]
        return answer
    } else {
        const siblings = fetchSiblings(sudoku, cell)
        const possibleCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let candidates = []
        // Calculate compliment of the siblings array
        possibleCandidates.map(value => {
            return siblings.includes(value) ? null : candidates.push(value) 
        })
        return candidates
    }
}
// Fetches the possible candidates of a sudoku's column (given the answers
// already in the column, and the candidates of each empty cell). Only if the
// possible candidates include all numbers from 1-9 (i.e. the column can be
// completed), is the sudoku valid (may be used when generating a solution
// to see if inserted candidate is possible - i.e. does not cause the puzzle
// to be impossible to complete). Same applies for fetchRowCandidates, and
// fetchBoxCandidates respectively.
const fetchColumnCandidates = (sudoku, column) => {
    const candidates = sudoku.reduce((acc, _, index) => {
        if (identifyColumn(index) === column) {
            const newCandidates = fetchCandidates(sudoku, index)
            return [...acc, ...newCandidates]
        } else {
            return acc
        }
    }, [])
    return uniqueArray(candidates)
}
const fetchRowCandidates = (sudoku, row) => {
    const candidates = sudoku.reduce((acc, _, index) => {
        if (identifyRow(index) === row) {
            const newCandidates = fetchCandidates(sudoku, index)
            return [...acc, ...newCandidates]
        } else {
            return acc
        }
    }, [])
    return uniqueArray(candidates)
}
const fetchBoxCandidates = (sudoku, box) => {
    const candidates = sudoku.reduce((acc, _, index) => {
        if (identifyBox(index) === box) {
            const newCandidates = fetchCandidates(sudoku, index)
            return [...acc, ...newCandidates]
        } else {
            return acc
        }
    }, [])
    return uniqueArray(candidates)
}

// Exports
module.exports = {
    candidates: fetchCandidates,
    siblings: fetchSiblings,
    columnCandidates: fetchColumnCandidates,
    rowCandidates: fetchRowCandidates,
    boxCandidates: fetchBoxCandidates,
    column: identifyColumn,
    row: identifyRow,
    box: identifyBox
}