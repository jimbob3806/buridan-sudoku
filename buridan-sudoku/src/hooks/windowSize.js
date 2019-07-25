// General imports 
import { 
    useState, 
    useEffect 
} from "react"

// Custom hook
const useWindowSize = () => {  
    // State for windows size
    const initViewportWidth = window.innerWidth
    const initViewportHeight = window.innerHeight
    const [windowSize, setWindowSize] = useState({
        // Note that initial value of windowSize width and height values are set
        // using pre-defined constants (initViewportWidth/Height), since calling
        // calling window.innerWidth/Height was causing a deprecation warning
        // in the developer console. window.screen.availHeight/Width could have
        // been used instead, but this did not scale the layout correctly 
        // at all sizes, so the above workaround is used instead to avoid the 
        // depracation error.
        width: initViewportWidth,
        height: initViewportHeight
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