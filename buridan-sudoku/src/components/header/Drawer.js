//General imports
import React, {
    useContext
} from "react"
/*eslint-disable no-unused-vars*/
import { 
    /*Router must be imported for its functionality to work, even though the 
    Router component wraps the parent App component.*/
    BrowserRouter as Router, Link, NavLink
} from "react-router-dom"
/*eslint-enable no-unused-vars*/

//Material-ui imports
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core"
import {
    Help,
    Create,
    Folder,
    GridOn
} from "@material-ui/icons"

// Own imports 
    //Context & States
    import HeaderContext from "../../context/Header"
    // Components
    // Hooks
    // Style hooks

const HeaderDrawer = props => {
    // Context & state
    const headerContext = useContext(HeaderContext)

    // Styles
    const styles = props.styles

    // Helper functions
    const linkStyle = (headerContext.pathLoaded() === props.path) ? 
        styles.drawerItemActive : styles.drawerItem
    
    // Component render JSX
    return(
        <div className = {styles.drawer}>
            {/*Routes from links rendered by the Main component, so parent 
            Router component wraps the entire App component instead.*/}
            <List>

                <Link to = "/solve" className = {styles.drawerItem}>
                    <ListItem 
                        button = {true}
                        className = {linkStyle}
                        onClick = {() => { 
                            headerContext.setIsDrawerOpen(false) 
                        }}
                    >

                        {/*Icon to be displayed next to link*/}
                        <ListItemIcon className = {linkStyle}> 
                            <GridOn /> 
                        </ListItemIcon>

                        <ListItemText primary = "Solve" />

                    </ListItem>
                </Link>

                <Link to = "/load" className = {styles.drawerItem}>
                    <ListItem 
                        button = {true}
                        className = {linkStyle}
                        onClick = {() => { 
                            headerContext.setIsDrawerOpen(false) 
                        }}
                    >

                        {/*Icon to be displayed next to link*/}
                        <ListItemIcon className = {linkStyle}> 
                            <Folder />
                        </ListItemIcon>

                        <ListItemText primary = "Solve" />

                    </ListItem>
                </Link>

                <Link to = "/set" className = {styles.drawerItem}>
                    <ListItem 
                        button = {true}
                        className = {linkStyle}
                        onClick = {() => { 
                            headerContext.setIsDrawerOpen(false) 
                        }}
                    >

                        {/*Icon to be displayed next to link*/}
                        <ListItemIcon className = {linkStyle}> 
                            <Create /> 
                        </ListItemIcon>

                        <ListItemText primary = "Solve" />

                    </ListItem>
                </Link>

                <Link to = "/instructions" className = {styles.drawerItem}>
                    <ListItem 
                        button = {true}
                        className = {linkStyle}
                        onClick = {() => { 
                            headerContext.setIsDrawerOpen(false) 
                        }}
                    >

                        {/*Icon to be displayed next to link*/}         
                        <ListItemIcon className = {linkStyle}> 
                            <Help />
                        </ListItemIcon>

                        <ListItemText primary = "Solve" />

                    </ListItem>
                </Link>
                
            </List>
        </div>    
    )
}

export default HeaderDrawer