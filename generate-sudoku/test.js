
const testFolder = "./lib/benchmarks/log/dump"
const fs = require("fs")
const { sumArray } = require("./lib/utils/sumArray")

let rawTreeSizeArray = []
fs.readdirSync(testFolder).map(file => {
    const dumpFile = fs.readFileSync(`./lib/benchmarks/log/dump/${file}`)
    const rawData = JSON.parse(dumpFile).rawTreeSizes
    rawTreeSizeArray.push(...rawData)
})
const groupedArray = rawTreeSizeArray.reduce((acc, cur) => {
    const regionSize = 50
    const rangeRegion = Math.floor(cur / regionSize)
    if (!acc[rangeRegion]) {
        acc[rangeRegion] = {
            range: `${rangeRegion * regionSize} - ` +
                `${(rangeRegion + 1) * regionSize}`,
            frequency: 1
        }
        return acc
    } else {
        acc[rangeRegion].frequency = acc[rangeRegion].frequency + 1
        return acc
    }
}, [])
const filteredArray = rawTreeSizeArray.reduce((acc, cur) => {
    return cur >= 1000 ? acc : [...acc, cur]
}, [])

const arraySummaryStats = array => {
    const sampleSize = array.length
    // Sum of individual values in the array
    const sum = sumArray(array)
    // Sum of the squares of the individual values in the array
    const sumSquares = sumArray(array.map(val => { return val ** 2 }))
    const mean = sum / sampleSize
    // Array of the squares of the deviations from the mean value
    const squareDevMeanArr = array.map(value => {
        return (mean - value) ** 2
    })
    // Sum of the square of the deviaitions from the mean
    const sumSquareDevMean = sumArray(squareDevMeanArr)
    // Std deviation calc with Bassels correction given that this is a sample 
    // of an assumed normal population
    const stdDev = Math.sqrt(sumSquareDevMean / (sampleSize - 1))
    return [Math.round(mean), Math.round(stdDev)]
}

console.log(groupedArray)