// General imports
import React, {
    useContext
} from "react"

// Material-ui imports
import {
    ToggleButton,
    ToggleButtonGroup
} from "@material-ui/lab"

// Own imports 
    //Context
    import MainContext from "../../context/Main"
    import GlobalContext from "../../context/Global"
    // Components
    // Hooks
    // Style hooks

// Component
const NumberSelector = props => {
    // State and context
    const context = useContext(GlobalContext)
    const mainContext = useContext(MainContext)

    // Styles
    const styles = props.styles    

    // Pre-render components
    // 1-9 number bar group for input of answers and candidates
    const numbers = []
    for (let number = 1; number < 10; number++) {
        numbers.push(
            <ToggleButton
                value = {`${number}`}
                key = {number}
                onClick = {() => mainContext.handleChange(number)}
            >
                {number}
            </ToggleButton>
        )
    }

    // Component render JSX
    return (
        <ToggleButtonGroup 
                value = {
                    (context.answer[mainContext.selectedCell] === "0") ? 
                        context.candidates[mainContext.selectedCell] :
                        context.answer[mainContext.selectedCell]
                }
                size = "small"
                className = {`${styles.buttonGroup} ${styles.numberSelector}`}
            >
                {numbers}
        </ToggleButtonGroup>
    )
}

// Exports
export default NumberSelector