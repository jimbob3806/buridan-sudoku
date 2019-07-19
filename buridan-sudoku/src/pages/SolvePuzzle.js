/*Follow the order laid out below in all relevant JS files - just copy this, 
or another template file to get going!*/

// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import { 
    Paper,
    GridList,
    GridListTile
} from "@material-ui/core"

// Own imports 
    //Context
    import MainContext from "../context/Main"
    // Components
    import {
        SudokuGrid,
        InputSelector,
        NumberSelector,
        OperationSelector,
        CheckDialog,
        RestartDialog,
        PopulateDialog
    } from "../components/exports"
    // Hooks
    import useWatchKey from "../hooks/watchKey"
    // Style hooks

// Component
const SolvePuzzle = props => {
    // State and context
    const mainContext = useContext(MainContext)

    // Styles
    const styles = props.styles

    // Single rxjs observable for all keyboard inputs
    useWatchKey()

    // Component render JSX
    return (
        <Paper>
            <GridList cellHeight = {mainContext.responsiveSize} spacing = {5}>

                <GridListTile cols = {1.5} rows = {1}>
                    <OperationSelector styles = {styles} />
                    <CheckDialog />
                    <RestartDialog />
                    <PopulateDialog />                    
                </GridListTile>

                <GridListTile cols = {0.5} rows = {1}>
                    <InputSelector styles = {styles} />
                </GridListTile>

                <GridListTile cols = {2} rows = {9}>
                    <SudokuGrid styles = {styles} />            
                </GridListTile>

                <GridListTile cols = {2} rows = {1}>
                    <NumberSelector styles = {styles} />
                </GridListTile>

            </GridList>
        </Paper>
    )
}

// Exports
export default SolvePuzzle