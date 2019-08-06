// Own imports
const { cliConfig } = require("./config/cli")

const primaryChoices = [
    {
        name: "Benchmark my system",
        value: "BENCH_SYS",
        short: "Benchmark system"
    },
    {
        name: "Generate some sudokus",
        value: "GEN_SUDOKU",
        short: "Generate sudokus"
    },
    {
        name: "Solve some sudokus",
        value: "SOLVE_PUZZLE",
        short: "Solve sudokus"
    },
    {
        name: "Grade some sudokus",
        value: "GRADE_PUZZLE",
        short: "Grade sudokus"
    },
    {
        name: "Change default config",
        value: "CHANGE_CONFIG",
        short: "Change Config"
    },
    {
        name: "I'm finished, please let me go",
        value: "FINISHED",
        short: "Finished"
    },
]
const generateSudokuChoices = [
    {
        name: "NPM version used",
        value: "version",
        short: "Version"
    },
    {
        name: "Seed used for generation",
        value: "seed",
        short: "Seed"
    },
    {
        name: "Mean tree size of puzzle",
        value: "meanTreeSize",
        short: "Tree size"
    },
    {
        name: "Standard deviation of tree size",
        value: "stdDevTreeSize",
        short: "Standard deviation tree size"
    },
    {
        name: "Sample size used for finding tree size",
        value: "treeSizeSampleSize",
        short: "Sample size"
    },
    {
        name: "Mean tree size for parent population",
        value: "populationMeanTreeSize",
        short: "Population mean tree size"
    },
    {
        name: "Standard deviation for parent population",
        value: "populationStdDevTreeSize",
        short: "Population standard deviation"
    },
    {
        name: "Puzzle grade",
        value: "puzzleGrade",
        short: "Grade"
    },
    {
        name: "Puzzle presented as string",
        value: "puzzleString",
        short: "Puzzle string"
    },
    {
        name: "Puzzle presented as array",
        value: "puzzleArray",
        short: "Puzzle array"
    },
    {
        name: "Solution presented as string",
        value: "solutionString",
        short: "Solution string"
    },
    {
        name: "Solution presented as array",
        value: "solutionArray",
        short: "Solution array"
    },
    {
        name: "Encoded sudoku (suitable for storing, or putting in a URL)",
        value: "encodedSudoku",
        short: "Encoded sudoku"
    },
    {
        name: "Time taken to create sudoku",
        value: "timeToCreate",
        short: "Time taken"
    },
    {
        name: "'Timestamp' for when the puzzle was created",
        value: "createdAt",
        short: "Time created"
    }
]


const primaryQuestion = {
    message: "What would you like to do?",
    name: "PRIMARY_QUESTION",
    type: "list",
    choices: primaryChoices
}
const generateSudokuQuestion = [
    {
        message: "How many (1-1000)",
        name: "NUM_OF_SUDOKU",
        type: "number",
        default: cliConfig.get("numberOfSudoku"),
        filter: input => {
            return (input > 1000 || input < 1) ? 10 : input
        }
    },
    {
        message: "Initial seed (positive number)",
        name: "INIT_SEED",
        type: "number",
        default: 1,
        filter: input => {
            return (input < 1) ? 1 : input
        }
    },
    {
        message: "Please choose the fields you would like to save...",
        name: "FIELDS",
        type: "checkbox",
        choices: generateSudokuChoices,
        default: cliConfig.get("sudokuFields")
    },
    {
        message: "Relative path to dir. for sudokus JSON file to be saved?",
        name: "PATH",
        type: "input",
        default: cliConfig.get("generateSudokuPath")
    }
]
const solvePuzzleQuestion = [
    {
        message: "Relative path to JSON file containing puzzles to be solved?",
        name: "PATH",
        type: "input",
        default: cliConfig.get("solvePuzzlePath")
    }
]
const gradePuzzleQuestion = [
    {
        message: "Relative path to JSON file containing puzzles to be graded?",
        name: "PATH",
        type: "input",
        default: cliConfig.get("gradePuzzlePath")
    }
]

// Confirm message
const confirm = message => {
    return {
        message: message,
        name: "CONFIRM",
        type: "confirm"
    }
}

// Exports
module.exports = {
    // QUESTIONS
    primaryQuestion: primaryQuestion,
    generateSudokuQuestion: generateSudokuQuestion,
    solvePuzzleQuestion: solvePuzzleQuestion,
    gradePuzzleQuestion: gradePuzzleQuestion,
    // CONFRIMATION
    confirm: confirm
}