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
    import GlobalContext from "../../context/Global"
    // Components
    // Hooks
    // Style hooks

// Component - Popup dialog box for informing client that the puzzle will be 
// reset if they continue
const Test = props => {
    // State and context
    const mainContext = useContext(MainContext)
    const context = useContext(GlobalContext)

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
            //className = {styles.notificationDialog}
        >                        
            <DialogTitle>
                Choose an option...
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                {`To continue with the puzzle, there are three options to
                complete your test:`}
                <ol>
                    <li>
                        {`Delete the test numbers, and take no futher 
                        action`}
                    </li>
                    <li>
                        {`Delete the test candidates, removing the first
                        test number (indicated in red) as a potential
                        candidate from its cell`}
                    </li>
                    <li>
                        {`Committing all the test numbers to your answer`}
                    </li>
                </ol>
                </DialogContentText>
            </DialogContent>
        
            <DialogActions>
            <Button 
                    onClick = {() => {
                        context.puzzle.map((value, index) => {
                            return context.setTest.add(value, index)
                        })
                        mainContext.setCurrentDialog(null)
                        mainContext.setFirstTest(null)
                    }} 
                    color="primary"
                >
                    OPTION 1
                </Button>
                <Button 
                    onClick = {() => {
                        context.setCandidate.remove(
                            context.test[mainContext.firstTest], 
                            mainContext.firstTest)
                        context.puzzle.map((value, index) => {
                            return context.setTest.add(value, index)
                        })
                        mainContext.setCurrentDialog(null)
                        mainContext.setFirstTest(null)
                    }} 
                    color="primary"
                >
                    OPTION 2
                </Button>
                <Button 
                    onClick = {() => {
                        context.test.map((value, index) => {
                            return value !== "0" ? 
                                context.setAnswer.add(value, index) :
                                null
                        })
                        mainContext.setCurrentDialog(null)
                        mainContext.setFirstTest(null)
                    }} 
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
                    