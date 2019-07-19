// General imports
import {
    createContext
} from "react"

// Blank values initiated here to highlight structure of state, and to aid with
// vscode auto-completion.
export default createContext({
    // Some array of numbers representing the incomplete puzzle, where a 0
    // represents an unsolved cell - numbers arranged by row left to right.
    puzzle: [],
    // Some array of numbers representing the completed solution to the sudoku 
    // puzzle - numbers arranged by row left to right.
    solution: [],
    // Some array of numbers representing the current progression of the player 
    // towards the solution - numbers arranged by row left to right.
    answer: [],
    // Array of 81 arrays (initialised by usePopulate hook). Each array contains
    // candidates used by the client to work out the correct answeres - arrays 
    // arranged by row left to right.
    candidates: [],
    // Set puzzle, and solution replace entire array only
    setPuzzle: () => {},
    setSolution: () => {},
    // Set answer and candidates alters current value(s) to reflect the changes 
    // by the client
    setAnswer: () => {},
    setCandidate: () => {}
})