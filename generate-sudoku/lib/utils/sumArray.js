// Simple reduce function to sum the values in an array
const sumArray = arr => {
    return arr.reduce((acc, cur) => {
        return acc + cur
    }, 0)
}

module.exports = {
    sumArray: sumArray
}