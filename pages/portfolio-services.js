import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { createApolloFetch } from 'apollo-fetch';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, Container, Typography, CircularProgress, Hidden,

} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Image from 'next/image';
import SEO from '../components/seo';
import defaultTheme from '../theme-material-ui/theme';
import BottomBear from '../assets/svgs/bottom-bear';
import LeftBull from '../assets/svgs/leftBull';
import ContactFooter from '../components/contact-footer';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
const apolloFetch = createApolloFetch({ uri });
const mutations = `
  mutation addLead ($data: String!) {
    addLead (data: $data)
  }
`;

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundColor: 'rgba(108,250,177, 0.29)',
    borderRadius: '15px',
    padding: '10px 0px',
    marginBottom: '20px',
  },
  bannerTitle: {
    color: '#000',
    alignSelf: 'center',
    '& > *:first-child': {
      fontWeight: 'bold',
    },
    [theme.breakpoints.down('md')]: {
      '& > *:first-child': {
        fontSize: '32px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& > *:first-child': {
        fontSize: '24px',
      },
    },
  },
  pageText: {
    fontWeight: 500,
    fontSize: '24px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
    // fontFamily: 'Open Sans'
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
    [theme.breakpoints.up('md')]: {
      border: '1px solid #000',
      borderRadius: '10px',
    },
    [theme.breakpoints.down('md')]: {
      borderTop: '1px solid rgba(0,0,0,0.2)',
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
    padding: theme.spacing(1, 20),
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20,
    border: '2px solid',
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
  appLogo: {
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '10px',
  },
  appLogoImage: {
    width: '200px',
    [theme.breakpoints.down('md')]: {
      width: '150px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75px',
    },
  },
  header: {
    fontWeight: 'bold',
    marginTop: '30px',
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      marginTop: '5px',
      marginBottom: '5px',
    },
  },
  formSubText: {
    fontSize: '20px',
    marginTop: '10px',
    '& > *:first-child': {
      textDecoration: 'underline',
    },
  },
  bottomBear: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& > *:first-child': {
      height: '100px',

    },
  },
  bannerLogo: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  container: {
    paddingLeft: '50px',
    paddingRight: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '30px',
      paddingRight: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  graphImage: {
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
  },
}));

