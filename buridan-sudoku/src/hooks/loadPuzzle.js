// General imports
import { 
    useContext
} from "react"

// Own imports 
    //Context & States
    import GlobalContext from "../context/Global"
    // Components
    // Hooks
    // Style hooks

// Custom hook - load puzzle into global context from argument 
const useLoadPuzzle = localPuzzle => {
    // Context & state
    const context = useContext(GlobalContext)

    // Circumvent error incase hook is called without valid argument
    if (localPuzzle === null) {
        return
    }

    // Extract puzzle values from argument - note that localPuzzle should
    // always be a legitimate puzzle, since it is only called from useSetPuzzle
    const puzzle = localPuzzle.puzzle
    const solution = localPuzzle.solution
    const answer = localPuzzle.answer
    const candidates = localPuzzle.candidates

    // Conditionally updating context with puzzle providing that a puzzle of the
    // correct format has been provided (in this case a 9x9 sudoku). Note that 
    // the validity of the sudoku is NOT checked, only the format is checked.
    if ( 
        // Prevent reset of context if given puzzle is already loaded in 
        // context, to stop infintie loop of updating context
        context.solution === solution ||
        context.puzzle === puzzle ||
        context.answer === answer ||
        // Prevent setting a sudoku of the incorrect format
        solution.length !== 81 || 
        puzzle.length !== 81 || 
        answer.length !== 81 ||
        candidates.length !== 81
    ) {
        // Do not return error - client will indicate that no sudoku has been
        // loaded, since the new puzzle will not be rendered in the SolvePuzzle
        // page.
        return
    } else {
        // Initialise the entire puzzle in global context.
        context.setSolution(solution)
        context.setPuzzle(puzzle)
        answer.map((value, index) => {
            // Must include index, as loadPuzzle may be replacing a puzzle which
            // is currently stored in the global context.
            return context.setAnswer.add(value, index)
        })
        // Remove all candidates
        context.setCandidate.burnAll()
        // Reset candidates as an array of empty arrays for each cell
        candidates.map(() => {
            return context.setCandidate.add([])
        })
        candidates.map((candidateArray, index) => {
            return candidateArray.map(candidate => {
                // Do not need to send an index, since we are performing an
                // initial populate of the global context, and values are just
                // pushed to the answer array if it shorter than 81
                return context.setCandidate.add(candidate, index)
            })
        })
        return context
    }
}

// Exports
export default useLoadPuzzle