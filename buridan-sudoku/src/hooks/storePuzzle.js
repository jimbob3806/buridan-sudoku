// General imports
import { 
    useContext
} from "react"

// Own imports
import GlobalContext from "../context/Global"
import {
    encode
} from "../functions/sudokuEncode"

// Custom hook
// Store puzzle in local storage after each change by the client
const useStorePuzzle = () => {
    const context = useContext(GlobalContext)
    // Do not continue if there is no valid puzzle in context!
    if (context.puzzle.length !== 81 ||
        context.solution.length !== 81 ||
        context.answer.length !== 81 ||
        context.candidates.length !== 81 ||
        context.test.length !== 81
    ) {
        return
    } else {

        const encodedOriginal = encode(
            context.solution.join(""), context.puzzle.join("")
        )
        const encodedAnswer = encode(
            context.solution.join(""), context.answer.join("")
        )
        // encodedOriginal stored as key in local storage, as this is a
        // unique reference to the puzzle, which will cause the value to
        // be overwritten each time the client comes back to the puzzle
        // and makes changes to the answer.
        return localStorage.setItem(encodedOriginal, JSON.stringify({
            // Original stored incase client wants to restart
            puzzle: context.puzzle,
            solution: context.solution,
            answer: context.answer,
            candidates: context.candidates,
            // First test is not stored in global context, and therefore any 
            // tests may not be stored in local storage if first test is to
            // be rendered up reload
            test: context.puzzle,
            encodedOriginal: encodedOriginal,
            encodedAnswer: encodedAnswer,
            lastActive: new Date()
        }))
    }
}

// Exports
export default useStorePuzzle