// General imports
import React, {
    useEffect
} from "react"

// Material-ui imports

// Own imports 
    //Context
    // Components
    // Hooks
    // Style hooks

// Component
const AdsByGoogle = () => {
    // State and context

    //Styles

    // Helper functions

    // Component mounting, and unmounting! - Lifecycel
    useEffect(() => {
        // Mount logic
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        return () => {
            // Unmount logic
        }
    })

    // Pre-render components

    // Component render JSX
    return (
        <div>

            <ins className = "adsbygoogle"
                 style= {{ display: "block" }}
                 data-ad-client = "ca-pub-7598872101549974"
                 data-ad-slot = "2259574554"
                 data-ad-format = "auto"
                 data-full-width-responsive = "true">
            </ins>

        </div>
    )
}

// Exports
export default AdsByGoogle