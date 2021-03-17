import React, { forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Slide,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import TextSelect from './text-select';
import { countries } from './data.json';
import useStyles from './styles';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const PhoneLogin = ({ activeModal, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    register, reset, handleSubmit, errors,
  } = useForm();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = () => {};

  let props = {
    fullScreen,
    fullWidth: true,
    open: activeModal,
  };
  if (fullScreen) {
    props = { ...props, TransitionComponent: Transition };
  }
  return (
    <Dialog {...props}>
      <DialogTitle classes={{ root: classes.title }}>
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.contentContainer}>
        <Typography component="h5" className={classes.contentTitle}>
          Enter your phone number
        </Typography>
        <div className={classes.content}>
          <div className={classes.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justify="center">
                <Grid item md={8}>
                  <TextSelect label="Country" name="countryCode">
                    {countries.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextSelect>
                </Grid>
                <Grid item md={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    inputRef={register({
                      required: 'Phone Number is required.',
                    })}
                    error={(errors.phoneNumber && true) || false}
                    helperText={
                      errors.phoneNumber && errors.phoneNumber.message
                    }
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </form>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              SEND OTP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

PhoneLogin.propTypes = {};

export default PhoneLogin;
