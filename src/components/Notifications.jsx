import { Alert, Snackbar } from "@mui/material";


export default function Notification ({notify, setNotify}) {

    const handleClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
    })
    }
    
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            onClose={handleClose}
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}