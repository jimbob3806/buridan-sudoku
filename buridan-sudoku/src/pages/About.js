/*Follow the order laid out below in all relevant JS files - just copy this, 
or another template file to get going!*/

// General imports
/*eslint-disable no-unused-vars*/
import React, {
    useEffect,
    useContext
} from "react"

// Material-ui imports

// Own imports
import GlobalContext from "../context/Global"

// Component
const About = () => {
    const context = useContext(GlobalContext)

    

    // Component render JSX
    return (
        <div>
            About
        </div>
    )
}

// Exports
export default About