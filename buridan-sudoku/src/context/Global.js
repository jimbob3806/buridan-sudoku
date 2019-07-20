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
    // Array set equal to puzzle each time it is used. Test may be used by the
    // client to test if a given cell can be a specific value (choose a
    // candidate from a cell, then propagate that guess by filling in
    // surrounding cells according to the test cell, and see if a contradiction
    // is made, which would indicate that the first test cell cannot be of the
    // suggested value)
    test: [],
    // Set puzzle, and solution replace entire array only
    setPuzzle: () => {},
    setSolution: () => {},
    // Set answer, candidates, and test alters current value(s) to reflect the 
    // changes by the client
    setAnswer: () => {},
    setCandidate: () => {},
    setTest: () => {}
})