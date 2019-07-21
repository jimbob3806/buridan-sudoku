// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles - Green, red, and yellow dialog background themes for notification,
// alerts, and or errors
const dialogStyles = {
    dialog: props => ({
        display: "flex",
        flexWrap: "wrap",
        placeSelf: "center center",
        margin: "auto",
        "& .MuiButton-root": {  
            // Reduce font size marginally to cope with smaller displays when
            // there are numerous options
            fontSize: "0.75rem",   
            // Enforce no minWidth for dialog buttons
            minWidth: 0
        },
        "& .MuiButtonBase-root": {
            // Enforce spacing of buttons in action bar
            padding: "0.2rem",
            margin: "0.25rem 0.3rem"
        },
        "& .MuiDialogActions-root": {
            // Wrap buttons at bottom of dialog if they are too wide
            flexWrap: "wrap"
        }
    }),
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
        },
        "& li": {
            color: variables.neutralColor8
        }
    }
}

// Exports
export default dialogStyles