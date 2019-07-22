// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const instructionStyles = {
    instructionParentContainer: props => ({
        "& h2": {
            color: variables.neutralColor1,
            letterSpacing: "0.2rem"
        },
        display: "flex",
        flexDirection: "column",
        backgroundColor: variables.secondaryColor1,
        // Width the same as components in set, load, and solve. Height should 
        // change as required to fit the number of instruction elements inside!
        width: props.responsiveSize * 10,
        placeItems: "center center",
        margin: `0 auto ${props.responsiveSize / 2}px auto`,
        padding: props.responsiveSize / 2,
        boxSizing: "border-box"
    }),
    instructionContainer: props => ({
        display: "grid",
        backgroundColor: variables.secondaryColor1,
        // Width inherits parent container. Height should change as required to 
        // fit the amount of content inside
        width: "100%",
        placeItems: "center center",
        margin: `0 auto ${props.responsiveSize / 4}px auto`,
        gridTemplateColumns: "30% 67%",
        gridTemplateRows: "10% 80% 10%",
        gridColumnGap: "0.35rem",
        gridRowGap: "0.25rem",
        gridTemplateAreas: `
            ".           .              "
            "action      description    "
            ".           .              "
        `
    }),
    // Default typography variant do not give enough flexibility for the
    // amount of size available, so set here instead
    description: props => ({
        color: variables.neutralColor1,
        gridArea: "description",
        wordWrap: "break-word",
        fontSize: "0.85rem",
        lineHeight: "1.3rem",
        letterSpacing: "0.11rem",
        // Full width of grid area, height reliant on amount of description
        // text
        width: "100%"  
    }),
    action: props => ({
        color: variables.neutralColor1,
        gridArea: "action",
        wordWrap: "break-word",
        textAlign: "center",
        "& p": {
            // Sizing not to be appiled to icons!
            fontSize: "0.85rem",
            lineHeight: "1.3rem",
            letterSpacing: "0.11rem",
            margin: 0
        },
        "& svg.MuiSvgIcon-root": {
            width: props.responsiveSize,
            height: props.responsiveSize            
        }
    }),
    // Default typography variant do not give enough flexibility for the
    // amount of size available, so set here instead
    descriptionTitle: {
        color: variables.neutralColor1,
        gridArea: "description",
        wordWrap: "break-word",
        // Full width of grid area, height reliant on amount of description
        // text
        width: "100%",
        fontSize: "1rem",
        letterSpacing: "0.15rem"
    },
    actionTitle: {
        color: variables.neutralColor1,
        gridArea: "action",
        wordWrap: "break-word",
        textAlign: "center",
        // Full width of grid area, height reliant on amount of description
        // text
        width: "100%",
        fontSize: "1rem",
        letterSpacing: "0.15rem"
    }
}

// Exports
export default instructionStyles