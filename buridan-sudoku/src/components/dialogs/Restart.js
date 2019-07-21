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
const RestartDialog = props => {
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
                mainContext.dialogs.RESTART}
            onEscapeKeyDown = {() => { mainContext.setCurrentDialog(null) }}
            maxWidth = "xs"
            className = {`${styles.errorDialog} ${styles.dialog}`}
        >                        
            <DialogTitle>
                Are you sure?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {`This action will reset the ENTIRE puzzle, 
                    removing all answers, and candidates. Any 
                    candidates, or answers that you have placed WILL 
                    be overwritten❗️`}
                </DialogContentText>
            </DialogContent>
        
            <DialogActions>
                <Button 
                    onClick = {() => { mainContext.setCurrentDialog(null) }} 
                    color="primary"
                >
                    CANCEL
                </Button>
                <Button 
                    onClick = {() => {
                        mainContext.setCurrentDialog(null)
                        mainContext.handleRestart()
                    }} 
                    color="primary" 
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

// Exports
export default RestartDialog
                    