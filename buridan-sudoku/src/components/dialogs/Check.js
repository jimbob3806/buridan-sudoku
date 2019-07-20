// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import { 
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContentText,
    DialogContent,
    Button
} from "@material-ui/core"

// Own imports 
    //Context
    import GlobalContext from "../../context/Global"
    import MainContext from "../../context/Main"
    // Components
    // Hooks
    // Style hooks

// Component - Renders a message depending on how many answers were incorrect,
// and if the puzzle was completed or not - Popup dialog box for informing 
// client of how many answers were incorrect
const CheckDialog = props => {
    // State and context
    const context = useContext(GlobalContext)
    const mainContext = useContext(MainContext)

    // Styles
    const styles = props.styles

    // Helper functions
    const isComplete = () => {
        // Checking to see if answer is complete and correct. Note that 
        // comparing context.answer with context.solution using === will still 
        // return false, even  if the answer is completed correctly. Therefore 
        // the below array.reduce must be used instead
        context.answer.reduce((acc, cur, index) => {
            return acc ? 
                (cur === context.solution[index] ? 
                    true : false) : false
        }, true)
    }

    // Pre-render components
    let result
    let requiredStyle
    if (isComplete()) {
        result = `Congratulations! You have completed the puzzle correctly. 😄`
        requiredStyle = styles.notificationDialog
    } else if (mainContext.answersRemoved === 0) {
        result = `All your answers are correct 😀, but you still haven't
            finished the puzzle... 😐`
        requiredStyle = styles.notificationDialog
    } else if (mainContext.answersRemoved === 1) {
        result = `1 answer was incorrect 😧`
        requiredStyle = styles.errorDialog
    } else {
        result = `${mainContext.answersRemoved} answers were incorrect 😧`
        requiredStyle = styles.errorDialog
    }

    // Component render JSX
    return (
        <Dialog 
            open = {mainContext.currentDialog === mainContext.dialogs.CHECK}
            onEscapeKeyDown = {() => { mainContext.setCurrentDialog(null) }}
            maxWidth = "xs"
            className = {requiredStyle}
        >
            <DialogTitle>
                Result
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                {result}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick = {() => { mainContext.setCurrentDialog(null) }} 
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>                        
        </Dialog>
    )
}

// Exports
export default CheckDialog