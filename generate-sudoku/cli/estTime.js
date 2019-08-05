// Function returning estimated end time based on an estimated time for function
// completion, and assuming that the function execution begins when estTime is
// called
const estTime = time => { 
    // Returns date in readable format, with a number of seconds added on
    return new Date(new Date().getTime() + time)
}

// Exports
module.exports = {
    estTime: estTime
}