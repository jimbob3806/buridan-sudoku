/*Follow the order laid out below in all relevant JS files - just copy this, 
or another template file to get going!*/

// General imports
import React, {
    useContext
} from "react"

// Material-ui imports

// Own imports
import GlobalContext from "../context/Global"

// Component
const Instructions = () => {
    const context = useContext(GlobalContext)

    

    // Component render JSX
    return (
        <div>
            Instructions
            {context.puzzle}
        </div>
    )
}

// Exports
export default Instructions