import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const Notification = ({ open, message, severity, horizontal, handleClose }) => {
    const vertical = 'top'
    return (
        <Snackbar 
            style={{ zIndex: 10 }} 
            open={open} 
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
                {severity === 'info' && <LinearProgress />}
            </Alert>
            
        </Snackbar>
    );
};

export default Notification;
