// General imports
const chalk = require("chalk")
const figlet = require("figlet")
const inquirer = require("inquirer")
const CLI = require("clui")

// Misc UI elements
const progressBar = new CLI.Progress(40)
const bottomUi = new inquirer.ui.BottomBar()
const divider = "----------------------------------------------------" +
    "----------------------------"
// Displays cli name as presentable banner
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