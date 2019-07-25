// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const advertStyles = {
    advertContainer: props => ({
        backgroundColor: variables.neutralColor1,
        height: props.responsiveSize * 4,
        width: props.responsiveSize * 10,
        margin: `0 auto ${props.responsiveSize / 2}px auto`
    })
}

// Exports
export default advertStyles