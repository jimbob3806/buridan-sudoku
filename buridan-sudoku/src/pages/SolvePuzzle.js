/*Follow the order laid out below in all relevant JS files - just copy this, 
or another template file to get going!*/

// General imports
import React, {
    useContext
} from "react"
import {
    FacebookShareButton,
    TwitterShareButton
} from "react-share"
import {
    FacebookIcon,
    TwitterIcon
} from "react-share"

// Material-ui imports
import { 
    Paper
} from "@material-ui/core"

// Own imports 
    //Context
    import MainContext from "../context/Main"
    // Components
    import {
        SudokuGrid,
        InputSelector,
        NumberSelector,
        OperationSelector,
        CheckDialog,
        RestartDialog,
        PopulateDialog,
        TestDialog
    } from "../components/exports"
    // Hooks
    import useWatchKey from "../hooks/watchKey"
    import useGetPuzzles from "../hooks/getPuzzles"
    // Style hooks

// Component
const SolvePuzzle = props => {
    // State and context
    const mainContext = useContext(MainContext)
    const localPuzzles = useGetPuzzles()

    // Styles
    const styles = props.styles

    // Single rxjs observable for all keyboard inputs
    useWatchKey()

    // Pre-render
    // Finding most recent puzzle in localStorage, and returning the hash to
    // make a url to share. Most recent localStorage puzzle will always be the
    // on loaded in the global context
    let hash = ""
    if (localPuzzles.length !== 0) {
        const latestPuzzle = localPuzzles.reduce((acc, cur) => {
            // Return the puzzle which was active most recently
            return acc.lastActive > cur.lastActive ? acc : cur
        })
        hash = latestPuzzle.encodedOriginal
    } 
    const url = `https://jimbob3806.github.io/buridan-sudoku#${hash}`
    console.log(url)

    // Component render JSX
    return (
        <div>
            
            <Paper className = {styles.shareContainer}>

                <FacebookShareButton
                    url = {url}
                    quote = {"Buridan Sudoku"}
                    className = {styles.facebook}
                >
                    <FacebookIcon
                    size = {mainContext.responsiveSize * 1.5}
                    round />
                </FacebookShareButton>

                <TwitterShareButton
                    url = {url}
                    quote = {"Buridan Sudoku"}
                    className = {styles.twitter}
                >
                    <TwitterIcon
                    size = {mainContext.responsiveSize * 1.5}
                    round />
                </TwitterShareButton>   

            </Paper>         

            <Paper className = {styles.solverContainer}>
                
                <OperationSelector styles = {styles} />
                <CheckDialog styles = {styles} />
                <RestartDialog styles = {styles} />
                <PopulateDialog styles = {styles} />  
                <TestDialog styles = {styles} />                  
            
                <InputSelector styles = {styles} />

                <SudokuGrid styles = {styles} />
            
                <NumberSelector styles = {styles} />

            </Paper>

        </div>
    )
}

// Exports
export default SolvePuzzle