// Exports
export const ADD_TEST = "ADD_TEST"
export const REMOVE_TEST = "REMOVE_TEST"

export const testReducer = (state, action) => {
    switch (action.type) {
        case ADD_TEST:
            return addTest(action.test, action.index, state)
        case REMOVE_TEST:
            return removeTest(action.index, state)
        default:
            return state
    }
}

// Array of possible tests (numbers 1-9) - used to prevent setting of
// incorrectly formatted tests. 0 included to represent no test
const tests = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// Reducer declaration
const addTest = (test, testIndex, state) => {
    // Allows for setting of initial test (equal to puzzle).
    if (state.length < 81) {
        state.push(test)
        return state
    } if (!tests.includes(test)) {
        // Prevent setting of an incorrectly formatted test!
        return state
    } else {
        return state.map((value, index) => {
            if (index === testIndex) {
                return test
            } else {
                return value
            }
        })
    }
}

const removeTest = (testIndex, state) => {
    return state.map((value, index) => {
        if (index === testIndex) {
            return "0"
        } else {
            return value
        }
    })
}