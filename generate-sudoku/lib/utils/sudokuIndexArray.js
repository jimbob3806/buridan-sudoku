// Returns array of numbers from 0-80 representing all of the cell indexes in a
// sudoku puzzle
const sudokuIndexArray = index => {
    const add = numArray => num => numArray.map(value => value + num) 
    const _concat = (initialArray, newArrays) => newArrays.reduce(
        (acc, cur) => {
            return acc.concat(cur)
        }, initialArray)
    const seed = [0, 1, 2]
    const firstBox = _concat(seed, seed.map(add([9, 18])))
    const firstRow = _concat(firstBox, firstBox.map(add([3, 6])))
    const allBoxes = _concat(firstRow, firstRow.map(add([27, 54])))
    return allBoxes
}

module.exports = {
    sudokuIndexArray: sudokuIndexArray
}