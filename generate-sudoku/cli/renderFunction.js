// General imports
const fs = require("fs")

// Own imports
const {
    progressBar,
    bottomUi,
    divider
} = require("./ui")

// Function
const renderFunction = () => {
    // Fetch and decode run.json data
    const runJSON = fs.readFileSync(`${__dirname}/run.json`)
    const runData = JSON.parse(runJSON)
    // Render clui progress bar, and whichever data was last written to the 
    // run.json file. Conditionally display the result and endTimes, depending
    // on if they have been populated. Right hand side values start at col 27
    return bottomUi.updateBottomBar(`
${divider}
        Current function: ${runData.CURRENT_FUNCTION}
       Short description: ${runData.SHORT_DESC}
       Function progress: ${progressBar.update(runData.PROGRESS, 100)}
         Function status: ${runData.MESSAGE}
            Time started: ${runData.START_TIME}
 Est. time of completion: ${runData.EST_END_TIME}
${runData.RESULT ? `                  Result: ${runData.RESULT}
 Act. time of completion: ${runData.END_TIME}
${divider}` : `${divider}`}
    `)
}

// Exports
module.exports = {
    renderFunction: renderFunction
}