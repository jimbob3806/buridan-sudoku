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
    // Possible input methods
    const methods = {
        ANSWER: "ANSWER", 
        CANDIDATES: "CANDIDATES",
        TEST: "TEST"
    }
    const [responsiveSize, setResponsiveSize] = useState()
    const [currentDialog, setCurrentDialog] = useState(null)
    // Possible dialogs
    const dialogs = {
        CHECK: "CHECK",
        RESTART: "RESTART",
        POPULATE_CANDIDATES: "POPULATE_CANDIDATES",
        TEST: "TEST",
        DELETE: "DELETE"
    }
    const [answersRemoved, setAnswersRemoved] = useState(0)
    const [firstTest, setFirstTest] = useState()
    const [puzzleKey, setPuzzleKey] = useState()

    // Fetch window size
    const size = useWindowSize()

    // Helper functions
    // Change default divider value to scale size of the components displayed
    const handleSizeChange = (
        divider = 13, 
        width = size.width,
        height = size.height
        ) => {
        // Returns some size based on screen width or screen height (whichever 
        // is smaller). Size used to dynamically determine component sizes
        if (height > width) {
            // Make puzzle take up more space on smaller, vertical screen (such
            // as smartphones)
            return setResponsiveSize(Math.floor(width / (divider - 2)))
        } else {
            return setResponsiveSize(Math.floor(height / divider))
        }
    }

    // Shorthand call to global context reducers with appropriate default args
    const handleRemoveAnswer = (cell = selectedCell) => {
        return context.setAnswer.remove(cell)
    }
    const handleRemoveCandidates = (cell = selectedCell) => {
        context.setCandidate.burnOne(cell)
    } 
    const handleRemoveTest = (cell = selectedCell) => {
        return context.setTest.remove(cell)
    }

    // INPUT HANDLERS
    const handleChange = number => {
        switch (inputMethod) {
            case methods.ANSWER:
                return handleAnswerChange(number)
            case methods.CANDIDATES:
                return handleCandidateChange(number)
            case methods.TEST:
                return handleTestChange(number)
            default:
                return
        }
    }
    const handleAnswerChange = (number, cell = selectedCell) => {
        const numString = `${number}`
        return context.setAnswer.add(numString, cell)
    }
    const handleCandidateChange = (number, cell = selectedCell) => {
        if (context.answer[cell] !== "0" ||
            context.test[cell] !== "0") {
            return null
        } else {
            const numString = `${number}`
            context.candidates[cell].includes(numString) ?
                context.setCandidate.remove(numString, cell) :
                context.setCandidate.add(numString, cell)
        }
    }
    const handleTestChange = (number, cell = selectedCell) => {
        const numString = `${number}`
        if (context.answer[cell] !== "0") {
            return null
        } else if (
            // Checking to see if test is same as puzzle (test reset to puzzle
            // each time client has finished) this allows us to mark the first
            // number in a test with a special style, denoting the initial
            // assumption
            context.test.reduce((acc, cur, index) => {
                return acc ? 
                    (cur === context.puzzle[index] ? 
                        true : false) : false
            }, true)
        ) {
            setFirstTest(cell)
            return context.setTest.add(numString, cell)
        }
        else {
            return context.setTest.add(numString, cell)
        }
    }  
    
    // OPERATION HANDLERS
    // Removes answer from cell, and removes all candidates from cell if there
    // is no answer
    const handleRemoveCell = () => {
        if (context.answer[selectedCell] !== "0") {
            handleRemoveAnswer()
            // Test should not be present in same cell as answer, but this 
            // statement ensures that when an answer is deleted, no test will
            // show up underneath it
            return handleRemoveTest()
        } else if (context.test[selectedCell] !== "0") {
            return handleRemoveTest()
        } else if (context.test[selectedCell] === "0") {
            return handleRemoveCandidates()
        } 
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
                handleRemoveTest(index)
                return handleRemoveAnswer(index)
            } else {
                return null
            }
        })
        setAnswersRemoved(countAnswersRemoved)
        setCurrentDialog(dialogs.CHECK)
    }
    // Reset answer to the initial puzzle, and remove all candidates, and tests
    const handleRestart = () => {
        context.puzzle.map((value, index) => {
            context.setCandidate.burnOne(index)
            context.setTest.remove(index)
            return handleAnswerChange(value, index)
        })
    }
    // Add all candidates 1-9 to cells which currently have no clue, and no
    // answer. Note still adds candidates to a cell if a test number populates
    // it
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

    // Dialog handlers
    const deleteTest = () => {
        // Restore test array to be equivalent to puzzle array
        context.puzzle.map((value, index) => {
            if (value === context.test[index]) { 
                return null
            } else if (context.test[index] !== "0") {
                return handleRemoveTest(index)
            } else {
                return null
            }
        })
        setFirstTest(null)
        setCurrentDialog(null)
    } 
    const removeInitCandidate = () => {
        context.setCandidate.remove(
            context.test[firstTest], firstTest)
        // Restore test array to be equivalent to puzzle array
        context.puzzle.map((value, index) => {
            if (value === context.test[index]) { 
                return null
            } else if (context.test[index] !== "0") {
                return handleRemoveTest(index)
            } else {
                return null
            }
        })
        setFirstTest(null)
        setCurrentDialog(null)
    } 
    const testToAnswer = () => {
        // Move all number in test array to answer array
        context.test.map((value, index) => {
            if (value === context.answer[index]) { 
                return null
            } else if (value !== "0") {
                handleRemoveTest(index)
                return handleAnswerChange(value, index)
            } else {
                return null
            }
        })
        setFirstTest(null)
        setCurrentDialog(null)
    }

    return (
        <MainContext.Provider value = {{
            // Solver component context
                selectedCell: selectedCell,
                inputMethod: inputMethod,
                methods: methods,
                responsiveSize: responsiveSize,
                currentDialog: currentDialog,
                dialogs: dialogs,
                answersRemoved: answersRemoved,
                firstTest: firstTest,
            // Solver component mehtods
                setSelectedCell: setSelectedCell,
                setInputMethod: setInputMethod,
                setResponsiveSize: handleSizeChange,
                setCurrentDialog: setCurrentDialog,
                setAnswersRemoved: setAnswersRemoved,
                setFirstTest: setFirstTest,
            // Input handlers
                handleChange: handleChange,
            // Operation handlers
                handleCheck: handleCheck,
                handleGiveAnswer: handleGiveAnswer,
                handleRemoveCell: handleRemoveCell,
                handleRestart: handleRestart,
                handlePopulateCandidates: handlePopulateCandidates,
            // Dialog handlers
                deleteTest: deleteTest,
                removeInitCandidate: removeInitCandidate,
                testToAnswer: testToAnswer,
            // Load component context
                puzzleKey: puzzleKey,
            // Load component methods
                setPuzzleKey: setPuzzleKey
        }} >
            {props.children}
        </MainContext.Provider>
    )
}

// Exports
export default MainState