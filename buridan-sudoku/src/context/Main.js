import {
    createContext
} from "react"

export default createContext({
    // Context for the solver component
        // Index of cell currently selected by the client
        selectedCell: 0,
        // Current input method selected by the ToggleButton component in
        // Input selector component
        inputMethod: "",
        // Object of possible input methods
        methods: {},
        // Some number based on screen size used to scale components (mainly 
        // sudoku cells), to ensure that things scale on smaller screens
        responsiveSize: 0,
        // Current dialog displayed the SolveSudoku component (defaults to null
        // indicating no dialog overlay)
        currentDialog: null,
        // Object of possible dialogs to display
        dialogs: {},
        // State to hold number of answers removed when the client checks their 
        // puzzle for incorrect answers. Used to display the number in a the
        // Check dialog component, and reset to 0 when the dialog is closed
        answersRemoved: 0,
        // When in TEST input mode, this number indicates the index of the first
        // test number to be inserted. This allows the SudokuGrid component to
        // conditionally render this number, and also to remove this number from
        // the list of its cell's candidates if the user chooses to
        firstTest: 0,
    // Solver context methods
        setSelectedCell: () => {},
        setInputMethod: () => {},
        setResponsiveSize: () => {},
        setCurrentDialog: () => {},
        setAnswersRemoved: () => {},
        setFirstTest: () => {},
    // Input handlers
        // Handles any input method
        handleChange: () => {},
    // Operation handlers
        // Handles operation buttons, as each name suggests
        handleCheck: () => {},
        handleGiveAnswer: () => {},
        handleRemoveCell: () => {},
        handleRestart: () => {},
        handlePopulateCandidates: () => {},
    // Dialog handlers
        // Handles actions dispatched by Test dialog component
        deleteTest: () => {},
        removeInitCandidate: () => {},
        testToAnswer: () => {}
})