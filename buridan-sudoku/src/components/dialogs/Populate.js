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
const PopulateDialog = props => {
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
                mainContext.dialogs.POPULATE_CANDIDATES}
            onEscapeKeyDown = {() => { mainContext.setCurrentDialog(null) }}
            maxWidth = "xs"
            className = {`${styles.cautionDialog} ${styles.dialog}`}
        >
            <DialogTitle>
                Are you sure?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {`This action will populate all empty cells with
                    all candidates from 1 to 9. Any candidates that
                    you have placed WILL be overwritten❗️ Press RETURN to 
                    continue, or ESC to cancel this action, or press a 
                    button below.`}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick = {() => { mainContext.setCurrentDialog(null) }}
                    aria-label = "cancel" 
                    color="primary"
                >
                    CANCEL
                </Button>
                <Button 
                    onClick = {() => {
                        mainContext.setCurrentDialog(null)
                        mainContext.handlePopulateCandidates()
                    }} 
                    aria-label = "ok"
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
export default PopulateDialog
                    