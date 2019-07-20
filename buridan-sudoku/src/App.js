// General imports
import React from "react"
/*eslint-disable no-unused-vars*/
import { 
    /*Router must be imported for its functionality to work, even though the 
    Router component wraps the parent App component.*/
    BrowserRouter as Router, Route, Redirect, Switch, Link
} from "react-router-dom"
/*eslint-enable no-unused-vars*/

// Material-ui imports
import { 
    GridList,
    GridListTile
} from "@material-ui/core"

// Own imports - styles
import "./styles/index.scss"

// Own imports 
    //Context & States
    import HeaderState from "./context/states/Header"
    import MainState from "./context/states/Main"
    // Components
    import {
        Main,
        Header
    } from "./components/exports"
    // Hooks
    import useStorePuzzle from "./hooks/storePuzzle"
    import useSetPuzzle from "./hooks/setPuzzle"
    // Style hooks
    import useAppStyles from "./styles/hooks/app"

// Component
const App = () => {  
    // State and context

    // Load puzzle into context, and watch changes
    useSetPuzzle()   // set puzzle from hash, local storage, or a default puzzle
    useStorePuzzle() // save any change to local storage with new Date

    // Styles
    const styles = useAppStyles()

    // Component render JSX
    return (
        <Router className = {styles.app}>

            <GridList cellHeight = "auto" spacing = {0}>

                <GridListTile cols = {2} rows = {1}>
                    <HeaderState>
                        <Header />
                    </HeaderState>                   
                </GridListTile>

                <GridListTile cols = {2} rows = {1}>
                    <MainState>
                        <Main />
                    </MainState>
                </GridListTile>
                
            </GridList>  

        </Router>   
    )
}

// Exports
export default App
