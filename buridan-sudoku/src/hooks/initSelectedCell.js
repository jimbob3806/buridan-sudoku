// General imports
import { 
    useContext
} from "react"

// Own imports
    // Context
    import GlobalContext from "../context/Global"
    import MainContext from "../context/Main"

// Custom hook - returns index closest to the center cell (index 40), which is
// not populated by a clue of the puzzle
const useInitSelectedPuzzle = () => {
    // State and context
    const context = useContext(GlobalContext)
    const mainContext = useContext(MainContext)

    // Do not bother to set an initial selectedCell if the puzzle in global
    // context is not of valid format, or if puzzle === solution, since there
    // will be no position for the selectedCell, or if a selected cell is 
    // already set
    const solution = context.solution
    const puzzle = context.puzzle
    const answer = context.answer
    const candidates = context.candidates
    if (         
        // Most likely case at top!
        mainContext.selectedCell ||
        solution.length !== 81 || 
        puzzle.length !== 81 || 
        answer.length !== 81 ||
        candidates.length !== 81 ||
        solution === puzzle
    ) {
        // Do not return error - client will indicate that no sudoku has been
        // loaded, since the new puzzle will not be rendered in the SolvePuzzle
        // page.
        return
    } else {
        // Returns number in range 1-4 indicating how far the given index is 
        // from the center cell (index 40). Diagonals considered one step
        const indexMap = index => {
            // Each statement describes a 2 rows, and 2 columns of cells, which 
            // form progresively smaller square borders about the center cell
            if (index === null) {
                // null indicates puzzle clue - return 5 (higher than any other
                // index)
                return 5
            } if (
                index / 9 <= 1 ||
                index / 9 >= 8 ||
                index % 9 === 0 ||
                index % 9 === 8
            ) {
                return 4
            } if (
                index / 9 <= 2 ||
                index / 9 >= 7 ||
                index % 9 === 1 ||
                index % 9 === 7
            ) {
                return 3
            } if (
                index / 9 <= 3 || 
                index / 9 >= 6 ||
                index % 9 === 2 ||
                index % 9 === 6
            ) {
                return 2
            } else {
                return 1
            }
        }
        // Returns array of indexes which are NOT occupied by a puzzle clue
        const validIndexArray = context.puzzle.map((value, index) => {
            return value === "0" ? index : null
        })
        const indexMapArray = validIndexArray.map(indexMap)
        const minDist = Math.min(...indexMapArray)
        // Returns array of closest valid indexes based on minDist and 
        // indexMapArray
        const closestIndexArray = validIndexArray.reduce((acc, cur, index) => {
            return indexMapArray[index] === minDist ? [...acc, cur] : acc
        }, [])
        // Random cell from closestIndexArray
        const selectedCell = closestIndexArray[
            Math.floor(Math.random() * closestIndexArray.length)
        ]
        mainContext.setSelectedCell(selectedCell)
    }
}

// Exports
export default useInitSelectedPuzzle