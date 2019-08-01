// Own imports
const { sudokuIndexArray } = require("./sudokuIndexArray")

// Returns random positive integer (up to 1e+10) given a positive, non-zero, 
// integer seed. min max values may be set, and are inclusive
const seedRandInt = (seed, min = 0, max = 10000000000) => {
    const primeOne = 363585258251
    const primeTwo = 3432668101571
    let randInt = seed + 1
    for (let x = 0; x < 1000; x ++) {
        randInt = (randInt * primeOne) % primeTwo
    }
    return (randInt % (max + 1) + min)
}

// Shuffles an array using a SEED, so that a sudoku produced from a given
// shuffled array of numbers 0-80 may be replicated
const shuffleArray = (array, seed) => {
    // Set maximum and minimum index values
    const min = 0
    const max = array.length - 1
    let indexArray = []
    // Seed used to generate a random index
    let indexSeed = seedRandInt(seed)
    while (indexArray.length < array.length) {
        const newIndex = seedRandInt(indexSeed, min, max)
        // Add index to indexArray as long as it is not already in the array
        indexArray.includes(newIndex) ? null : indexArray.push(newIndex)
        // Update seed used to generate random index. Note that using the
        // newIndex to set the indexSeed, or some equivalent optimization
        // involving generating random numbers with indexes as the seed is not
        // valid, since the randInt function will return the same value for a
        // given seed, resulting in patterns when an index is used to seed the 
        // generator, expecially when the given array is short --> randInt 
        // function MUST be seeded with an independant value, and the new seeds
        // required for shuffling MUST be calculated independantly too
        indexSeed = seedRandInt(indexSeed)
    }
    // Map each value in original array to a new index using the indexArray
    const shuffledArray = indexArray.map(value => {
        return array[value]
    })
    return shuffledArray
}

// Returns shuffled array of indexes for creating the solution, and 
// then removing clues to create the puzzle
const shuffleIndexArray = seed => {
    const shuffledArray = shuffleArray(sudokuIndexArray(), seed)
    return shuffledArray
}

// Exports
module.exports = {
    seedRandInt: seedRandInt,
    shuffleArray: shuffleArray,
    shuffleIndexArray: shuffleIndexArray
}