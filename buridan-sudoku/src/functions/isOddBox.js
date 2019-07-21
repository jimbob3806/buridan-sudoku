// Determines if a given index is in an odd numbered 3x3 box or not. Used
// to conditionally render border, different shades etc. to denote the 3x3
// boxes on the sudoku puzzle
const isOddBox = index => {
    const add = numArray => num => numArray.map(value => value + num) 
    const _concat = (initialArray, newArrays) => newArrays.reduce(
        (acc, cur) => {
            return acc.concat(cur)
        }, initialArray)
    const seed = [0, 1, 2]
    const firstBox = _concat(seed, seed.map(add([9, 18])))
    const oddBoxes = _concat(firstBox, firstBox.map(add([6, 30, 54, 60])))
    return oddBoxes.includes(index)
}

// Exports
export default isOddBox