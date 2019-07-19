// General imports
import React, {
    useState
} from "react"

// Own imports
import HeaderContext from "../Header"

// Component
const HeaderState = props => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // Returns pathname for conditionally rendering active link in the header
    // drawer
    // eslint-disable-next-line
    const pathLoaded = () => { return location.pathname }

    return (
        <HeaderContext.Provider value = {{
            pathLoaded: pathLoaded,
            isDrawerOpen: isDrawerOpen,
            setIsDrawerOpen: setIsDrawerOpen
        }} >
            {props.children}
        </HeaderContext.Provider>
    )
}

// Exports
export default HeaderState