// Own imports
const { emptySudoku } = require("../utils/emptySudoku")
const {
    candidates,
    columnCandidates,
    rowCandidates,
    boxCandidates
} = require("../utils/fetchCell")
const { insertAnswer } = require ("../utils/insertAnswer")

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
            const cellCandidates = candidates(solution, index)
            return cellCandidates.length === 0 ? false : true
        }
    }, true) ? [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((acc, cur) => {
        if (!acc) {
            // Continue to return false if one sibling group cannot be completed
            return false
        } else {
            return (
                // Check if all sibling groups can be completed - must only
                // check length, as ./utils/fetchCell ensures that the arrays
                // passed are formed of unique numbers, with no 0s
                columnCandidates(solution, cur).length === 9 &&
                rowCandidates(solution, cur).length === 9 &&
                boxCandidates(solution, cur).length === 9
            )
        }
    }, true) : false)
}

const step = (indexArray, solution, indexPointer, candidatePointer = 0) => {
    // Fetch relevant details from the arguments
    const cellIndex = indexArray[indexPointer]
    const cellCandidates = candidates(solution, cellIndex)
    // candidatePointer out of range of candidates for this cell, indicating
    // that the puzzle cannot be completed, as no candidate is valid for 
    // this cell. Recursion must jump back a step by removing the last
    // inserted answer, and trying the next available candidate for that cell
    if (candidatePointer >= cellCandidates.length) {
        const prevCellIndex = indexArray[indexPointer - 1]
        // Remove last answer inserted into solution
        const prevSolution = insertAnswer(solution, 0, prevCellIndex)
        const newIndexPointer = indexPointer - 1
        // Find index of next candidate to try in the previous cell
        const newCandidatePointer = candidates(prevSolution, prevCellIndex)
            .indexOf(solution[prevCellIndex]) + 1
        return step(
            indexArray, 
            prevSolution, 
            newIndexPointer,
            newCandidatePointer
        )
    } 
    // Fill a cell with a candidate, and check the validity of the new puzzle.
    // If valid, pass back to generatePuzzle
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
        // Candidate in this cell is not valid - try the next candidate 
        // available for this cell
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
    if (isComplete || recursionCounter >= 100) {
        // Return solution if recursion has reached 100. This allows the
        // calling function to circumvent call stack size, by either calling 
        // generateSolution again with currentSolution as an argument, or by
        // re-shuffling the indexArray to generate a new sudoku. This also
        // allows the calling argument to finely control how many recursions
        // are made before an index array reshuffle, allowing for control over
        // the speed at which the function(s) execute
        return {
            indexArray: indexArray,
            currentSolution: solution,
            currentIndexPointer: indexPointer,
            isComplete: isComplete,
            recursionCounter: recursionCounter
        }
    } else {
        // Attempt to fill cell in grid
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
module.exports = {
    generateSolution: generateSolution
}