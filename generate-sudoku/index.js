#!/usr/bin/env node

// General imports
const clear = require("clear")
const inquirer = require("inquirer")
const fs = require("fs")

// Own imports
const { batchGenerate } = require("./lib/generateSudoku")
const { systemBenchmark } = require("./lib/benchmarks/system")
const {
    defaultRunJSON
} = require("./cli/defaultRunJSON")
const { 
    divider,
    banner
} = require("./cli/ui")
const {
    primaryQuestion,
    generateSudokuQuestion,
    solvePuzzleQuestion,
    gradePuzzleQuestion,
    confirm
} = require("./cli/inquirerQus")

// Functions
const cliBody = async () => {
    const choice = await inquirer.prompt(primaryQuestion)
    let choiceOptions
    switch (choice.PRIMARY_QUESTION) {
        case ("BENCH_SYS"):
            choiceOptions = {
                FUNCTION: systemBenchmark,
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
        default:
            break
    }
    if (choiceOptions && choiceOptions.CONFIRM) {
        choiceOptions.FUNCTION(...Object.values(choiceOptions.ARGS))
        console.log(`
Your results are displayed above... Anything else?
        `)
        return cliBody()
    } else if (choiceOptions) {
        console.log(`
${divider}
Can't make your mind up? Let's start again
        `)
        return cliBody()
    } else {
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
