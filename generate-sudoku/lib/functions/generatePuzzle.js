// Own imports
const { insertAnswer } = require("../utils/insertAnswer")
const { solvePuzzle, isUnique } = require("./solvePuzzle")

const step = (puzzle, cell) => {
    const newPuzzle = insertAnswer(puzzle, 0, cell)
    // Fetch the puzzle array produced by solvePuzzle
    const solutionArray = solvePuzzle([newPuzzle]).puzzles
    return isUnique(solutionArray) ? newPuzzle : puzzle
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
