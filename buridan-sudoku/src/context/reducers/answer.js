// Exports
export const ADD_ANSWER = "ADD_ANSWER"
export const REMOVE_ANSWER = "REMOVE_ANSWER"

export const answerReducer = (state, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return addAnswer(action.answer, action.index, state)
        case REMOVE_ANSWER:
            return removeAnswer(action.index, state)
        default:
            return state
    }
}

// Array of possible answers (numbers 1-9) - used to prevent setting of
// incorrectly formatted answers. 0 included to represent no answer
const answers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// Reducer declaration
const addAnswer = (answer, ansIndex, state) => {
    // Allows for setting of initial answer (equal to puzzle).
    if (state.length < 81) {
        state.push(answer)
        return state
    } if (!answers.includes(answer)) {
        // Prevent setting of an incorrectly formatted answer!
        return state
    } else {
        return state.map((value, index) => {
            if (index === ansIndex) {
                return answer
            } else {
                return value
            }
        })
    }
}

const removeAnswer = (ansIndex, state) => {
    return state.map((value, index) => {
        if (index === ansIndex) {
            return "0"
        } else {
            return value
        }
    })
}