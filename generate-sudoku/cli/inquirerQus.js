const primaryChoices = [
    {
        name: "Benchmark my system",
        value: "BENCH_SYS",
        short: "Benchmark system"
    },
    {
        name: "Benchmark population statistics",
        value: "BENCH_POP",
        short: "Benchmark population"
    },
    {
        name: "Generate some sudokus",
        value: "GEN_SUDOKU",
        short: "Generate sudoku"
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
        name: "Sample size used for finding mean tree size",
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
        default: 100,
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
        default: [
            "version",
            "seed",
            "puzzleGrade",
            "encodedSudoku",
            "createdAt"
        ]
    }
]
const systemBenchmarkQuestion = [
    {
        message: "Sample size (1-50)?",
        name: "SAMPLE_SIZE",
        type: "number",
        default: 10,
        filter: input => {
            return (input > 50 || input < 1) ? 10 : input
        }
    }
]
const populationBenchmarkQuestion = [
    {
        message: "Batch size (1-100)?",
        name: "BATCH_SIZE",
        type: "number",
        default: 10,
        filter: input => {
            return (input > 100 || input < 1) ? 10 : input
        }
    },
    {
        message: "Number of batches (1-100)",
        name: "NUMBER_OF_BATCHES",
        type: "number",
        default: 10,
        filter: input => {
            return (input > 100 || input < 1) ? 10 : input
        }
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
    systemBenchmarkQuestion: systemBenchmarkQuestion,
    populationBenchmarkQuestion: populationBenchmarkQuestion,
    generateSudokuQuestion: generateSudokuQuestion,
    // CONFRIMATION
    confirm: confirm
}