// General imports
const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")
const inquirer = require("inquirer")
const CLI = require("clui")
const fs = require("fs")

// Misc UI elements
const progressBar = new CLI.Progress(40)
const bottomUi = new inquirer.ui.BottomBar()
const divider = "----------------------------------------------------" +
    "----------------------------"
const banner = () => {
    const banner = chalk.green(figlet.textSync(
        "Buridan Sudoku",
        {
            horizontalLayout: "fitted"
        }
    ))
    console.log(banner)
}

// Exports
module.exports = {
    progressBar: progressBar,
    bottomUi: bottomUi,
    divider: divider,
    banner: banner
}