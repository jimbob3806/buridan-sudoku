// General imports
import { 
    useContext 
} from "react"

// Own imports 
    //Context & States
    import GlobalContext from "../context/Global"
    // Hooks
    import useGetPuzzles from "./getPuzzles"
    // Other
    import {
        decode 
    } from "../functions/sudokuEncode"

// Custom hook - loads a puzzle into context from the default puzzle variable.
// upon loading into context, this variable will either be the same default
// puzzle, the most recent puzzle in the local storage, or a puzzle loaded
// from the url hash (in order of pref. hash - local - default)
const useSetPuzzle = () => {
    // Context & state
    const localPuzzles = useGetPuzzles()
    const context = useContext(GlobalContext)
    
    // Some default puzzle, so that a puzzle can always displayed, and when
    // hook attempts to set puzzle to state, there will always be a valid 
    // puzzle to set.
    const defaultEncodedPuzzle = "Fzmyx2h.eWi6C.L2s925y.8yYK6jc." +
        "D4zgJ5.r6xv~q.io-bGRx.wdbEZf.PltXo304"
    const defaultDecodedSolution = decode(defaultEncodedPuzzle)[0].split("")
    const defaultDecodedPuzzle = decode(defaultEncodedPuzzle)[1].split("")
    let defaultPuzzle = {
        puzzle: defaultDecodedPuzzle,
        solution: defaultDecodedSolution,
        answer: defaultDecodedPuzzle,
        candidates: defaultDecodedPuzzle.map(() => []),
        test: defaultDecodedPuzzle,
        encodedOriginal: defaultEncodedPuzzle,
        econdedAnswer: defaultEncodedPuzzle,
        lastActive: null
    }

    /*eslint no-restricted-globals: 0*/
    // Fetch encoded puzzle from url hash, decode, and separate into parts
    const encodedPuzzle = location.hash.replace("#","")
    const decodedPuzzle = decode(encodedPuzzle)
    const solution = decodedPuzzle[0].split("")
    const puzzle = decodedPuzzle[1].split("")

    // Conditionally updating default puzzle with new puzzle, providing that a 
    // puzzle of the correct format has been provided (in this case a 9x9 
    // sudoku) by the hash, or local storage. Note that the validity of the 
    // sudoku is NOT checked, only the format is checked.
    if (
        // Checking if a correctly formatted puzzle is already loaded into 
        // context. No futher action required if true
        context.solution.length === 81 &&
        context.puzzle.length === 81 &&
        context.answer.length === 81 &&
        context.candidates.length === 81 &&
        context.test.length === 81
    ) { 
        // Context not changed, preventing a re-render of the component calling
        // this hook, and therefore preventing this hook being called in an
        // infinite loop
        return
    } else if (
        // Checking to see if a correctly formatted sudoku has been passed 
        // in the url hash - returns true if hash is incorrect
        encodedPuzzle === "" || 
        decodedPuzzle.length !== 2 || 
        solution.length !== 81 || 
        puzzle.length !== 81
    ) {
        // Checking to see if any puzzles are stored in local storage, and 
        // recovering them, then setting the most recent puzzle to context
        if (localPuzzles.length !== 0) {
            const latestPuzzle = localPuzzles.reduce((acc, cur) => {
                // Return the puzzle which was active most recently
                return acc.lastActive > cur.lastActive ? acc : cur
            })
            defaultPuzzle = latestPuzzle
        } 
    } else {        
        // Send puzzle from hash to be loaded by useLoadPuzzle. Note that answer
        // and puzzle are one and the same, since the client has yet to 
        // interact with the puzzle
        defaultPuzzle = {
            puzzle: puzzle,
            solution: solution,
            answer: puzzle,
            candidates: puzzle.map(() => []),
            test: puzzle,
            encodedOriginal: encodedPuzzle,
            econdedAnswer: encodedPuzzle,
            lastActive: null
        }
    }    

    // Populate GlobalContext with new value of defaultPuzzle
    context.setSolution(defaultPuzzle.solution)
    context.setPuzzle(defaultPuzzle.puzzle)
    defaultPuzzle.answer.map((value, index) => {
        // Index not strictly required
        return context.setAnswer.add(value, index)
    })
    // Remove all candidates
    context.setCandidate.burnAll()
    // Reset candidates as an array of empty arrays for each cell
    defaultPuzzle.candidates.map(() => {
        return context.setCandidate.add([])
    })
    defaultPuzzle.candidates.map((candidateArray, index) => {
        return candidateArray.map(candidate => {
            // Index not strictly required
            return context.setCandidate.add(candidate, index)
        })
    })
    defaultPuzzle.test.map((value, index) => {
        // Index not strictly required
        return context.setTest.add(value, index)
    })

    // Remove hash from url, so that this hook does not attempt to set
    // context again upon re-render. Keep client on current url path.
    history.replaceState({}, document.title, location.pathname)
    return context
    /*eslint no-restricted-globals: 1*/
}

// Exports
export default useSetPuzzle