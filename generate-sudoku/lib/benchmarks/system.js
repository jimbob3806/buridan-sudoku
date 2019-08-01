// General imports
const fs = require("fs")

// Own imports
const { populationBenchmark } = require("./population")
const systemJSON = require("./log/system.json")
const populationJSON = require("./log/population.json")

const systemBenchmark = () => {
    console.log("THIS MAY TAKE A WHILE...")
    const startTime = process.hrtime()[0]
    const sampleMean = populationBenchmark(10)[0]
    const endTime = process.hrtime()[0]
    const correction =  sampleMean / populationJSON.populationMeanTreeSize
    const averageTime = Math.round((endTime - startTime) / (10 * correction))
    const data = { averageTime: averageTime }
    const jsonData = JSON.stringify(data)
    fs.writeFileSync(
        `${__dirname}/log/system.json`, 
        jsonData
    )
    return console.log(`BENCHMARK COMPLETED IN ${endTime - startTime} SECONDS
SYSTEM AVERAGE TIME: ${averageTime} SECONDS`)
}

module.exports = {
    systemBenchmark: systemBenchmark
}
