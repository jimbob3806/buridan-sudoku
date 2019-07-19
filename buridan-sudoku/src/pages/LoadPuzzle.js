// General imports
import React, {
    useState
} from "react"
/*eslint-disable no-unused-vars*/
import { 
    /*Router must be imported for its functionality to work, even though the 
    Router component wraps the parent App component.*/
    BrowserRouter as Router, Route, Redirect, Switch, Link
} from "react-router-dom"
/*eslint-enable no-unused-vars*/

// Material-ui imports
import {
    Paper
} from "@material-ui/core"

// Own imports 
    //Context & States
    // Components
    // Hooks
    import useGetPuzzles from "../hooks/getPuzzles"
    import useLoadPuzzle from "../hooks/loadPuzzle"
    // Style hooks
    // Other
    import isOddBox from "../functions/isOddBox"


// Component
const LoadPuzzle = props => {
    // Context & state
    const [puzzleToLoad, setPuzzleToLoad] = useState(null)
    const localPuzzles = useGetPuzzles()

    // Styles
    const styles = props.styles
    
    // Load desired puzzle into global context
    useLoadPuzzle(puzzleToLoad)

    // Component pre-render JSX
    // Array of sudokus previously used by client
    const sudokus = localPuzzles.map((localPuzzle, index) => {
        // Returns array of cells from puzzle, conditionally rendering answers,
        // candidates, and clues with different styles - same logic as used in
        // SudokuGrid component, except without onClick functions and selected
        // cell style className assignment
        const displayArray = localPuzzle.puzzle.map((cell, index) => {
            if (cell === "0" && localPuzzle.answer[index] !== "0") {
                return (
                    <div key = {index} className = {`
                            ${styles.answer} 
                            ${isOddBox(index) ? styles.light : styles.dark}
                    `}>
                        {localPuzzle.answer[index]}
                    </div>
                )
            } if (cell === "0") {
                return (
                    <div key = {index} className = {`
                            ${styles.candidate} 
                            ${isOddBox(index) ? styles.light : styles.dark}
                    `}>
                        {localPuzzle.candidates[index].join(" ")}
                    </div>
                )
            } else {
                return (
                    <div  key = {index} className = {`
                        ${styles.puzzle} 
                        ${isOddBox(index) ? styles.light : styles.dark}
                    `}>
                        {cell}
                    </div>
                )
            }
        })
    
        // Map all cells generated above into rows, then into a sudoku to return
        const rows = []
        for (let count = 0; count < 9; count++) {
            rows.push(
                <div key = {count} className = {styles.row}>
                    {displayArray.splice(0,9)}
                </div>  
            )  
        }
        const sudoku = (
            <div key = {index} className = {styles.grid}>
              {rows}  
            </div>
        )
        return sudoku
    })

    // Component render JSX
    return (
        sudokus.map((puzzle, index) => {
            return (
                <Paper key = {index}>
                    <Link to = "/solve" onMouseDown = {() => {
                        /*onMouseDown ensures that setting of puzzle to context
                        is executed before the component unloads*/
                        setPuzzleToLoad(localPuzzles[index])
                    }}>
                        Link
                    </Link>

                    <div>
                        {puzzle}
                    </div>
                </Paper>
            )
        })
    )   
}

// Exports
export default LoadPuzzle

