// General imports
const fs = require("fs")

// Own imports
const { renderFunction } = require("./renderFunction")

// Loads the data argument passed to run.json, then executes renderFunction to 
// display the result to the console
const pushRunJSON = data => { 
    const runJSONPath = `${__dirname}/run.json`
    fs.writeFileSync(runJSONPath, JSON.stringify(data))
    return renderFunction()
}

// Exports
module.exports = {
    pushRunJSON: pushRunJSON
}