//General imports

//Material-ui imports
import { 
    createMuiTheme 
} from "@material-ui/core/styles"

//Own imports
import variables from "./index.scss"

const theme = createMuiTheme({
    palette: {
        common: {
            black: variables.neutralColor11,
            white: variables.neutralColor1
        },
        background: {
            paper: variables.neutralColor4,
            default: variables.neutralColor2
        },
        primary: {
            light: variables.primaryColor5,
            main: variables.primaryColor8,
            dark: variables.primaryColor11,
            contrastText: variables.neutralColor1
        },
        secondary: {
            light: variables.secondaryColor5,
            main: variables.secondaryColor8,
            dark: variables.secondaryColor11,
            contrastText: variables.neutralColor1
        },
        error: {
            light: variables.redHighlight5,
            main: variables.redHighlight8,
            dark: variables.redHighlight11,
            contrastText: variables.neutralColor1
        },
        text: {
            primary: variables.neutralColor13,
            secondary: variables.neutralColor10,
            disabled: variables.neutralColor8,
            hint: variables.neutralColor6
        }
    },
    overrides: {
        // Overriding stlyes for MuiButton, MuiToggleButton, etc. to ensure that
        // buttons may be scaled as small as required for any given screen 
        // size
        MuiToggleButton: {
            root: {
                padding: "0.1rem",
                "&:last-child": {
                    paddingLeft: "0.1rem"
                }
            },
            sizeSmall: {
                minWidth: "1px",
                minHeight: "1px"
            }
        },
        MuiButton: {
            sizeSmall: {
                padding: "0.1rem",
                minWidth: "1px",
                minHeight: "1px"
            }
        },
        MuiButtonGroup: {
            grouped: {
                minWidth: "1px"
            }
        },
        MuiSvgIcon: {
            root: {
                color: "inherit",
                fontSize: "150%"
            }
        }
    }
})

export default theme