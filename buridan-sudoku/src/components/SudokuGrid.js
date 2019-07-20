// General imports
import React, {
    useContext
} from "react"

// Material-ui imports

// Own imports 
    //Context
    import GlobalContext from "../context/Global"
    import MainContext from "../context/Main"
    // Components
    // Hooks
    import useInitSelectedCell from "../hooks/initSelectedCell"
    // Style hooks
    // Other
    import isOddBox from "../functions/isOddBox"

// Component
const SudokuGrid = props => {
    // State and context
    const context = useContext(GlobalContext)
    const mainContext = useContext(MainContext)

    // Set a selectedCell in mainContext so that users can interact only with
    // keyboard. selectedCell must NOT be occupied by a puzle clue, hence why
    // it cannot be set by default in MainState component, since it is in a
    // different position for each puzzle
    useInitSelectedCell()

    // Styles
    const styles = props.styles

    // Pre-render components
    // Nested divs used for sudoku instead of table since div styling is easier,
    // and a sudoku is not really a table in so far as benefitting from being
    // rendered by an HTML table
    // Mapping over cells in the puzzle, and rendering them each depending on if
    // there is an answer, candidate array, etc. available    
    const displayArray = context.puzzle.map((cell, index) => {
        // Returns array of cells from puzzle, conditionally rendering answers,
        // candidates, and clues with different styles
        if (cell === "0" && context.answer[index] !== "0") {
            return (
                <div  
                    key = {index} 
                    className = {`
                        ${styles.answer} 
                        ${isOddBox(index) ? styles.light : styles.dark}
                        ${
                            mainContext.selectedCell === index ? 
                                styles.selected : 
                                null
                        }
                    `} 
                    onClick = {() => 
                        mainContext.setSelectedCell(index)
                    }
                >
                    {context.answer[index]}
                </div>
            )
        } else if (cell === "0" && context.test[index] !== "0") {
            return (
                <div  
                    key = {index} 
                    className = {`
                        ${styles.test}
                        ${
                            mainContext.firstTest === index ? 
                                styles.first : 
                                styles.remainder
                        } 
                        ${isOddBox(index) ? styles.light : styles.dark}
                        ${
                            mainContext.selectedCell === index ? 
                                styles.selected : 
                                null
                        }
                    `}
                    onClick = {() =>
                        mainContext.setSelectedCell(index)
                    }
                >
                    {context.test[index]}
                </div>
            )
        } else if (cell === "0") {
            return (
                <div  
                    key = {index} 
                    className = {`
                        ${styles.candidate} 
                        ${isOddBox(index) ? styles.light : styles.dark}
                        ${
                            mainContext.selectedCell === index ? 
                                styles.selected : 
                                null
                        }
                    `}
                    onClick = {() =>
                        mainContext.setSelectedCell(index)
                    }
                >
                    {context.candidates[index].join(" ")}
                </div>
            )
        }  else {
            // Permanent values of puzzle that must not be changed - hence no
            // onClick function, as client will not interact here. Also no
            // selected cell, as client will not interact here
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

    // Cells to rows for display
    const rows = []
    for (let count = 0; count < 9; count++) {
        rows.push(
            <div key = {count} className = {styles.row}>
                {displayArray.splice(0,9)}
            </div>  
        )  
    }

    // Component render JSX
    return (
        <div className = {styles.sudoku}>
            {rows}
        </div>
    )
}

// Exports
export default SudokuGrid
