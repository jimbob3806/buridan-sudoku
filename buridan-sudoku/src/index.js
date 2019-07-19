// General imports
import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

// Material-ui imports
import { 
    ThemeProvider 
} from "@material-ui/styles"
import "typeface-roboto"

// Own imports - styles
import "./styles/index.scss"
import theme from "./styles/theme.js"

// Own imports - components
import App from "./App"
import GlobalState from "./context/states/Global"

ReactDOM.render( 
    <GlobalState>
        <ThemeProvider theme = {theme}> 
            <App />
        </ThemeProvider>
    </GlobalState>,
    document.getElementById("root")
)

serviceWorker.register()

