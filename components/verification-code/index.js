import React, {
  forwardRef, useRef, memo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Slide,
  CircularProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import PhoneNumber from './phoneNumber';
import OTPInput, { ResendOTP } from './OTP';
import useStyles from './styles';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const VerificationCode = memo(
  ({
    loading, activeModal, messageSent, onClose,
  }) => {
    const credentialRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    let props = {
      fullScreen,
      fullWidth: true,
      open: activeModal,
    };
    if (fullScreen) {
      props = { ...props, TransitionComponent: Transition };
    }

    const handleChange = useCallback((values) => {
      credentialRef.current = values;
    }, []);

    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
      },
      [],
    );

    const handleResend = useCallback(() => {

    }, []);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Dialog {...props}>
        {fullScreen && (
          <DialogTitle classes={{ root: classes.title }}>
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent className={classes.contentContainer}>
          <PhoneNumber phoneNumberRef={phoneNumberRef} />
          <div className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={classes.fieldContainer}>
                <OTPInput onChange={handleChange} />
                <div className={classes.buttonContainer}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!messageSent || loading}
                  >
                    Verify
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
          <ResendOTP onClose={handleClose} onResendClick={handleResend} />
        </DialogContent>
      </Dialog>
    );
  },
);

VerificationCode.propTypes = {
  loading: PropTypes.bool,
  messageSent: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  activeModal: PropTypes.bool,
  onClose: PropTypes.func,
};

VerificationCode.defaultProps = {
  loading: false,
  error: false,
  success: false,
  messageSent: false,
  activeModal: false,
  onClose: () => {},
};

export default VerificationCode;
