//General imports
import React, {
    useContext
} from "react"

//Material-ui imports
import { 
    SwipeableDrawer,
    AppBar,
    Toolbar,
    IconButton
} from "@material-ui/core"
import {
    Menu
} from "@material-ui/icons"

// Own imports 
    //Context & States
    import HeaderContext from "../../context/Header"
    // Components
    import {
        Drawer
    } from "../exports"
    // Hooks
    // Style hooks
    import useHeaderStyles from "../../styles/hooks/header"

//Render elements
const Header = () => {
    // State and context
    const headerContext = useContext(HeaderContext)

    // Styles
    const styles = useHeaderStyles()

    // Component rneder JSX
    return (
        <div>
            <AppBar position = "static" className = {styles.header}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="Menu"
                        onClick = {() => headerContext.setIsDrawerOpen(true)}
                    >
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <SwipeableDrawer
                anchor = "left"
                open = {headerContext.isDrawerOpen}
                onOpen = {() => headerContext.setIsDrawerOpen(true)}
                onClose = {() => headerContext.setIsDrawerOpen(false)}
            >
                <Drawer styles = {styles} />
            </SwipeableDrawer>
        </div>
    )
}

export default Header