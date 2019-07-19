import {
    createContext
} from "react"

export default createContext({
    // Context for the solver component
        selectedCell: 0,
        inputMethod: "",
        // Array of possible input methods
        methods: {},
        responsiveSize: 0,
        currentDialog: false,
        answersRemoved: 0,
        setSelectedCell: () => {},
        setInputMethod: () => {},
        setResponsiveSize: () => {},
        setCurrentDialog: () => {},
        setAnswersRemoved: () => {},

        handleChange: () => {},
        handleCheck: () => {},
        handleGiveAnswer: () => {},
        handleRemoveCell: () => {},
        handleRestart: () => {},
        handlePopulateCandidates: () => {}
})