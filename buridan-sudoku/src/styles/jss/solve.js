// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const solveStyles = {
    solverContainer: props => ({
        display: "grid",
        backgroundColor: variables.secondaryColor1,
        height: props.responsiveSize * 13,
        width: props.responsiveSize * 10,
        placeItems: "center center",
        margin: `0 auto ${props.responsiveSize / 2}px auto`,
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
    // Custom styling specific to each button group
    numberSelector: {
        gridArea: "number"
    },
    operationSelector: {
        gridArea: "operation"
    },
    inputSelector: {
        gridArea: "input"
    }
}

// Exports
export default solveStyles