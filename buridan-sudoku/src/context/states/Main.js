// General imports
import React, {
    useState, 
    useContext
} from "react"

// Own imports 
    //Context
    import MainContext from "../Main"
    import GlobalContext from "../Global"
    // Components
    // Hooks
    import useWindowSize from "../../hooks/windowSize"
    // Style hooks

// Component
const MainState = props => {
    //Context & state
    const context = useContext(GlobalContext)
    // Init fields for mainContext
    const [selectedCell, setSelectedCell] = useState() 
    const [inputMethod, setInputMethod] = useState("ANSWER")
    const methods = {
        ANSWER: "ANSWER", 
        CANDIDATES: "CANDIDATES"
    }
    const [responsiveSize, setResponsiveSize] = useState()
    const [currentDialog, setCurrentDialog] = useState(null)
    const dialogs = {
        CHECK: "CHECK",
        RESTART: "RESTART",
        POPULATE_CANDIDATES: "POPULATE_CANDIDATES"
    }
    const [answersRemoved, setAnswersRemoved] = useState(0)

    // Fetch window size
    const size = useWindowSize()

    // Change default divider value to scale size of the components displayed
    const handleSizeChange = (
        divider = 12, 
        width = size.width,
        height = size.height
        ) => {
        // Returns some size based on screen width or screen height (whichever 
        // is smaller). Size used to dynamically determine component sizes
        if (height > width) {
            return setResponsiveSize(Math.floor(width / divider))
        } else {
            return setResponsiveSize(Math.floor(height / divider))
        }
    }

    // Helper functions
    const handleChange = number => {
        switch (inputMethod) {
            case methods.ANSWER:
                return handleAnswerChange(number)
            case methods.CANDIDATES:
                return handleCandidateChange(number)
            default:
                return
        }
    }
    const handleAnswerChange = (number, cell = selectedCell) => {
        const numString = `${number}`
        return context.setAnswer.add(numString, cell)
    }
    const handleCandidateChange = (number, cell = selectedCell) => {
        const numString = `${number}`
        context.candidates[cell].includes(numString) ?
            context.setCandidate.remove(numString, cell) :
            context.setCandidate.add(numString, cell)
    }
    
    const handleRemoveAnswer = (cell = selectedCell) => {
        return context.setAnswer.remove(cell)
    }
    const handleRemoveCandidates = (cell = selectedCell) => {
        context.setCandidate.burnOne(cell)
    }

    // Removes answer from cell, and removes all candidates from cell if there
    // is no answer
    const handleRemoveCell = () => {
        context.answer[selectedCell] === "0" ?
            handleRemoveCandidates() :
            handleRemoveAnswer()
    }
    // Populates current selected cell with the correct answer
    const handleGiveAnswer = () => {
        handleAnswerChange(context.solution[selectedCell])
    }
    // Checks entire grid, and removes any incorrect answers
    const handleCheck = () => {
        let countAnswersRemoved = 0
        context.answer.map((value, index) => {
            if (value === context.solution[index]) { 
                return value
            } else if (context.answer[index] !== "0") {
                countAnswersRemoved++
                return handleRemoveAnswer(index)
            } else {
                return null
            }
        })
        setAnswersRemoved(countAnswersRemoved)
        setCurrentDialog(dialogs.CHECK)
    }
    // Reset answer to the initial puzzle, and remove all candidates
    const handleRestart = () => {
        context.puzzle.map((value, index) => {
            context.setCandidate.burnOne(index)
            return handleAnswerChange(value, index)
        })
    }
    // Add all candidates 1-9 to cells which currently have no clue, and no
    // answer
    const handlePopulateCandidates = () => {
        context.answer.map((value, index) => {
            const candidateArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
            if (value === "0") {
                return candidateArray.map(num => {
                    if (context.candidates[index].includes(num)) {
                        return null
                    } else {
                        return handleCandidateChange(num, index)
                    }
                })
            } else {
                return null
            }
        })
    }

    return (
        <MainContext.Provider value = {{
            selectedCell: selectedCell,
            inputMethod: inputMethod,
            methods: methods,
            responsiveSize: responsiveSize,
            currentDialog: currentDialog,
            dialogs: dialogs,
            answersRemoved: answersRemoved,
            setSelectedCell: setSelectedCell,
            setInputMethod: setInputMethod,
            setResponsiveSize: handleSizeChange,
            setCurrentDialog: setCurrentDialog,
            setAnswersRemoved: setAnswersRemoved,

            handleChange: handleChange,
            handleCheck: handleCheck,
            handleGiveAnswer: handleGiveAnswer,
            handleRemoveCell: handleRemoveCell,
            handleRestart: handleRestart,
            handlePopulateCandidates: handlePopulateCandidates
        }} >
            {props.children}
        </MainContext.Provider>
    )
}

// Exports
export default MainState