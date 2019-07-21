// General imports

// Material-ui imports
import { 
    makeStyles
} from "@material-ui/styles"

// Own imports
    // Variables
    import variables from "../index.scss"
    // Other JSS files
    import {
        gridStyles,
        dialogStyles,
        loadStyles,
        solveStyles,
        setStyles
    } from "../jss/exports"

// Styles
const useMainStyles = makeStyles({
    // Insert imported JSS styles
    ...gridStyles,
    ...dialogStyles,
    ...loadStyles,
    ...solveStyles,
    ...setStyles,
    // Styling on parent component
    main: props => ({
        // Found that rem unit did not size margins aggressively enough to 
        // fit correctly at smaller sizes
        padding: `${props.responsiveSize / 2}px 
            ${props.responsiveSize / 2}px 0`,
        margin: "auto",
        justifyContent: "center"
    }),

    // General component styling
    buttonSingle: props => ({
        color: variables.neutralColor3,
        backgroundColor: variables.secondaryColor8,
        // Found that rem unit did not size digits aggressively enough to
        // fit numbers correctly at smaller sizes
        fontSize: `${props.responsiveSize / 3}px`,
        padding: "auto",
        width: props.responsiveSize * 1.8,
        height: props.responsiveSize / 1.2,
        "& span.MuiButton-label": {
            // Enforcing correct display behaviour at smaller sizes
            margin: "auto",
            height: props.responsiveSize / 2.5
        }
    }),
    // Styling applied to all buttonGroups
    buttonGroup: props => ({
        "& button": {
            color: variables.neutralColor3,
            backgroundColor: variables.secondaryColor8,
            // Found that rem unit did not size digits aggressively enough to
            // fit numbers correctly at smaller sizes
            fontSize: `${props.responsiveSize / 2.5}px`,
            width: props.responsiveSize,
            height: props.responsiveSize
        },
        // Interactive colors
        "& button.Mui-selected": {
            color: variables.neutralColor5,
            backgroundColor: variables.secondaryColor11
        },
        "& button.Mui-selected:hover": {
            color: variables.neutralColor5,
            backgroundColor: variables.secondaryColor11
        },
        "& button:hover": {
            color: variables.neutralColor1,
            backgroundColor: variables.secondaryColor4
        }
    }),

    // Other styling
    // sudoku used by both load, and solve, so not in a specific ../jss file
    sudoku: {
        gridArea: "sudoku"
    }

})

// Exports
export default useMainStyles