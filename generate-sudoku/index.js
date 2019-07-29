#!/usr/bin/env node

// General imports
const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")
const inquirer = require("inquirer")
const CLI = require("clui")

// Own imports
const generateSolution = require("./lib/generateSolution")

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
    console.log(result)
}

// Clui CLI optimization
const _cliStatus = new CLI.Spinner("Loading AGE")

// Launch CLI
_initCli()
_runCli()
