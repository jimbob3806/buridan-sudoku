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
            >
                <Tooltip title = "Remove a cell (R)">
                    <Remove className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.handleGiveAnswer()}
                className = {styles.button}
            >
                <Tooltip title = "See an answer (F)">
                    <Visibility />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.handleCheck()}
                className = {styles.button}
            >
                <Tooltip title = "Check your answers (C)">
                    <Check />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.setCurrentDialog(
                    mainContext.dialogs.RESTART)}
                className = {styles.button}
            >
                <Tooltip title = "Restart (Z)">
                    <Replay className = {styles.button} />
                </Tooltip>
            </Button>
            
            <Button 
                onClick = {() => mainContext.setCurrentDialog(
                    mainContext.dialogs.POPULATE_CANDIDATES)}
                className = {styles.button}
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