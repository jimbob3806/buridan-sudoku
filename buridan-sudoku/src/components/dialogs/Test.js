// General imports
/*eslint-disable no-unused-vars*/
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
    import MainContext from "../../context/Main"
    // Components
    // Hooks
    // Style hooks

// Component - Popup dialog box for informing client that the puzzle will be 
// reset if they continue
const Test = props => {
    // State and context
    const mainContext = useContext(MainContext)

    //Styles
    const styles = props.styles

    // Helper functions

    // Pre-render components

    // Component render JSX
    return (
        <Dialog 
            open = {mainContext.currentDialog === 
                mainContext.dialogs.TEST}
            onEscapeKeyDown = {() => { mainContext.setCurrentDialog(null) }}
            maxWidth = "xs"
            className = {styles.notificationDialog}
        >                        
            <DialogTitle>
                Choose an option...
            </DialogTitle>

            {/* Lists may not appear as descendats of p elements (given errror),
            so list of choices is formatted as below */}
            <DialogContent>
                <DialogContentText>
                {`To continue with the puzzle, there are three options to
                complete your test:
                        1. Delete the test numbers, and take no futher 
                        action
                        2. Delete the test candidates, removing the first
                        test number (indicated in red) as a potential
                        candidate from its cell
                        3. Committing all the test numbers to your answer`}
                </DialogContentText>
            </DialogContent>
        
            <DialogActions>
            <Button 
                    onClick = {() => { mainContext.deleteTest() }} 
                    color="primary"
                >
                    OPTION 1
                </Button>
                <Button 
                    onClick = {() => { mainContext.removeInitCandidate() }} 
                    color="primary"
                >
                    OPTION 2
                </Button>
                <Button 
                    onClick = {() => { mainContext.testToAnswer() }} 
                    color="primary" 
                >
                    OPTION 3
                </Button>
                <Button 
                    onClick = {() => { mainContext.setCurrentDialog(null) }} 
                    color="primary" 
                    autoFocus
                >
                    CANCEL
                </Button>
            </DialogActions>
        </Dialog>
    )
}

// Exports
export default Test
                    