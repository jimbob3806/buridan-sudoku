// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const gridStyles = {
    answer: props => ({
        color: variables.neutralColor1,
        // Found that rem unit did not size digits aggressively enough to fit
        // numbers correctly at smaller sizes
        fontSize: `${props.responsiveSize / 1.5}px`,
        display: "flex", // For aliging text!
        justifyContent: "center", // Align horizontal
        alignItems: "center", // Align vertical
        border: `1.5px solid ${variables.neutralColor1}`,
        margin: "0px",
        boxSizing: "border-box", // Prevent increased element size with padding
        padding: props.responsiveSize / 10,
        width: props.responsiveSize,
        height: props.responsiveSize
    }),
    candidate: props => ({
        color: variables.neutralColor1,
        // Found that rem unit did not size digits aggressively enough to fit 
        // 9 candidates at smaller sizes
        fontSize: `${props.responsiveSize / 5}px`,
        lineHeight: `${props.responsiveSize / 3.75}px`,
        letterSpacing: `${props.responsiveSize / 22}px`,
        display: "flex", // For alinging text!
        flexWrap: "wrap",
        justifyContent: "center", // Align horizontal
        alignItems: "center", // Align vertical
        border: `1.5px solid ${variables.neutralColor1}`,
        margin: "0px",
        boxSizing: "border-box", // Prevent increased element size with padding
        padding: props.responsiveSize / 10,  
        width: props.responsiveSize,
        height: props.responsiveSize
    }),
    puzzle: props => ({
        color: variables.neutralColor7,
        // Found that rem unit did not size digits aggressively enough to fit
        // numbers correctly at smaller sizes
        fontSize: `${props.responsiveSize / 1.5}px`,
        display: "flex", // For aliging text!
        justifyContent: "center", // Align horizontal
        alignItems: "center", // Align vertical
        border: `1.5px solid ${variables.neutralColor1}`,
        margin: "0px",
        boxSizing: "border-box", // Prevent increased element size with padding
        padding: props.responsiveSize / 10,
        width: props.responsiveSize,
        height: props.responsiveSize
    }),
    test: props => ({
        // Found that rem unit did not size digits aggressively enough to fit
        // numbers correctly at smaller sizes
        fontSize: `${props.responsiveSize / 1.5}px`,
        display: "flex", // For aliging text!
        justifyContent: "center", // Align horizontal
        alignItems: "center", // Align vertical
        border: `1.5px solid ${variables.neutralColor1}`,
        margin: "0px",
        boxSizing: "border-box", // Prevent increased element size with padding
        padding: props.responsiveSize / 10,
        width: props.responsiveSize,
        height: props.responsiveSize
    }),
    first: {
        color: variables.redHighlight9
    },
    remainder: {
        color: variables.greenHighlight6
    },
    row: props => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Align horizontal
        alignItems: "center", // Align vertical
        width: props.responsiveSize * 10,
        height: props.responsiveSize
    }),
    light: {
        backgroundColor: variables.primaryColor2
    },
    dark: {
        backgroundColor: variables.primaryColor4
    },
    selected: {
        backgroundColor: variables.neutralColor4
    }
}

// Exports
export default gridStyles