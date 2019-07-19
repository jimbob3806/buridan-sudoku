//General imports
import React from "react"
/*eslint-disable no-unused-vars*/
import { 
    /*Router must be imported for its functionality to work, even though the 
    Router component wraps the parent App component.*/
    BrowserRouter as Router, Link, NavLink
} from "react-router-dom"
/*eslint-enable no-unused-vars*/

//Material-ui imports
import { 
    List
} from "@material-ui/core"
import {
    Help,
    Info,
    Create,
    Folder,
    GridOn
} from "@material-ui/icons"

// Own imports 
    //Context & States
    // Components
    import {
        DrawerItem
    } from "../exports"
    // Hooks
    // Style hooks

const HeaderDrawer = props => {
    // Styles
    const styles = props.styles
    
    // Component render JSX
    return(
        <div className = {styles.drawer}>
            {/*Routes from links rendered by the Main component, so parent 
            Router component wraps the entire App component instead.*/}
            <List>

                <Link to = "/solve" className = {styles.drawerItem}>
                    <DrawerItem text = "Solve" path = "/solve" 
                        styles = {styles}>
                        <GridOn /> {/*Icon to be displayed next to link*/}
                    </DrawerItem>
                </Link>

                <Link to = "/load" className = {styles.drawerItem}>
                    <DrawerItem text = "Load" path = "/load" styles = {styles}>
                        <Folder /> {/*Icon to be displayed next to link*/}
                    </DrawerItem>
                </Link>

                <Link to = "/set" className = {styles.drawerItem}>
                    <DrawerItem text = "Set Puzzle" path = "/set" 
                        styles = {styles}>
                        <Create /> {/*Icon to be displayed next to link*/}
                    </DrawerItem>
                </Link>

                <Link to = "/instructions" className = {styles.drawerItem}>
                    <DrawerItem text = "Instructions" path = "/instructions" 
                        styles = {styles}>
                        <Help /> {/*Icon to be displayed next to link*/}
                    </DrawerItem>
                </Link>

                <Link to = "/about" className = {styles.drawerItem}>
                    <DrawerItem text = "About" path = "/about" 
                        styles = {styles}>
                        <Info /> {/*Icon to be displayed next to link*/}
                    </DrawerItem>
                </Link>
                
            </List>
        </div>    
    )
}

export default HeaderDrawer