// Returns an array of 81 0s
const emptySudoku = () => { 
    const _concat = (initialArray, newArrays) => newArrays.reduce(
        (acc, cur) => {
            return acc.concat(cur)
        }, initialArray)
    const seed = [0, 0, 0]
    const firstBox = _concat(seed, [seed, seed])
    const firstRow = _concat(firstBox, [firstBox, firstBox])
    const allCells = _concat(firstRow, [firstRow, firstRow])
    return allCells
}

// Exports
module.exports = {
    emptySudoku: emptySudoku
}