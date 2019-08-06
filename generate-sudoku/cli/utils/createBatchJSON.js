// General imports
const fs = require("fs")

// Creates a JSON file which can be passed to batchSolve, or batchGrade
const createBatchJSON = (path, filename, puzzleObjectArray) => {
    const batchData = {
        puzzles: puzzleObjectArray
    }
    const batchJSON = JSON.stringify(batchData)
    return fs.writeFileSync(
        // time added to filename, so that if user creates another batchJSON,
        // the files will not be overwritten, and the progrma does not
        // have to handle the case where a file by the intended name already
        // exists
        `${process.cwd()}/${path}/${filename}_${new Date().getTime()}.json`,
        batchJSON
    )
}

// Exports 
module.exports = {
    createBatchJSON: createBatchJSON
}