/*Follow the order laid out below in all relevant JS files - just copy this, 
or another template file to get going!*/

// General imports
import React from "react"

// Material-ui imports
import { 
    Paper
} from "@material-ui/core"

// Own imports 
    //Context
    // Components
    import {
        SudokuGrid,
        InputSelector,
        NumberSelector,
        OperationSelector,
        CheckDialog,
        RestartDialog,
        PopulateDialog,
        TestDialog
    } from "../components/exports"
    // Hooks
    import useWatchKey from "../hooks/watchKey"
    // Style hooks

// Component
const SolvePuzzle = props => {
    // State and context

    // Styles
    const styles = props.styles

    // Single rxjs observable for all keyboard inputs
    useWatchKey()

    // Component render JSX
    return (
        <div>
            <Paper className = {styles.solverContainer}>
                
                <OperationSelector styles = {styles} />
                <CheckDialog styles = {styles} />
                <RestartDialog styles = {styles} />
                <PopulateDialog styles = {styles} />  
                <TestDialog styles = {styles} />                  
            
                <InputSelector styles = {styles} />

                <SudokuGrid styles = {styles} />
            
                <NumberSelector styles = {styles} />

            </Paper>

        </div>
    )
}

// Exports
export default SolvePuzzle