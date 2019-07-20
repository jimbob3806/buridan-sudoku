//General imports

//Material-ui imports
import { 
    makeStyles
} from "@material-ui/styles"

//Own imports
import variables from "../index.scss"

// Styles
const useHeaderStyles = makeStyles({
    header: {
        height: "4rem"
    },
    drawer: {
        backgroundColor: variables.primaryColor11,
        height: "100vh",
        width: "15rem"
    },
    drawerItem: {
        color: variables.neutralColor1,
        textDecoration: "none",
        // Redundancy color setting for list icon
        "& svg.MuiSvgIcon-root": {
            color: variables.neutralColor1
        }
    },
    drawerItemActive: {
        color: variables.neutralColor8,
        textDecoration: "none",
        // Redundancy color setting for list icon
        "& svg.MuiSvgIcon-root": {
            color: variables.neutralColor8
        }
    }
})

// Exports
export default useHeaderStyles