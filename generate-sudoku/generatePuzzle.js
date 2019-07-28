const insertAnswer = require("./insertAnswer")
const solvePuzzle = require("./solvePuzzle")

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
        return solutionArray.reduce((acc, cur) => {
            if (!acc) {
                return false
            } else if (cur === firstSolution) {
                return acc
            } else {
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
        const attemptedIndexToRemove = indexArray[indexPointer]
        return generatePuzzle(
            indexArray,
            step(puzzle, attemptedIndexToRemove),
            indexPointer + 1
        )
    }
}

// Exports
module.exports = generatePuzzle
