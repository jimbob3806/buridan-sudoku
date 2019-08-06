#!/usr/bin/env node

// General imports
const clear = require("clear")
const inquirer = require("inquirer")
const fs = require("fs")

// Own imports
const { batchGenerate } = require("./lib/generateSudoku")
const { systemBenchmark } = require("./lib/benchmarks/system")
const { batchGradePuzzle } = require("./lib/functions/gradePuzzle")
const { batchSolvePuzzle } = require("./lib/functions/solvePuzzle")
const { setConfig } = require("./cli/config/set")
const {
    defaultRunJSON
} = require("./cli/config/defaultRunJSON")
const { 
    divider,
    banner
} = require("./cli/utils/ui")
const {
    primaryQuestion,
    generateSudokuQuestion,
    solvePuzzleQuestion,
    gradePuzzleQuestion,
    confirm
} = require("./cli/inquirerQus")

// Functions
const cliBody = async () => {
    // Prompt user for their desired action
    const choice = await inquirer.prompt(primaryQuestion)
    // Fetch desired arguments for user's desired action
    let choiceOptions
    switch (choice.PRIMARY_QUESTION) {
        case ("BENCH_SYS"):
            choiceOptions = {
                FUNCTION: systemBenchmark,
                ARGS: {},
                ...await inquirer.prompt(confirm("Are you sure?"))
            }
            break
        case ("GEN_SUDOKU"):
            choiceOptions = {
                FUNCTION: batchGenerate,
                ARGS: await inquirer.prompt(generateSudokuQuestion),
                ...await inquirer.prompt(confirm("Are you sure?"))
            }
            break
        case ("SOLVE_PUZZLE"):
            choiceOptions = {
                FUNCTION: batchSolvePuzzle,
                ARGS: await inquirer.prompt(solvePuzzleQuestion),
                ...await inquirer.prompt(confirm("Are you sure?"))
            }
            break
        case ("GRADE_PUZZLE"):
            choiceOptions = {
                FUNCTION: batchGradePuzzle,
                ARGS: await inquirer.prompt(gradePuzzleQuestion),
                ...await inquirer.prompt(confirm("Are you sure?"))
            }
            break
        case ("CHANGE_CONFIG"):
            choiceOptions = {
                FUNCTION: setConfig,
                ARGS: await inquirer.prompt(generateSudokuQuestion),
                ...await inquirer.prompt(confirm("Are you sure?"))
            }
            break
        default:
            break
    }
    // Execute user's desired action
    if (choiceOptions && choiceOptions.CONFIRM) {
        // user has confirmed actions - run requested functions, with requested
        // arguments, then ask for more input by restarting cli flow
        choiceOptions.FUNCTION(...Object.values(choiceOptions.ARGS))
        console.log(`
Your results are displayed above... Anything else?
        `)
        return cliBody()
    } else if (choiceOptions) {
        // user did not confirm their actions - start the cli flow again
        console.log(`
${divider}
Can't make your mind up? Let's start again
        `)
        return cliBody()
    } else {
        // user has requested to leave the cli - close the cli
        console.log(`
${divider}
Thanks for stopping by
        `)
        return closeCli()
    }
}

const runCli = () => {
    // Initiate run.json with default values, ensuring that it is clean after
    // the last use
    fs.writeFileSync(`${__dirname}/cli/run.json`, defaultRunJSON)
    // Initiate ui elements for providing user feedback whilst a cli function
    // completes
    clear()
    banner()
    cliBody()
}

const closeCli = () => {
    // Clean up run.json with default values
    fs.writeFileSync(`${__dirname}/cli/run.json`, defaultRunJSON)
    // Exit with no error - process.exit is convenient for terminating the
    // fs.watch process in _watchCli, which obviously still runs when
    // _runCli is finished
    process.exit(0)
}

// Launch the CLI
runCli()
