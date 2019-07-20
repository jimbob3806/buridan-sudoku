// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles - Green, red, and yellow dialog background themes for notification,
// alerts, and or errors
const dialogStyles = {
    // Red theme
    errorDialog: {
        "& div.MuiDialogTitle-root": {
            color: variables.neutralColor1,
            backgroundColor: variables.redHighlight4,
        },
        "& div.MuiDialogContent-root": {
            "& p.MuiDialogContentText-root": {
                color: variables.neutralColor6,
            },            
            backgroundColor: variables.redHighlight4,
        },
        "& div.MuiDialogActions-root": {
            "& span.MuiButton-label": {
                color: variables.neutralColor1
            },
            backgroundColor: variables.redHighlight4,
        }
    },

    // Yellow theme
    cautionDialog: {
        "& div.MuiDialogTitle-root": {
            color: variables.neutralColor11,
            backgroundColor: variables.yellowHighlight1,
        },
        "& div.MuiDialogContent-root": {
            "& p.MuiDialogContentText-root": {
                color: variables.neutralColor8,
            },            
            backgroundColor: variables.yellowHighlight1,
        },
        "& div.MuiDialogActions-root": {
            "& span.MuiButton-label": {
                color: variables.neutralColor11
            },
            backgroundColor: variables.yellowHighlight1,
        }
    },

    // Green theme
    notificationDialog: {
        "& div.MuiDialogTitle-root": {
            color: variables.neutralColor11,
            backgroundColor: variables.greenHighlight1,
        },
        "& div.MuiDialogContent-root": {
            "& p.MuiDialogContentText-root": {
                color: variables.neutralColor8,
            },            
            backgroundColor: variables.greenHighlight1,
        },
        "& div.MuiDialogActions-root": {
            "& span.MuiButton-label": {
                color: variables.neutralColor11
            },
            backgroundColor: variables.greenHighlight1,
        }
    }
}

// Exports
export default dialogStyles