import React, { useContext, useEffect } from 'react'
import { Alert, LinearProgress, Snackbar } from '@mui/material'
import Initializer from '../../store/Initializer'

export default function Notification() {
    const { notificacion, loader, mostrarNotificacion } = useContext(Initializer);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        mostrarNotificacion(null);
    };

    useEffect(() => {
        if (notificacion != null) {
            setTimeout(function () { mostrarNotificacion(null) }, 3000);
        }
    }
   , [notificacion])
    return (
        <React.Fragment>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={notificacion != null} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity={notificacion != null ? notificacion.type : "success"}>
                    {notificacion != null ? notificacion.message : ""}
                </Alert>
            </Snackbar>
            {loader != false ?
                <LinearProgress style={{ zIndex: 9999 }} color="secondary" />
                :
                null
            }
        </React.Fragment>
    )
}
