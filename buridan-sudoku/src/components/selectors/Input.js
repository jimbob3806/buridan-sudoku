// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import {
    Tooltip,
} from "@material-ui/core"
import {
    Add,
    LiveHelp,
    CallSplit
} from "@material-ui/icons"
import {
    ToggleButton,
    ToggleButtonGroup,
} from "@material-ui/lab"

// Own imports 
    //Context
    import MainContext from "../../context/Main"
    // Components
    // Hooks
    // Style hooks

// Component
const InputSelector = props => {
    // State and context
    const mainContext = useContext(MainContext)

    // Styles
    const styles = props.styles

    // Component render JSX
    return (
        <ToggleButtonGroup
            value = {mainContext.inputMethod}
            onChange = {(event, method) => {
                // Returns null if client clicks the already selected
                // input method.
                if (method === null && 
                    mainContext.inputMethod === mainContext.methods.TEST) {
                    // If test button pressed when TEST is already selected, 
                    // then dialog for dealing with test values should be
                    // displayed
                    mainContext.setCurrentDialog(mainContext.dialogs.TEST)
                } else if (method === null) {
                    return
                } else {
                    mainContext.setInputMethod(method)
                }                    
            }}
            exclusive
            size = "small"
            className = {`${styles.buttonGroup} ${styles.inputSelector}`}
        >
        
            <ToggleButton  
                value = {mainContext.methods.ANSWER}
                aria-label = "insertAnswer"
            >    
                <Tooltip title = "Insert answers (Q)">           
                    <Add className = {styles.button}/>        
                </Tooltip>        
            </ToggleButton>
            
            <ToggleButton 
                value = {mainContext.methods.CANDIDATES}
                aria-label = "insertCandidate"
            >
                <Tooltip title = "Insert candidates (E)">
                    <LiveHelp className = {styles.button}/>
                </Tooltip>
            </ToggleButton>

            <ToggleButton 
                value = {mainContext.methods.TEST}
                aria-label = "testCandidate"
            >
                <Tooltip title = "Test a candidate (V)">
                    <CallSplit className = {styles.button}/>
                </Tooltip>
            </ToggleButton>

        </ToggleButtonGroup>
    )
}

// Exports
export default InputSelector