import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({
  notification, handleClose, message, severity,
}) => (
  <Snackbar
    open={notification}
    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

Notification.propTypes = {
  notification: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
  handleClose: PropTypes.func,
};

Notification.defaultProps = {
  notification: false,
  message: '',
  severity: 'success',
  handleClose: () => {},
};

export default Notification;
