// Own imports
const { insertAnswer } = require("./insertAnswer")
const { solvePuzzle } = require("./solvePuzzle")

const step = (puzzle, cell) => {
    const newPuzzle = insertAnswer(puzzle, 0, cell)
    // Fetch the puzzle array produced by solvePuzzle
    const solutionArray = solvePuzzle([newPuzzle]).puzzles
    if (solutionArray.length === 1) {
        // If there is only one puzzle in the array, then newPuzzle has a unique
        // solution
        return newPuzzle
    } else {
        firstSolution = solutionArray[0]
        // Check to see if all puzzles returned by solvePuzzle are the same. If
        // they are, then the puzzle obviously still has a unique solution, and
        // so the newPuzzle may be passed on to remove more clues. Otherwise,
        // old puzzle should be kept
        return solutionArray.reduce((acc, cur) => {
            if (!acc) {
                // If one puzzle has benn found to be different, continue to 
                // return false
                return false
            } else if (cur === firstSolution) {
                // Continue to return true if puzzles are the same
                return acc
            } else {
                // Return false otherwise - i.e. if puzzles are different
                return false
            }
        }, true) ? newPuzzle : puzzle
    }
}

const generatePuzzle = (
    indexArray,
    puzzle,
    indexPointer = 0
) => {
    if (indexPointer >= 81) {
        return puzzle
    } else {
        // Attempt  to remove clue from given cell
        const attemptedIndexToRemove = indexArray[indexPointer]
        return generatePuzzle(
            indexArray,
            step(puzzle, attemptedIndexToRemove),
            indexPointer + 1
        )
    }
}

// Exports
module.exports = { 
    generatePuzzle: generatePuzzle
}
