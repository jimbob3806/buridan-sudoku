// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const setStyles = {
    setContainer: props => ({
        backgroundColor: variables.secondaryColor1,
        // Lighten button color on hover
        "& .MuiButtonBase-root:hover": {
            color: variables.neutralColor1,
            backgroundColor: variables.secondaryColor4
        },
        // Select by class ending
        "& fieldset[class$=-notchedOutline]": {
            // Set border color when input is inactive
            borderColor: variables.secondaryColor8
        },
        // Select by class containing
        "& div[class*=Mui-focused]": {
            "& fieldset[class$=-notchedOutline]": {
                // Set border color when input is active
                borderColor: variables.secondaryColor8
            },
        },
        "& .MuiInputLabel-root": {
            // Enforce color of text when input is active
            color: variables.neutralColor10
        },
        "& .MuiInputBase-input": {
            // Ensure that input fills area provided, and preserves size when
            // mui default padding values are applied
            height: "100%",
            // fontSize: props.responsiveSize / 2,
            // padding: props.responsiveSize / 3,
            boxSizing: "border-box"
        },
        "& .MuiFormControl-marginNormal": {
            // Remove default margins on Inputs
            marginTop: 0,
            marginBottom: 0
        },
        // Ensure that URL text scales for smaller screens
        "& span.MuiTypography-root": {
            fontSize: `${props.responsiveSize / 5}px`,
            wordWrap: "break-word"
        },
        display: "grid",
        height: props.responsiveSize * 18,
        width: props.responsiveSize * 10,
        placeItems: "center center",
        margin: `auto auto ${props.responsiveSize / 2}px`,
        gridTemplateColumns: "4% 29% 29% 29% 4%",
        gridTemplateRows: "2% 8% 2% 8% 2% 8% 2% 50% 2% 7% 7% 2%",
        gridColumnGap: "1%",
        gridRowGap: "0%",
        gridTemplateAreas: `
            ".  .           .           .           ."
            ".  solution    solution    solution    ."
            ".  .           .           .           ."
            ".  puzzle      puzzle      puzzle      ."
            ".  .           .           .           ."
            ".  encoded     encoded     encoded     ."
            ".  .           .           .           ."
            ".  sudoku      sudoku      sudoku      ."
            ".  .           .           .           ."
            ".  save        toggle      urlSave     ."
            ".  url         url         url         ."
            ".  .           .           .           ."
        `
    }),
    solutionArr: {
        gridArea: "solution",
        // Ensure that input fills grid area, with a small vertical margin
        width: "100%",
        height: "100%"
        //placeSelf: "center stretch"
    },
    puzzleArr: {
        gridArea: "puzzle",
        // Ensure that input fills grid area
        width: "100%",
        height: "100%",
    },
    encodedArr: {
        gridArea: "encoded",
        // Ensure that input fills grid area
        width: "100%",
        height: "100%",
    },
    save: {
        gridArea: "save",
        textDecoration: "none"
    },
    toggle: {
        gridArea: "toggle"
    },
    url: {
        gridArea: "url"
    },
    urlSave: {
        gridArea: "urlSave"
    }
}

// Exports
export default setStyles