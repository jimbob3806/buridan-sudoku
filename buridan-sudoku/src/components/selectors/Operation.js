// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import { 
    Button, 
    ButtonGroup,
    Tooltip
} from "@material-ui/core"
import {
    Remove,
    Check,
    Visibility,
    Replay,
    Apps
} from "@material-ui/icons"

// Own imports 
    //Context
    import MainContext from "../../context/Main"
    // Components
    // Hooks
    // Style hooks

// Component
const OperationSelector = props => {
    // State and context
    const mainContext = useContext(MainContext)

    // Styles
    const styles = props.styles

    // Component render JSX
    return (
        <ButtonGroup 
            size = "small"
            className = {`${styles.buttonGroup} ${styles.operationSelector}`}
        >

            <Button 
                onClick = {() => mainContext.handleRemoveCell()}
                className = {styles.button}
                aria-label = "removeCell"
            >
                <Tooltip title = "Remove a cell (R)">
                    <Remove className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.handleGiveAnswer()}
                className = {styles.button}
                aria-label = "answerToCell"
            >
                <Tooltip title = "See an answer (F)">
                    <Visibility className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.handleCheck()}
                className = {styles.button}
                aria-label = "checkAllAnswers"
            >
                <Tooltip title = "Check your answers (C)">
                    <Check className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.setCurrentDialog(
                    mainContext.dialogs.RESTART)}
                className = {styles.button}
                aria-label = "restartPuzzle"
            >
                <Tooltip title = "Restart (Z)">
                    <Replay className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.setCurrentDialog(
                    mainContext.dialogs.POPULATE_CANDIDATES)}
                className = {styles.button}
                aria-label = "addAllCandidates"
            >
                <Tooltip title = "Add all candidates (X)">
                    <Apps className = {styles.button} />
                </Tooltip>
            </Button>

        </ButtonGroup>
    )
}

// Exports
export default OperationSelector