// General imports
const configstore = require("configstore")

// Own imports
const packageJSON = require("../../package.json")

// NOT "strictly speaking" a config component, but methods provided by
// configstore allowing you to access/change one key/value pair at a time 
// with store.get(), store.set() etc. seem to provide slightly cleaner looking 
// code than fetching/saving an entire JSON file
const runConfig = new configstore(packageJSON.runConfig, {
    // Current function being run by the cli
    CURRENT_FUNCTION: "NONE",
    // Short description of the function being executed for user feedback
    SHORT_DESC: "THIS IS A FUNCTION DESCRIPTION",
    // Message updated by the function being run (processes such as generate
    // sudoku will update this value rather than logging to the console)
    MESSAGE: "",
    // Percentage completion of the current process
    PROGRESS: 0,
    // Times for start, and estimated end of the current process
    START_TIME: new Date(),
    EST_END_TIME: new Date(),
    // Populated with some result/completion message when the current process
    // completes not displayed by cli when null. Whenever a cli function updates
    // the result, it will also update the end time.
    RESULT: null,
    END_TIME: null
})

// Exports 
module.exports = {
    runConfig: runConfig
}

