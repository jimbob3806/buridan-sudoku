//General imports
import React, {
    useContext
} from "react"

//Material-ui imports
import {
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core"

// Own imports 
    //Context & States
    import HeaderContext from "../../context/Header"
    // Components
    // Hooks
    // Style hooks

//Render elements
const DrawerItem = props => {
    // Context & state
    const headerContext = useContext(HeaderContext)

    // Styles
    const styles = props.styles
    // Returns the correct style (active vs inactive) to conditionally render
    // links in the drawer
    const linkStyle = (headerContext.pathLoaded() === props.path) ? 
        styles.drawerItemActive : styles.drawerItem

    // Component render JSX
    return (
        <ListItem 
            button = {true}
            className = {linkStyle}
            onClick = {() => { headerContext.setIsDrawerOpen(false) }}
        >

            <ListItemIcon className = {linkStyle}> 
                {props.children} 
            </ListItemIcon>

            <ListItemText primary = {props.text} />

        </ListItem>
    )
}

export default DrawerItem