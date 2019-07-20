// Custom hook - fetches and decodes all puzzles from local storage
const useGetPuzzles = () => {
    // Fetch all puzzles from local storage
    const keys = Object.keys({...localStorage}).reduce((acc, cur) => {
        // Return only local storage keys that are formatted like an encoded 
        // sudoku (9 goups separated by periods)
        return cur.split(".").length === 9 ? [...acc, cur] : acc
    }, [])
    // Decode local storage items
    const puzzleArray = keys.map(key => {
        return JSON.parse(localStorage.getItem(key))
    })
    return puzzleArray
}

// Exports
export default useGetPuzzles