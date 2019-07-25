// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const shareStyles = {
    shareContainer: props => ({
        display: "grid",
        // Note that placeItems: "center center" was causing some unresolved
        // issue regarding how the react-share icon was positioning itself,
        // so a margin is used on each component instead (see below)
        backgroundColor: variables.primaryColor1,
        height: props.responsiveSize * 2,
        width: props.responsiveSize * 10,
        margin: `0 auto ${props.responsiveSize / 2}px auto`,
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "100%",
        gridTemplateAreas: `
            "facebook    twitter"
        `
    }),
    facebook: props => ({
        gridArea: "facebook",
        "& svg": {
            // Dynamically sizes react-share Icon component, and locates it 
            // centrally in the grid without throwing any svg attribute 
            // sizing errors (see issue 
            // https://github.com/nygardk/react-share/issues/247#issue-472920888
            // for more)
            width: props.responsiveSize * 1.5,
            height: props.responsiveSize * 1.5,
            margin: `${props.responsiveSize * 0.25}px 
                ${props.responsiveSize * 1.75}px`
        }
    }),
    twitter: props => ({
        gridArea: "twitter",
        "& svg": {
            // Dynamically sizes react-share Icon component, and locates it 
            // centrally in the grid without throwing any svg attribute 
            // sizing errors (see issue 
            // https://github.com/nygardk/react-share/issues/247#issue-472920888
            // for more)
            width: props.responsiveSize * 1.5,
            height: props.responsiveSize * 1.5,
            margin: `${props.responsiveSize * 0.25}px 
                ${props.responsiveSize * 1.75}px`
        }
    })
}

// Exports
export default shareStyles