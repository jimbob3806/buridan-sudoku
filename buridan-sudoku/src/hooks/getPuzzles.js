// Custom hook - fetches and decodes all puzzles from local storage
const useGetPuzzles = () => {
    // Fetch all puzzles from local storage
    const keys = Object.keys({...localStorage})
    // Decode local storage items
    const puzzleArray = keys.map(key => {
        return JSON.parse(localStorage.getItem(key))
    })
    return puzzleArray
}

// Exports
export default useGetPuzzles