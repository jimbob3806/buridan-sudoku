// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const shareStyles = {
    shareContainer: props => ({
        display: "grid",
        backgroundColor: variables.primaryColor1,
        height: props.responsiveSize * 2,
        width: props.responsiveSize * 10,
        placeItems: "center center",
        margin: `0 auto ${props.responsiveSize / 2}px auto`,
        gridTemplateColumns: "4% 44.5% 44.5% 4%",
        gridTemplateRows: "4% 92% 4%",
        gridColumnGap: "1%",
        gridRowGap: "1%",
        gridTemplateAreas: `
            ".  .           .           ."
            ".  facebook    twitter     ."
            ".  .           .           ."
        `
    }),
    facebook: {
        gridArea: "facebook"
    },
    twitter: {
        gridArea: "twitter"
    }
}

// Exports
export default shareStyles