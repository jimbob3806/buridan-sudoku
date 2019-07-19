import {
    createContext
} from "react"

export default createContext({
    pathLoaded: () => {},
    // Indicates if header drawer is open for the purposes of rendering
    isDrawerOpen: false,
    setIsDrawerOpen: () => {}
})