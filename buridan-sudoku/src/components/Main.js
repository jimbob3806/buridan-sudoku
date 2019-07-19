//General imports
import React, {
    useContext,
    useEffect
} from "react"
/*eslint-disable no-unused-vars*/
import { 
    /*Router must be imported for its functionality to work, even though the 
    Router component wraps the parent App component.*/
    BrowserRouter as Router, Route, Redirect, Switch
} from "react-router-dom"
/*eslint-enable no-unused-vars*/

//Material-ui imports

// Own imports 
    //Context & States
    import MainContext from "../context/Main"
    // Components
    import {
        About,
        Instructions,
        LoadPuzzle,
        SetPuzzle,
        SolvePuzzle
    } from "../pages/exports"
    // Hooks
    import useWindowSize from "../hooks/windowSize"
    // Style hooks
    import useMainStyles from "../styles/hooks/main"
    // Other

// Component
const Main = () => {
    // State & context
    const mainContext = useContext(MainContext)

    // Styles - called in top level, then passed as props to children of the
    // main component, so that the props are only set in one place
    const styles = useMainStyles({
        responsiveSize: mainContext.responsiveSize
    })

    // Update mainContext responsiveSize upon change of screen size - used for 
    // scaling display elements such as sudoku grids in SolveSudoku and 
    // LoadSudoku pages
    const size = useWindowSize()
    useEffect(() => {
        mainContext.setResponsiveSize()
    }, [mainContext, size])

    return (
        <div className = {styles.main}>
        
            <Switch>

                {/*Links to Route components below are rendered by the Header 
                component, so parent Router component wraps entire App component
                instead. Note that child components must not be rendered using 
                the render callback of a Route component, as this will prevent
                the use of hooks within those child components!*/}
                <Route exact path = "/">
                    <SolvePuzzle styles = {styles} />
                </Route>

                <Route path = "/solve">
                    <SolvePuzzle styles = {styles} />
                </Route>

                <Route path = "/about">
                    <About styles = {styles} />
                </Route>

                <Route path = "/instructions">
                    <Instructions styles = {styles} />
                </Route>

                <Route path = "/load">
                    <LoadPuzzle styles = {styles} />
                </Route>

                <Route path = "/set">
                    <SetPuzzle styles = {styles} />
                </Route>
                
            </Switch>

        </div>
    )
}

export default Main