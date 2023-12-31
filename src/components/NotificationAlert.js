import React, { useContext } from 'react'

import { Button, Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../store';

function NotificationAlert() {

  const [data, dispatch] = useContext(Context);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: "updateNotification",
      show: false,
      message: '',
      alertType: ''
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={data.notificationData.show}
      onClose={handleSnackBarClose}
      action={action}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={data.notificationData.type} onClose={handleSnackBarClose}>{data.notificationData.message}</Alert>
    </Snackbar>
  )
}

export default NotificationAlert