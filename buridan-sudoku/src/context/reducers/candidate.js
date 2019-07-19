// Exports
export const ADD_CANDIDATE = "ADD_CANDIDATE"
export const REMOVE_CANDIDATE = "REMOVE_CANDIDATE"
export const BURN_ONE = "BURN_ONE"
export const BURN_CANDIDATES = "BURN_CANDIDATES"

export const candidateReducer = (state, action) => {
    switch (action.type) {
        case ADD_CANDIDATE:
            return addCandidate(action.candidate, action.index, state)
        case REMOVE_CANDIDATE:
            return removeCandidate(action.candidate, action.index, state)
        case BURN_ONE:
            return burnOne(action.index, state)
        case BURN_CANDIDATES:
            return burnCandidates()
        default:
            return state
    }
}

// Array of possible candidates (numbers 1-9) - used to prevent setting of
// incorrectly formatted candidates. 0 not included, as no candidates is 
// indicated by empty array
const candidates = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]


// Reducer declaration
const addCandidate = (candidate, candidateIndex, state) => {
    // Allows for setting of initial candidates (just an empty array for each 
    // cell).
    if (state.length < 81) {
        state.push(candidate)
        return state
    } if (!candidates.includes(candidate)) {
        // Prevent setting of an incorrectly formatted answer!
        return state
    } else {
        return state.map((value, index) => {
            if (index === candidateIndex) {
                if (value.includes(candidate)) {
                    return value
                } else {
                    value.push(candidate)
                    return value
                }
            } else {
                return value
            }
        })
    }
}

const removeCandidate = (candidate, candidateIndex, state) => {
    return state.map((value, index) => {
        if (index === candidateIndex) {
            value.splice(value.indexOf(candidate), 1)
            return value
        } else {
            return value
        }
    })
}

const burnOne = (candidateIndex, state) => {
    return state.map((value, index) => {
        if (index === candidateIndex) {
            return []
        } else {
            return value
        }
    })
}

const burnCandidates = () => {
    return []
}