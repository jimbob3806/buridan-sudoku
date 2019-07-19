// General imports
import React, {
    useState
} from "react"

// Material-ui imports
import {
    TextField,
    Button
} from "@material-ui/core"

// Own imports
// import GlobalContext from "../context/Global"
import { 
    encode,
    decode
} from "../functions/sudokuEncode"

// Component
const SetPuzzle = () => {
    // const context = useContext(GlobalContext)
    const [solution, setSolution] = useState("")
    const [puzzle, setPuzzle] = useState("")

    const SOLUTION = "SOLUTION"
    const PUZZLE = "PUZZLE"
    const handleChange = field => event => {
        switch (field) {
            case SOLUTION: 
                return setSolution(event.target.value)
            case PUZZLE:
                return setPuzzle(event.target.value)
            default:
                return
        }
    }
    
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

    // Component render JSX
    return (
        <div>
            <form className={"FILL"} noValidate autoComplete="off">
                <TextField
                    className = {"FILL"}
                    label = "Solution"
                    onChange = {handleChange(SOLUTION)}
                    margin = "normal"
                    type = "number"
                    variant = "outlined"
                />
                <TextField 
                    className = {"FILL"}
                    label = "Puzzle"
                    onChange = {handleChange(PUZZLE)}
                    margin = "normal"
                    type = "number"
                    variant = "outlined"
                />
            </form>
            {result(solution, puzzle)}
            <Button className = {"FILL"} onClick = {() => storePuzzle(result(solution, puzzle))}>
                Save
            </Button>
        </div>
    )
}

// Exports
export default SetPuzzle