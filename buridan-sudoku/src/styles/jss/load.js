// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const loadStyles = {
    loadContainer: props => ({
        display: "grid",
        backgroundColor: variables.secondaryColor1,
        "& .MuiButtonBase-root:hover": {
            color: variables.neutralColor1,
            backgroundColor: variables.secondaryColor4
        },
        height: props.responsiveSize * 11,
        width: props.responsiveSize * 10,
        placeItems: "center center",
        margin: `0 auto ${props.responsiveSize / 2}px auto`,
        gridTemplateColumns: "4% 44.5% 44.5% 4%",
        gridTemplateRows: "2% 8.8% 2% 79.2% 4%",
        gridColumnGap: "1%",
        gridRowGap: "1%",
        gridTemplateAreas: `
            ".  .           .           ."
            ".  play        delete      ."
            ".  .           .           ."
            ".  sudoku      sudoku      ."
            ".  .           .           ."
        `
    }),
    play: {
        gridArea: "play",
        textDecoration: "none"
    },
    delete: {
        gridArea: "delete"
    }
}

// Exports
export default loadStyles