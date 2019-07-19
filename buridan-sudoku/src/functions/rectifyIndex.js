// Return index in range 0-80, such that the index wraps the rows and 
// columns of the sudoku, and is not an index occupied by a clue of the
// sudoku puzzle
// Available wrapTypes - describes where index wraps TO
export const TO_ROW_END = "TO_ROW_END"
export const TO_ROW_START = "TO_ROW_START"
export const TO_COLUMN_START = "TO_COLUMN_START"
export const TO_COLUMN_END = "TO_COLUMN_END"
export const rectifyIndex = (index, wrapType, puzzle) => {
    // Cause index to wrap back to end/start of column/row
    const wrapIndex = num => {
        switch (wrapType) {
            case TO_ROW_END:
                return num % 9 === 0 ? num + 8 : num - 1
            case TO_ROW_START:
                return num % 9 === 8 ? num - 8 : num + 1
            // NOTE different equalities on TO_COLUMN_END and TO_COLUMN_START
            // these are correct!
            case TO_COLUMN_END:
                return num / 9 < 1 ? num + 72 : num - 9
            case TO_COLUMN_START:
                return num / 9 >= 8 ? num - 72 : num + 9
            default:
                return
        }
    }
    // Repeatedly apply wrapIndex, until the result is not a set clue of 
    // the puzzle, which users should not be able to interact with
    const noClueAtIndex = num => {
        const nextIndex = wrapIndex(num)
        if (puzzle[nextIndex] === "0") {
            return nextIndex
        } else {
            return noClueAtIndex(nextIndex)
        }
    }
    return noClueAtIndex(index)
}

