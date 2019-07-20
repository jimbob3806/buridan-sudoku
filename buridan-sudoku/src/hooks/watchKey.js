// General imports
import {
    useContext,
    useEffect
} from "react"
import {
    fromEvent
} from "rxjs"

// Own imports 
    //Context
    import MainContext from "../context/Main"
    import GlobalContext from "../context/Global"
    // Components
    // Hooks
    // Style hooks
    // Other
    import {
        TO_ROW_END,
        TO_ROW_START,
        TO_COLUMN_START,
        TO_COLUMN_END,
        rectifyIndex
    } from "../functions/rectifyIndex"

// Custom hooks
const useWatchKey = () => {
    // Context & state
    const context = useContext(GlobalContext)
    const mainContext = useContext(MainContext)

    // Lifecycle
    useEffect(() => {
        // Allows client to navigate puzzle with WASD keys using rxjs 
        // observable, such that permanent clues are skipped over, and at the
        // ends of rows/columns, the client is wrapped back to the other end
        // of the row/column 
        const watchKey = 
            fromEvent(document, "keypress").subscribe(event => {
                event.stopImmediatePropagation()
                // Circumvent users having caps lock on etc. and makes cases
                // easier to read.
                const letter = event.key.toUpperCase()
                const index = mainContext.selectedCell
                // Watching keys for when the test dialog is open, and the
                // client must select an option from 3 choices
                if (mainContext.currentDialog === mainContext.dialogs.TEST) {
                    switch (letter) {
                        case "1":
                            return mainContext.deleteTest()
                        case "2":
                            return mainContext.removeInitCandidate()
                        case "3":
                            return mainContext.testToAnswer()
                        default:
                            return
                    }
                } 
                // Do nothing if these dialogs are open (dialog has autoFocus on
                // accept, and may be closed using the esc key)
                else if (mainContext.currentDialog !== null) {
                        return                            
                } else {
                    switch (letter) {
                        // Watching for cell selected keys
                        case "W":
                            return mainContext.setSelectedCell(rectifyIndex(
                                index,
                                TO_COLUMN_END,
                                context.puzzle
                            ))
                        case "A":
                            return mainContext.setSelectedCell(rectifyIndex(
                                index,
                                TO_ROW_END,
                                context.puzzle
                            ))
                        case "S":
                            return mainContext.setSelectedCell(rectifyIndex(
                                index,
                                TO_COLUMN_START,
                                context.puzzle
                            ))
                        case "D":
                            return mainContext.setSelectedCell(rectifyIndex(
                                index,
                                TO_ROW_START,
                                context.puzzle
                            ))
                        // Watching for operation selector keys
                        case "R":
                            return mainContext.handleRemoveCell()
                        case "0":
                            return mainContext.handleRemoveCell()
                        case "F":
                            return mainContext.handleGiveAnswer()
                        case "C":
                            return mainContext.handleCheck()
                        case "Z":
                            // Client must confirm action before it is executed,
                            // as this action may overwrite user progress. 
                            // Confirmed with popup dialog rendered by 
                            // SolvePuzzle
                            return mainContext.setCurrentDialog(
                                mainContext.dialogs.RESTART)
                        case "X":
                            // Client must confirm action before it is executed,
                            // as this action may overwrite user progress. 
                            // Confirmed with popup dialog rendered by 
                            // SolvePuzzle
                            return mainContext.setCurrentDialog(
                                mainContext.dialogs.POPULATE_CANDIDATES)
                        // Watching for input selector keys
                        case "Q":
                            return mainContext.setInputMethod(
                                mainContext.methods.ANSWER)
                        case "E":
                            return mainContext.setInputMethod(
                                mainContext.methods.CANDIDATES)
                        case "V":
                            // If V pressed when TEST is already selected, then 
                            // dialog for dealing with test values should be
                            // displayed
                            return mainContext.inputMethod === 
                            mainContext.methods.TEST ?
                                mainContext.setCurrentDialog(
                                    mainContext.dialogs.TEST) :
                                mainContext.setInputMethod(
                                    mainContext.methods.TEST)
                        // Key was a number from 1-9, or another unused key
                        default:
                            // Sets answer, candidate, or test in selected cell,
                            // note that answer, candidate, and test reducers 
                            // ignore invalid chars
                            return mainContext.handleChange(event.key) 
                    }
                }
            })
        return () => {
            watchKey.unsubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        mainContext.selectedCell, mainContext.inputMethod, 
        mainContext.currentDialog, context.answer, context.candidates, 
        context.test
    ])
}

// Exports
export default useWatchKey
