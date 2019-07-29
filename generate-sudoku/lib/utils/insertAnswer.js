// Inserts a given answer at a given cell in a sudoku
const insertAnswer = (sudoku, answer, cell) => {
    // NEW array created to store altered sudoku, rather than changing the 
    // sudoku passed in the argument
    const newSudoku = sudoku.map((_, index) => {
        return index === cell ? answer : sudoku[index]
    })
    return newSudoku
}

module.exports = {
    insertAnswer: insertAnswer
}