// General imports

// Material-ui imports
import { 
    makeStyles
} from "@material-ui/styles"

// Own imports
    // Variables
    import variables from "../index.scss"
    // Other JSS files
    import gridStyles from "../jss/grid"

// Styles
const useMainStyles = makeStyles({
    // Insert imported JSS styles
    ...gridStyles,
    // Styling on parent component
    main: props => ({
        // Found that rem unit did not size margins aggressively enough to fit
        // correctly at smaller sizes
        padding: `${props.responsiveSize / 1.5}px 
            ${props.responsiveSize / 2}px`,
        maxWidth: "600px",
        margin: "auto"
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
        // width: props.responsiveSize * 9
    }),
    operationSelector: props => ({
        float: "left"
    }),
    inputSelector: props => ({
        float: "right"
    }),

    // Other styling
    sudoku: props => ({
        // width: props.responsiveSize * 9,
        // height: props.responsiveSize * 9,
        display: "flex",
        justifyContent: "center"
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