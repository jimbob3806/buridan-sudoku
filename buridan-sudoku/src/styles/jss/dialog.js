// General imports

// Own imports
    // Variables
    import variables from "../index.scss"

// Styles
const dialogStyles = {
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
    cautionDialog: {
        "& div.MuiDialogTitle-root": {
            color: variables.neutralColor13,
            backgroundColor: variables.yellowHighlight3,
        },
        "& div.MuiDialogContent-root": {
            "& p.MuiDialogContentText-root": {
                color: variables.neutralColor7,
            },            
            backgroundColor: variables.yellowHighlight3,
        },
        "& div.MuiDialogActions-root": {
            "& span.MuiButton-label": {
                color: variables.neutralColor13
            },
            backgroundColor: variables.yellowHighlight3,
        }
    },
    notificationDialog: {
        "& div.MuiDialogTitle-root": {
            color: variables.neutralColor13,
            backgroundColor: variables.greenHighlight3,
        },
        "& div.MuiDialogContent-root": {
            "& p.MuiDialogContentText-root": {
                color: variables.neutralColor8,
            },            
            backgroundColor: variables.greenHighlight3,
        },
        "& div.MuiDialogActions-root": {
            "& span.MuiButton-label": {
                color: variables.neutralColor13
            },
            backgroundColor: variables.greenHighlight3,
        }
    }
}

// Exports
export default dialogStyles