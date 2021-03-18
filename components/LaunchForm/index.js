import React from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { createApolloFetch } from 'apollo-fetch';
import { useRouter } from 'next/router'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import defaultTheme from '../../theme-material-ui/theme';
import useScript from '../hooks/useScript';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
const apolloFetch = createApolloFetch({ uri });
const mutations = `
  mutation addLead ($data: String!) {
    addLead (data: $data)
  }
`;
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    // border: '1px solid #747474',
    // borderRadius: 63,
    minHeight: 400,
    margin: '55px 0',
    // boxShadow: '0px 4px 10px 10px rgba(0, 0, 0, 0.1)',
  },
  boxContainer: {
    backgroundColor: '#0C552F',
    borderRadius: '63px 63px 0px 0px',
    height: 55,
    marginTop: -1,
  },
  formTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '40px',
    textAlign: 'center',
    letterSpacing: '-0.025em',
    color: '#252525',
  },
  formContainer: {
    padding: theme.spacing(0, 5, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2, 2),
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: theme.spacing(2),
  },
  button: {
    borderRadius: '10px',
    textTransform: 'capitalize',
    padding: theme.spacing(1, 4),
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18,
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  outlinedInput: {
    borderRadius: 18,
  },
}));

const FORM_STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const LaunchForm = ({ showRequirements, title }) => {
  console.log("Next API Url",process.env);
  const classes = useStyles();
  const router = useRouter();

  // const [isLoading, setLoading] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState(FORM_STATUS.IDLE);
  const [requirements, setRequirements] = React.useState('');
  const { register, handleSubmit, errors } = useForm();
  
  const params = router.query;

  const onSubmit = (formValues) => {
    const values = formValues;
    setFormStatus(FORM_STATUS.SUBMITTING);
    // setLoading(true);
    if (formValues.ref) {
      values.refText = 'Help me open a demat account';
    }
    values.page = 'Home';
    values.requirements = requirements;
    values.url = location.href;
    delete values.ref;
    Object.keys(params).forEach((key) => {
      values[key] = params[key];
    });

    apolloFetch({
      query: mutations,
      variables: { data: JSON.stringify(values) },
    })
      .then(() => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 3 * 1000);
        setFormStatus(FORM_STATUS.SUCCESS);
        router.push('/thankyou');
        // setLoading(false);
      })
      .catch((error) => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 3 * 1000);
        setFormStatus(FORM_STATUS.FAILED);
      });
  };
  const status = useScript('https://www.smallcase.com/embed/assets/embed.js');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={0} className={classes.paperContainer}>
        {/* <Box className={classes.boxContainer} /> */}
        <Typography className={classes.formTitle}>
          {title}

        </Typography>
        <div className={classes.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="fullname"
              label="Full Name"
              margin="normal"
              placeholder="Your Full Name"
              variant="outlined"
              inputRef={register({
                required: 'Full Name is required.',
              })}
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                },
              }}
              error={(errors.fullname && true) || false}
              helperText={errors.fullname && errors.fullname.message}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              margin="normal"
              placeholder="Your Email Address"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                },
              }}
              inputRef={register({
                required: 'Email is required.',
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address',
                },
              })}
              error={(errors.email && true) || false}
              helperText={errors.email && errors.email.message}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              margin="normal"
              variant="outlined"
              placeholder="Your Phone Number"
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                },
              }}
              inputRef={register({
                required: 'Phone is required.',
                pattern: {
                  value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                  message: 'Phone Number Invalid',
                },
              })}
              error={(errors.phoneNumber && true) || false}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
              fullWidth
            />
            {showRequirements && (

            <textarea
              rows={10}
              name="message"
              placeholder="Your Requirements"
              onChange={(event) => setRequirements(event.target.value)}
              style={{
                resize: 'none', outline: 'none', overflow: 'hidden', width: '100%', borderStyle: 'solid', borderRadius: '18px', padding: '0px 5px',
              }}
            />

            )}
            {/* <FormControlLabel
              className="MuiFormControlLabel"
              control={
                <Checkbox name="ref" inputRef={register()} color="primary" />
              }
              label="I don't have a demat"
            /> */}
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formStatus === FORM_STATUS.SUBMITTING}
                className={classes.button}
              >
                Get A Call
              </Button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Typography component="p">
                By submitting your details, you agree to our
              </Typography>
              <Typography component="p">
                <a href="/legal/terms" target="_blank">Terms & Conditions</a>
              </Typography>
            </div>
            {formStatus === FORM_STATUS.SUBMITTING && (
            <div className={classes.buttonContainer}>
              <CircularProgress color="primary" />
            </div>
            )}
          </form>
          {formStatus === FORM_STATUS.SUCCESS && (
          <Snackbar open autoHideDuration={6000} onClose={() => setFormStatus(FORM_STATUS.IDLE)}>
            <MuiAlert elevation={6} variant="filled" onClose={() => setFormStatus(FORM_STATUS.IDLE)} severity="success">
              Thanks for your interest in Teji Mandi. We will reach out to you before our launch.
            </MuiAlert>
          </Snackbar>
          )}
          {formStatus === FORM_STATUS.FAILED && (
          <Snackbar open autoHideDuration={6000} onClose={() => setFormStatus(FORM_STATUS.IDLE)}>
            <MuiAlert elevation={6} variant="filled" onClose={() => setFormStatus(FORM_STATUS.IDLE)} severity="error">
              Form Submission Failed. Try again after some time.
            </MuiAlert>
          </Snackbar>
          )}
        </div>
      </Paper>
    </ThemeProvider>
  );
};

LaunchForm.propTypes = {
  showRequirements: PropTypes.bool,
  title: PropTypes.string,
};

LaunchForm.defaultProps = {
  showRequirements: false,
  title: '',
};

export default LaunchForm;
