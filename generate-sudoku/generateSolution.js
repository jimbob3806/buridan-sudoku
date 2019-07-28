// Own imports
const emptySudoku = require("./emptySudoku")
const fetchCell = require("./fetchCell")
const insertAnswer = require ("./insertAnswer")

// Reduces solution to a bool value, returning true if the solution is complete
// (i.e. no cells have a value of 0)
const checkComplete = solution => {
    return solution.reduce((acc, cur) => {
        // Continue to return false if one cell has already been found to have
        // no answer. Otherwise, see if the current cell has an answer
        return !acc ? false : (cur === 0 ? false : true)
    }, true)
}

// Reduces solution to a bool value, returning false if any cell in the 
// solution has no possible candidates, or if any row/column/box group cannot
// be completed given its possible candidates
const checkSolution = solution => {
    return (solution.reduce((acc, cur, index) => {
        if (!acc) {
            // Continue to return false if one cell has already been found to
            // have no candidates
            return false
        } else if (cur !== 0) {
            // Ignore a cell which already has an answer
            return true
        } else {
            const cellCandidates = fetchCell.candidates(solution, index)
            return cellCandidates.length === 0 ? false : true
        }
    }, true) ? [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((acc, cur) => {
        if (!acc) {
            // Continue to return false if one sibling group cannot be completed
            return false
        } else {
            return (
                // Check if all sibling groups can be completed
                fetchCell.columnCandidates(solution, cur).length === 9 &&
                fetchCell.rowCandidates(solution, cur).length === 9 &&
                fetchCell.boxCandidates(solution, cur).length === 9
            )
        }
    }, true) : false)
}

const step = (indexArray, solution, indexPointer, candidatePointer = 0) => {
    const cellIndex = indexArray[indexPointer]
    const cellCandidates = fetchCell.candidates(solution, cellIndex)
    if (candidatePointer >= cellCandidates.length) {
        const prevCellIndex = indexArray[indexPointer - 1]
        const prevSolution = insertAnswer(solution, 0, prevCellIndex)
        const newIndexPointer = indexPointer - 1
        const newCandidatePointer = fetchCell
            .candidates(prevSolution, prevCellIndex)
            .indexOf(solution[prevCellIndex]) + 1
        return step(
            indexArray, 
            prevSolution, 
            newIndexPointer,
            newCandidatePointer
        )
    } 
    const candidateAttempt = cellCandidates[candidatePointer]
    const newSolution = insertAnswer(solution, candidateAttempt, cellIndex)
    if (checkSolution(newSolution)) {
        const newIndexPointer = indexPointer + 1
        // Answer added - pass back to generateSudoku to see if it is a complete
        // solution
        return {
            solution: newSolution,
            indexPointer: newIndexPointer
        }
    } else {
        const newCandidatePointer = candidatePointer + 1
        return step(indexArray, solution, indexPointer, newCandidatePointer)
    } 
}

const generateSolution = (
    indexArray,
    solution = emptySudoku(), 
    indexPointer = 0,
    recursionCounter = 0
) => {
    const isComplete = checkComplete(solution)
    if (isComplete || recursionCounter >= 1000) {
        // Return solution if it is complete (no empty cells)
        return {
            indexArray: indexArray,
            currentSolution: solution,
            currentIndexPointer: indexPointer,
            isComplete: isComplete,
            recursionCounter: recursionCounter
        }
    } else {
        newArgs = step(indexArray, solution, indexPointer)
        // Call gernerateSolution recursively (with updated args) until
        // puzzle is solved
        return generateSolution(
            indexArray, 
            newArgs.solution, 
            newArgs.indexPointer,
            recursionCounter + 1
        )
    }
}

// Exports
module.exports = generateSolution