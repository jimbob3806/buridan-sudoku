// General imports
import React from "react"

// Material-ui imports
import {
    Paper, 
    Typography,
    Tooltip
} from "@material-ui/core"
import {
    Add,
    LiveHelp,
    CallSplit,
    Remove,
    Check,
    Visibility,
    Replay,
    Apps,
    Book
} from "@material-ui/icons"

// Own imports 
    // Context & States
    // Components
    // Hooks
    // Style hooks
    // Other

// Component
const Instructions = props => {   
    //Styles
    const styles = props.styles 

    // Component render JSX
    return (
        <div>

            <Paper className = {styles.instructionParentContainer}>

                <h2>Solve Puzzle</h2>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.actionTitle}>
                        ACTION
                    </Typography>
                    <Typography className = {styles.descriptionTitle}>
                        DESCRIPTION
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Selected Cell</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        The selected cell is indicated by a grey background. The
                        selected cell may be changed by clicking on the desired
                        cell, or by using the WASD keys. You cannot select a
                        cell which is a puzzle clue. The number(s) (answer, 
                        candidates, or test number) in the cell will also be 
                        indicated by the number selector underneath the sudoku
                        (shaded numbers are selected).
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Puzzle Clues</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Puzzle clues are indicated by the grey numbers in the 
                        sudoku (answers inserted by you are white by contrast).
                        Puzzle clues obviously may not be changed, or removed.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Answers</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        In contrast to puzzle clues, answers inserted by you are
                        white. They may obviously be changed, or removed, unlike
                        puzzle clues.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Candidates</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Candidates are displayed in white (like answers), but
                        are much smaller (all 9 possible candidates may fit
                        in a single cell).
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Test Numbers</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        The test feature allows you to make an initial
                        assumption (the value of some cell which has 
                        multiple possible candidates), then "follow through" 
                        on this assumption, by filling out other cells based
                        on this initial assumption.

                        Test numbers are displayed in green, with the first 
                        assumption displayed in red. Please note that the 
                        test feature does NOT track candidates, so any 
                        changes you make to a cell's candidates during a 
                        test may not be recovered, if the initial assumption 
                        turns out to be wrong.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Remove a cell (R)" 
                        className = {styles.action}
                    >
                        <Remove />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - R. Removes the number(s) in the selected cell.
                        If the selected cell contains only candidates, then
                        these candidates will be removed. If the cell contains
                        an answer, then only the answer will be removed, and
                        any candidates in that cell will be displayed. If a test
                        number is in the selected cell, then this will behave
                        the same as if it were a cell with an answer in it.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "See an answer (F)" 
                        className = {styles.action}
                    >
                        <Visibility />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - F. Reveals the correct answer for the selected
                        cell, inserting it as an answer to that cell.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Check your answers (C)" 
                        className = {styles.action}
                    >
                        <Check />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - C. Checks all of your answers, and removes 
                        any of them that are incorrect. Displays a dialog to
                        indicate how many answers were incorrect (or not, as
                        the case may be).
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Restart (Z)" 
                        className = {styles.action}
                    >
                        <Replay />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - Z. Removes ALL answers, and candidates,
                        reseting the sudoku to the original puzzle. A dialog
                        will be displayed to confirm that you wish to continue
                        with the action.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Add all candidates (X)" 
                        className = {styles.action}
                    >
                        <Apps />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - X. Fills ANY cell without a puzzle clue,
                        answer, or test number with candidates from 1-9,
                        replacing any candidates which may have benn there 
                        before. A dialog will be displayed to confirm that you 
                        wish to continue with the action.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Insert answers (Q)" 
                        className = {styles.action}
                    >
                        <Add />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - Q. When this input method is selected 
                        (indicated by a shaded background on the button), you 
                        may enter answers in the selected cell by pressing 
                        number keys 1-9 on your keyboard, or by clicking on the
                        number selector bar underneath the sudoku. The currently
                        selected answer will be shaded in the selector bar.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Insert candidates (E)" 
                        className = {styles.action}
                    >
                        <LiveHelp />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - E. When this input method is selected 
                        (indicated by a shaded background on the button), you 
                        may enter/remove potential candidates in the selected 
                        cell by pressing number keys 1-9 on your keyboard, or by
                        clicking on the number selector bar underneath the 
                        sudoku. The currently selected candidate(s) will be 
                        shaded in the selector bar.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Test a candidate (V)" 
                        className = {styles.action}
                    >
                        <CallSplit />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Hotkey - V. When this input method is selected 
                        (indicated by a shaded background on the button), you 
                        may enter test numbers in the selected cell by pressing 
                        number keys 1-9 on your keyboard, or by clicking on the
                        number selector bar underneath the sudoku. The currently
                        selected test number will be shaded in the selector bar.

                        Selecting this input method again if you are already in 
                        this mode will display a dialog prompting you on what 
                        you wish to do with the test numbers. They may be
                        delted entirely, deleted with the initial number being
                        removed as a candidate from its cell, or added to your
                        answer. Choose as directed by the dialog.
                    </Typography>
                </div>

            </Paper>

            <Paper className = {styles.instructionParentContainer}>

                <h2>Load Puzzle</h2>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.actionTitle}>
                        ACTION
                    </Typography>
                    <Typography className = {styles.descriptionTitle}>
                        DESCRIPTION
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Play</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Redirects you to the solve page, where you can continue
                        completing the selected sudoku.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Delete</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Deletes the selected sudoku puzzle from your browser's
                        local storage. This action CANNOT be reversed, and all 
                        progress on the puzzle WILL be lost! A dialog will be 
                        displayed to confirm that you wish to continue with this
                        action.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Puzzle</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        The load page displays all of the puzzles you have 
                        stored in your browser's local storage. They are
                        displayed in order of when they were last played,
                        starting with the most recent. A puzzle is stored in the
                        local storage of your browser whenever it is played, and
                        is updated whenever you make a change (add an answer, or
                        candidate); you never have to actively "save" your
                        puzzles. Note that test numbers are NOT tracked in the
                        browser local storage.
                    </Typography>
                </div>
            
            </Paper>

            <Paper className = {styles.instructionParentContainer}>

                <h2>Set Puzzle</h2>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.actionTitle}>
                        ACTION
                    </Typography>
                    <Typography className = {styles.descriptionTitle}>
                        DESCRIPTION
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Solution Input</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Accepts a list of numbers that represents the solution
                        of a given sudoku puzzle. Numbers should be provided as 
                        a concatenated list of the ROWS of solution to a sudoku
                        puzzle.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Puzzle Input</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Accepts a list of numbers that represents a given 
                        sudoku. Numbers should be provided as a concatenated 
                        list of the ROWS of the puzzle, with 0s in place of
                        empty cells.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Encoded Input</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Accepts a string which represents an encoded sudoku.
                        Encoded sudokus are formed of 9 string "fragments"
                        separated by periods. Each fragment describes a row of 
                        the solution, and indicates where the puzzle clues are
                        in that row.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Puzzle Display</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        The puzzle displayed represents the puzzle encoded in
                        the url at the bottom of this page. This element updates
                        EVERY time any of the input values (solution, puzzle,
                        encoded) change, and its value is based on the the last
                        input change. If the last input change is invalid, or 
                        fields are mismatched, the encoded url will reflect
                        this! Therefore always ensure that the solution, and 
                        puzzle inputs are matched, or that the last input change
                        was on the encoded input, as this input updates both the
                        puzzle, and the solution which is encoded in the url.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Save</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Saves the displayed puzzle to your browser's local 
                        storage, and redirects you to the load page, where you
                        will find that the new puzzle is at the top! Please 
                        check the puzzle in the grid above using the display 
                        toggle button beforehand.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>Display Toggle</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Toggles between displaying the puzzle, and the solution
                        which is to be encoded in the url. Button reads "PUZZLE"
                        when the SOLUTION is displayed in the grid above, and 
                        reads "SOLUTION" when the PUZZLE is displayed in the
                        grid above (i.e. always indicates what WILL be
                        displayed if it is pressed). As the grid will always 
                        display the puzzle, and solution which are currently 
                        being encoded, the toggle button is a good way to check
                        that the last input into the fields at the top of the 
                        page were not invalid, or mismatched.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Typography className = {styles.action}>
                        {/*<p> element required for a nested selector on the 
                        stlyes.action class, allowing for text in typography
                        to be made smaller without changing icon size*/}
                        <p>URL</p>
                    </Typography>
                    <Typography className = {styles.description}>
                        Visiting the URL at the bottom of the page will load the
                        puzzle displayed in the grid above into a user's 
                        local storage, and redirect them to the solve 
                        page where they may complete the puzzle (the encoded 
                        version of the puzzle, and solution displayed in the 
                        grid above is stored in the URL hash). Please check
                        the puzzle in the grid above using the display toggle
                        button beforehand.
                    </Typography>
                </div>

                <div className = {styles.instructionContainer}>
                    <Tooltip 
                        title = "Copy URL to clipboard!"
                        className = {styles.action} 
                    >
                        <Book />
                    </Tooltip>
                    <Typography className = {styles.description}>
                        Copies the URL displayed at the bottom of the page to 
                        your clipboard. Please check the puzzle in the grid 
                        above using the display toggle button beforehand.
                    </Typography>
                </div>
            
            </Paper>

        </div>
    )
}

// Exports
export default Instructions