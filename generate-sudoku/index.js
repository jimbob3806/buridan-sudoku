#!/usr/bin/env node

// General imports
const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")
const inquirer = require("inquirer")
const CLI = require("clui")

// Own imports
const { generateSudoku } = require("./lib/generateSudoku")

// Functions
const _initCli = () => {
    clear()
    console.log(
        chalk.green(
            figlet.textSync(
                "Buridan Sudoku",
                {
                    horizontalLayout: "fitted"
                }
            )
        )
    )
}
const _runCli = async () => {
    const questions = [
        {
            name: "Age",
            type: "input"
        }
    ]
    const result = await inquirer.prompt(questions)
    console.log(generateSudoku(2))
}

// Clui CLI optimization
const _cliStatus = new CLI.Spinner("Loading AGE")

// Launch CLI
_initCli()
_runCli()
