// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import {
    Tooltip
} from "@material-ui/core"
import {
    Add,
    LiveHelp
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
                if (method === null) {
                    return
                } else {
                    mainContext.setInputMethod(method)
                }                    
            }}
            exclusive
            size = "small"
            className = {`${styles.buttonGroup} ${styles.inputSelector}`}
        >
        
            <ToggleButton  value = {mainContext.methods.ANSWER}>    
                <Tooltip title = "Insert answers (Q)">           
                    <Add />        
                </Tooltip>        
            </ToggleButton>
            
            <ToggleButton value = {mainContext.methods.CANDIDATES}>
                <Tooltip title = "Insert candidates (E)">
                    <LiveHelp />
                </Tooltip>
            </ToggleButton>

        </ToggleButtonGroup>
    )
}

// Exports
export default InputSelector