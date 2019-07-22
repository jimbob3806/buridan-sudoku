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
import { CopyToClipboard } from "react-copy-to-clipboard"

// Material-ui imports
import {
    TextField,
    Button,
    Tooltip,
    Paper,
    Typography
} from "@material-ui/core"
import { 
    Book
} from "@material-ui/icons"

// Own imports 
    // Context & States
    // Components
    // Hooks
    // Style hooks
    // Other
    import { 
        encode,
        decode
    } from "../functions/sudokuEncode"
    import isOddBox from "../functions/isOddBox"

// Component
const SetPuzzle = props => {
    // Context & state
    const [solution, setSolution] = useState("")
    const [puzzle, setPuzzle] = useState("")
    const [selectedDisplay, setSelectedDisplay] = useState(0)

    // Styles
    const styles = props.styles

    // Helper functions
    const SOLUTION = "SOLUTION"
    const PUZZLE = "PUZZLE"
    const ENCODED = "ENCODED"
    const handleChange = field => event => {
        switch (field) {
            case SOLUTION: 
                return setSolution(event.target.value)
            case PUZZLE:
                return setPuzzle(event.target.value)
            case ENCODED:
                setSolution(decode(event.target.value)[0])
                return setPuzzle(decode(event.target.value)[1])
            default:
                return
        }
    }
    // Check to see if a solution and puzzle have been entered (passing an empty
    // string to encode will throw an error)
    const result = (solution, puzzle) => {
        if (solution !== "" && puzzle !== "") {
            return encode(solution, puzzle)
        }
        else {
            return 
        }
    }

    const storePuzzle = encodedOriginal => {
        const puzzle = decode(encodedOriginal)[1].split("")
        const solution = decode(encodedOriginal)[0].split("")
        const answer = puzzle
        const candidates = puzzle.map(() => [])
        const encodedAnswer = encodedOriginal
        // encodedOriginal stored as key in local storage, as this is a
        // unique reference to the puzzle, which will cause the value to
        // be overwritten each time the client comes back to the puzzle
        // and makes changes to the answer.
        return localStorage.setItem(encodedOriginal, JSON.stringify({
            // Original stored incase client wants to restart
            puzzle: puzzle,
            solution: solution,
            answer: answer,
            candidates: candidates,
            encodedOriginal: encodedOriginal,
            encodedAnswer: encodedAnswer,
            lastActive: new Date()
        }))
        
    }

    // Component pre-render JSX
    // Solution and puzzle as passed by TextField components rendered on page
    // Formatting solution and puzzle state to be mapped over
    const [solutionArray, puzzleArray] = [solution.split(""), puzzle.split("")]
    const sudokus = [solutionArray, puzzleArray].map((value, index) => {
        // Returns array of cells from puzzle
        const displayArray = value.map((cell, index) => {
            if (cell === "0") {
                return (
                    <div key = {index} className = {`
                            ${styles.candidate} 
                            ${isOddBox(index) ? styles.light : styles.dark}
                    `}>
                        {}
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
    // 
    const url = `https://buridansudoku.co.uk#${result(solution, puzzle)}`

    // Component render JSX - Encoded cell will populate itself with the encoded
    // puzzle if the puzzle and solution fields are filled. 
    return (          
        <Paper className = {styles.setContainer}>

            {/*No form element really required, as it interferes with styling,
            and all operations are local, with no server involved on this 
            page*/}
            <TextField
                className = {styles.solutionArr}
                label = "Solution"
                onChange = {handleChange(SOLUTION)}
                margin = "normal"
                type = "number"
                variant = "outlined"
            />

            <TextField 
                className = {styles.puzzleArr}
                label = "Puzzle"
                onChange = {handleChange(PUZZLE)}
                margin = "normal"
                type = "number"
                variant = "outlined"
            />

            <TextField 
                className = {styles.encodedArr}
                label = "Encoded"
                onChange = {handleChange(ENCODED)}
                margin = "normal"
                type = "string"
                variant = "outlined"
            />

            <div className = {styles.sudoku}>
                {sudokus[selectedDisplay]}
            </div>

            <Link 
                to = "/load" 
                onMouseDown = {() => {
                /*onMouseDown ensures that setting of puzzle to 
                context is executed before the component unloads*/
                    storePuzzle(result(solution, puzzle))
                }}
                className = {styles.save}
            >
                <Tooltip title = "Redirects to Load Puzzle page!">
                    <Button className = {styles.buttonSingle}>
                            SAVE
                    </Button>
                </Tooltip>
            </Link>

            <Tooltip title = 
                "Toggles between displaying the puzzle, and the solution">
                <Button 
                    className = 
                        {`${styles.toggle} ${styles.buttonSingle}`}
                    onClick = {() => { 
                        const newDisplay = selectedDisplay ? 0 : 1
                        return setSelectedDisplay(newDisplay) 
                    }}
                >
                    {selectedDisplay ? SOLUTION : PUZZLE}
                </Button>
            </Tooltip>

            <Typography variant = "caption" className = {styles.url}>
                {`URL: ${url}`}
            </Typography>  

            <CopyToClipboard 
                text = {url}
            >
                <Tooltip title = "Copy URL to clipboard!">
                    <Button 
                        className = {`${styles.urlSave} ${styles.buttonSingle}`}
                    >
                        <Book />
                    </Button>  
                </Tooltip>
            </CopyToClipboard>   

        </Paper>
    )
}

// Exports
export default SetPuzzle