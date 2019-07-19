// General imports 
import { 
    useState, 
    useEffect 
} from "react"

// Custom hook
const useWindowSize = () => {  
    // State for windows size
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    // Handle change of window size
    const handleSizeChange = () => {
        setWindowSize ({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        // Watch window size
        window.addEventListener("resize", handleSizeChange)
        // Clean up on unmount
        return () => {
            window.removeEventListener("resize", handleSizeChange)
        }
    })
    //window.addEventListener("resize", handleSizeChange)
    return windowSize
}

// Exports
export default useWindowSize