// General imports
const fs = require("fs")

// Own imports
const { decode } = require("./sudokuEncode")

// Returns array of puzzle arrays, formatted correctly to be graded, or solved
const fetchPuzzles = file => {
    // Fetch puzzles from requested file (could be in any format of 
    // puzzleString, puzzleArray, or encodedSudoku)
    const data = JSON.parse(fs.readFileSync(file))
    const result = data.puzzles.map(puzzle => {
        return puzzle.puzzleArray ? puzzle.puzzleArray :
        puzzle.puzzleString ? puzzle.puzzleString.split("").map(value => { 
            return parseInt(value) 
        }) : decode(puzzle.encodedSudoku)[1].split("").map(value => { 
            return parseInt(value) 
        })
    })
    return result
}

// Exports
module.exports = {
    fetchPuzzles: fetchPuzzles
}