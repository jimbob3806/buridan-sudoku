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

// Component - Popup dialog box for informing client that all candidates will 
// be overwritten
const Delete = props => {
    // State and context
    const mainContext = useContext(MainContext)

    //Styles
    const styles = props.styles

    // Helper functions

    // Pre-render components

    // Component render JSX
    return (        
        <Dialog 
            open = {mainContext.currentDialog === mainContext.dialogs.DELETE}
            onEscapeKeyDown = {() => { mainContext.setCurrentDialog(null) }}
            maxWidth = "xs"
            className = {`${styles.deleteDialog} ${styles.dialog}`}
        >
            <DialogTitle>
                Are you sure?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {`This action will delete the selected sudoku, and any
                    progress you may have made. This is NOT reversible❗️ 
                    Press RETURN to continue, or ESC to cancel this action, 
                    or press a button below.`}
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
                        // Remove puzzle from local storage
                        localStorage.removeItem(mainContext.puzzleKey)
                        mainContext.setCurrentDialog(null)
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
export default Delete
                    