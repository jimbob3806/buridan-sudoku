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
        dialogStyles
    } from "../jss/exports"

// Styles
const useMainStyles = makeStyles({
    // Insert imported JSS styles
    ...gridStyles,
    ...dialogStyles,
    // Styling on parent component
    main: props => ({
        // Found that rem unit did not size margins aggressively enough to fit
        // correctly at smaller sizes
        padding: `${props.responsiveSize / 2.5}px 
            ${props.responsiveSize / 3}px`,
        margin: "auto",
        justifyContent: "center"
    }),
    solverContainer: props => ({
        display: "grid",
        backgroundColor: variables.secondaryColor1,
        height: props.responsiveSize * 13,
        width: props.responsiveSize * 10,
        maxWidth: "600px",
        placeItems: "center center",
        padding: `${props.responsiveSize / 3}px 
            ${props.responsiveSize / 3}px`,
        margin: "auto",
        gridTemplateColumns: "4% 55% 34% 4%",
        gridTemplateRows: "4% 8% 72% 8% 4%",
        gridColumnGap: "1%",
        gridRowGap: "1%",
        gridTemplateAreas: `
            ".  .           .           ."
            ".  operation   input       ."
            ".  sudoku      sudoku      ."
            ".  number      number      ."
            ".  .           .           ."
        `
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

    // Custom styling specific to each button group
    numberSelector: props => ({
        gridArea: "number"
    }),
    operationSelector: props => ({
        gridArea: "operation"
    }),
    inputSelector: props => ({
        gridArea: "input"
    }),

    // Other styling
    sudoku: props => ({
        gridArea: "sudoku"
    }),
    dialog: props => ({
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        padding: "1.3rem",
        width: props.responsiveSize * 4
    })
})

// Exports
export default useMainStyles