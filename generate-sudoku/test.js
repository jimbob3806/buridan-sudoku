fetchCell = require("./fetchCell")
solvePuzzle = require("./solvePuzzle")

treeSize = require("./gradePuzzle")
shuffleIndexArray = require("./shuffleArray")

generateSolution = require("./generateSolution")
generatePuzzle = require("./generatePuzzle")


// console.log(generatePuzzle(
//     shuffleIndexArray(2).puzzleArray,
//     generateSolution(shuffleIndexArray(2).solutionArray).currentSolution
// ).join(""))
//console.log(generateSolution(shuffleIndexArray(2).solutionArray).currentSolution.join(""))
console.log(treeSize("500008103000000070200001000050080300006092007002405600003000900027000000040310008".split("").map(val => parseInt(val))))