const FORM_STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const PortfolioServices = ({ params }) => {
  const classes = useStyles();
  const router = useRouter();

  try {
    window.fcWidget.hide();
  } catch (er) {
    console.log(er);
  }

  const [formStatus, setFormStatus] = React.useState(FORM_STATUS.IDLE);
  const [name, setName] = React.useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formValues) => {
    const values = formValues;
    setFormStatus(FORM_STATUS.SUBMITTING);
    setName(values.fullname);

    // setLoading(true);
    if (formValues.ref) {
      values.refText = 'Help me open a demat account';
    }
    delete values.ref;
    values.page = 'portfolio-services';
    Object.keys(params).forEach((key) => {
      values[key] = params[key];
    });
    console.log(values);
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

  const chartsOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontSize: '20',
          fontWeight: 700,
          fontColor: ['#00A651', 'rgba(44,44,44,0.8)', 'rgba(44,44,44,0.8)', 'rgba(44,44,44,0.8)'],

        },
      }],
    },
  };
  const chartsData = {
    labels: ['TejiMandi', 'Equity', 'Fixed Deposit', 'Inflation'],
    datasets: [
      {
        label: 'CAGR',
        backgroundColor: ['rgba(0,166,81,1)', 'rgba(0,166,81,0.60)', 'rgba(0,166,81,0.35)', 'rgba(0,166,81,0.15)'],
        borderColor: ['rgba(0,166,81,1)', 'rgba(0,166,81,0.60)', 'rgba(0,166,81,0.35)', 'rgba(0,166,81,0.15)'],
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,166,81,1)',
        hoverBorderColor: 'rgba(0,166,81,1)',
        data: [55.15, 15.50, 7, 6.31],
      },
    ],
  };

  return (
    <>
      <SEO title="Teji Mandi - Stock Investing, Simplified" />
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth={false} className={classes.container}>
          <Grid container>
            <Grid item xs={12} className={classes.appLogo}>
              <img
                 src="/img/logo.png"
                alt="Teji Mandi"
                
                className={classes.appLogoImage}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.banner}>
              <Grid container>
                <Grid item xs={3} className={classes.bannerLogo}>
                  <LeftBull />
                </Grid>

                <Grid item xs={9} className={classes.bannerTitle}>
                  <Hidden smDown>

                    <Typography
                      component="h2"
                      variant="h2"
                      align="left"
                    >
                      World class portfolio advisory at the price of a medium pizza!

                    </Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <Typography
                      component="h6"
                      variant="h6"
                      align="left"
                      style={{ fontSize: '16px' }}
                    >
                      World class portfolio advisory at the price of a medium pizza!

                    </Typography>
                  </Hidden>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="p"
                align="left"
                gutterBottom
                className={classes.pageText}
              >
                Yes, it is now possible for everyone to gain access to an actively managed portfolio & quality advice without breaking the bank. With a minimum investment of ₹30,000 & no maximum limit, we offer the Teji Mandi Flagship portfolio at a flat advisory fee, costing you less than the price of a medium size pizza
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ marginBottom: '10px', textAlign: 'center', marginTop: '20px' }}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Hidden smDown>
                    <Typography
                      component="h4"
                      variant="h4"
                      align="center"
                      gutterBottom
                      className={classes.header}
                    >
                      Value of ₹100 invested since March 2020
                    </Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      gutterBottom
                      className={classes.header}
                    >
                      Value of ₹100 invested since March 2020
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  <img src="/img/graph.png" alt="" className={classes.graphImage} />
                </Grid>
              </Grid>

              {/*               <HorizontalBar data={chartsData} options={chartsOptions} /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.formContainer}>
              <Grid container>
                <Grid item xs={12}>
                  <Hidden smDown>
                    <Typography
                      component="h4"
                      variant="h4"
                      align="center"
                      gutterBottom
                      className={classes.header}
                    >
                      Get a call back from our advisor now!
                    </Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      gutterBottom
                      className={classes.header}
                    >
                      Get a call back from our advisor now!
                    </Typography>
                  </Hidden>

                </Grid>
              </Grid>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    name="fullname"
                    label="Full Name"
                    margin="normal"
                    placeholder="Your Full Name"
                    variant="outlined"
                    inputRef={register({
                      required: 'Full Name is required.',
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: 'Invalid name',
                      },
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
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
                        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/,
                        message: 'Phone Number Invalid',
                      },
                    })}
                    error={(errors.phoneNumber && true) || false}
                    helperText={errors.phoneNumber && errors.phoneNumber.message}
                    fullWidth
                  />
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      disabled={formStatus === FORM_STATUS.SUBMITTING}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </div>
                  {formStatus === FORM_STATUS.SUBMITTING && (
                  <div className={classes.buttonContainer}>
                    <CircularProgress color="primary" />
                  </div>
                  )}
                </form>
                {/* {formStatus === FORM_STATUS.SUCCESS && (
                <Snackbar open autoHideDuration={6000} onClose={() => setFormStatus(FORM_STATUS.IDLE)}>
                  <MuiAlert elevation={6} variant="filled" onClose={() => setFormStatus(FORM_STATUS.IDLE)} severity="success">
                    Thanks for your interest in Teji Mandi. Our advisor will reach out to you soon.

                  </MuiAlert>
                </Snackbar>
                )} */}
                {formStatus === FORM_STATUS.FAILED && (
                <Snackbar open autoHideDuration={6000} onClose={() => setFormStatus(FORM_STATUS.IDLE)}>
                  <MuiAlert elevation={6} variant="filled" onClose={() => setFormStatus(FORM_STATUS.IDLE)} severity="error">
                    Form Submission Failed. Try again after some time.
                  </MuiAlert>
                </Snackbar>
                )}
              </div>
              <Typography
                component="p"
                variant="p"
                align="center"
                gutterBottom
                className={classes.formSubText}
              >
                By submitting your details, you agree to our
                {' '}
                <a target="_blank" href="/legal/terms">terms and conditions</a>
              </Typography>

            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item sm={3} />
            <Grid item xs={12} sm={6}>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                gutterBottom
                className={classes.header}
              >
                Get a call back from our advisor now!
              </Typography>
            </Grid>
          </Grid> */}
          {/* <Grid container>
            <Grid item sm={3} />
            <Grid item xs={12} sm={6} />
          </Grid> */}
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'end', padding: 0 }} className={classes.bottomBear}>
              {/* <img src={data.bottomBear.childImageSharp.fluid.src} alt="" /> */}
              <Hidden smDown>
                <BottomBear />
              </Hidden>
            </Grid>
          </Grid>

        </Container>
        <ContactFooter />
      </ThemeProvider>
    </>

  );
};


export async function getServerSideProps({query}) {
  return {
    props: {
      params: query,
    }, // will be passed to the page component as props
  }
}

PortfolioServices.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default PortfolioServices;
