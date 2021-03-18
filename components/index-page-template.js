import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { createApolloFetch } from 'apollo-fetch';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  TextField, Button,
  Grid, Container, Typography, Card, CardContent, Hidden, CircularProgress, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel, { autoplayPlugin, Dots, arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import ChartSection from './charts/chart';
import LaunchForm from './LaunchForm';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
const apolloFetch = createApolloFetch({ uri });
const mutations = `
  mutation addLead ($data: String!) {
    addLead (data: $data)
  }
`;

const FORM_STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUBMITTING_EMAIL: 'SUBMITTING_EMAIL',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getAppLink(store) {
  // if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  //   const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
  if (store === 'google') {
    return 'https://play.google.com/store/apps/details?id=com.tejimandi.android';
  } if (store === 'apple') {
    return 'https://apps.apple.com/in/app/teji-mandi-portfolio-advisor/id1531900507';
  }
  //   // iOS detection from: http://stackoverflow.com/a/9039885/177710
  //   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   }
  // }
  return 'https://app.adjust.net.in/jsr?url=https%3A%2F%2Fjgua.adj.st%3Fadj_t%3Di6gf3cx';
}

const useStyles = makeStyles((theme) => ({
  mainHeading: {
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0px',
    },
  },
  subMainHeading: {
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0px',
    },
  },
  paperContainer: {
    padding: '2rem',
  },
  teamMemberName: {
    fontStyle: 'Open Sans',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '33px',
    color: '#000',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  teamMemberTitle: {
    fontStyle: 'Open Sans',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '33px',
    color: '#000',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  teamMemberPic: {
    height: '200px',
    borderRadius: '50%',
  },
  phoneScreens: {
    border: '1px solid #5CC744',
    height: '600px',
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
  },
  faqCard: {
    width: '100%',
  },
  faqItem: {
    marginBottom: '15px',
  },
  stepText: {
    marginLeft: '5px',
    fontWeight: 'bold',
    fontSize: '24px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '2px',
      fontSize: '18px',
    },
  },
  stepParaText: {
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  stepNumber: {
    fontSize: '24px',

    color: '#4AA35A',
    border: '1px solid #4AA35A',
    padding: '5px 30px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 5px',
      fontSize: '18px',
    },
  },
  investButton: {
    marginBottom: '30px',
    padding: '10px 200px',
    borderRadius: 0,
    color: '#000',
    fontSize: '20px',
    border: '2px solid #000',
    [theme.breakpoints.down('lg')]: {
      padding: '10px 150px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '10px 100px',

    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 40px',
    },
  },
  formTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '40px',
    textAlign: 'center',
    letresearchterSpacing: '-0.025em',
    color: '#252525',
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
  link: {
    color: '#4AA35A',
    textDecoration: 'underline',
  },
  buttonLink: {
    color: 'white',
    backgroundColor: '#4AA35A',
    border: '1px solid #4AA35A',
    padding: '10px',
  },
  buttonLinkDefault: {
    color: '#333',
    backgroundColor: 'transparent',
    border: '1px solid #333',
    padding: '10px',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px',

    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
      textAlign: 'center',
    },
  },
  paraText: {
    fontWeight: 'bold',
    color: '#727272',
    fontSize: '22px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  containedButton: {
    padding: theme.spacing(1, 4),
  },
  smJustifyCenter: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  phoneDiv: {
    padding: '0px 2px',
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'left',
    },
  },
  appStoreImageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  appStoreImage: {
    height: '50px',
    margin: '10px 0px',
  },
  getACallBackButton: {
    borderRadius: 0,
    margin: '15px',
    padding: '10px 10px',
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  stockRow: {
    justifyContent: 'left',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  sebiDataRow: {
    // borderBottom: '1px solid #333',
    // borderLeft: '1px solid #333',
    // borderRight: '1px solid #333',
    alignItems: 'center',
    padding: '10px 0px',
  },
  sebiBox: {
    margin: '10px 20px 0 20px',
    border: '1px solid rgba(229, 229, 229, 0.5)',
    borderRadius: '20px',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
  },
  sebiDataSection: {
    padding: '0px 10px',
    marginTop: '10px',
  },
  sebiSectionDiv: {
    width: '20%',
    alignSelf: 'center',
    height: '70px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      height: '80px',
    },
  },
  cardroot: {
    minHeight: 275,
    textAlign: 'center',
  },
  cardtitle: {
    fontSize: '28px',
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    },
  },
  cardDescriptionDiv: {
    minHeight: '100px',
  },
  cardDescription: {
    fontSize: '18px',
  },
  reviewer: {
    marginTop: '20px',
    fontSize: '18px',
  },
}));

const IndexPageTemplate = ({
  location, showAppDownloads, showForm, showHowItWorks, showChart, showTeam, showNewsletterForm,
  showFAQ, showFooter, showPhoneNumberForm, showReviews, showVideo, showPressArticles,
}) => {
  const classes = useStyles();

  const [formStatus, setFormStatus] = useState(FORM_STATUS.IDLE);
  const { register: registerPhone, handleSubmit: handleSubmitPhone, errors: errorsPhone } = useForm();
  const { register: registerEmail, handleSubmit: handleSubmitEmail, errors: errorsEmail } = useForm();
  const [snackBar, toggleSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState('warning');
  const [carousalSlide, setCarouselSlide] = useState(0);
  const [howItWorksCarousel, setHowItWorksCarousel] = useState(0);

  const onEmailSubmit = (formValues) => {
    const values = formValues;
    setFormStatus(FORM_STATUS.SUBMITTING_EMAIL);

    values.refText = 'Web Home';
    apolloFetch({
      query: mutations,
      variables: { data: JSON.stringify(values) },
    })
      .then(() => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 1 * 1000);
        // setFormStatus(FORM_STATUS.SUCCESS);
        setSnackBarMessage('Thanks for subscribing to newsletter.');
        setSnackBarSeverity('success');
        toggleSnackBar(true);
        // navigate('/thankyou');
      })
      .catch((error) => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 1 * 1000);
        // setFormStatus(FORM_STATUS.FAILED);
        setSnackBarMessage('Form Submission Failed. Try again after some time.');
        setSnackBarSeverity('error');
        toggleSnackBar(true);
      });
  };

  const onSubmit = (formValues) => {
    const values = formValues;
    setFormStatus(FORM_STATUS.SUBMITTING);

    values.refText = 'Web Home';
    apolloFetch({
      query: mutations,
      variables: { data: JSON.stringify(values) },
    })
      .then(() => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 1 * 1000);
        // setFormStatus(FORM_STATUS.SUCCESS);
        setSnackBarMessage('Thanks for your interest in Teji Mandi.');
        setSnackBarSeverity('success');
        toggleSnackBar(true);
        // navigate('/thankyou');
      })
      .catch((error) => {
        setTimeout(() => setFormStatus(FORM_STATUS.IDLE), 1 * 1000);
        // setFormStatus(FORM_STATUS.FAILED);
        setSnackBarMessage('Form Submission Failed. Try again after some time.');
        setSnackBarSeverity('error');
        toggleSnackBar(true);
      });
  };

  const howItWorksDataArray = [
    {
      image: "/img/phone4.png",
      header: '1',
      subHeader: 'Sign Up',
      paragraph: 'Login with your phone number, fill in some required details and answer a few questions about your risk level.',
    },
    {
      image:  "/img/phone3.png",
      header: '2',
      subHeader: 'Select a Plan',
      paragraph: 'Select from monthly. quarterly & half-yearly plans. Avail discounted pricing on our long term plans.',
    },
    {
      image:  "/img/phone5.png",
      header: '3',
      subHeader: 'Select a Broker',
      paragraph: "Select from India's top brokers to start your investment. If you don't have a demat account with any, we will help you open one.",
    },
    {
      image:  "/img/phone2.png",
      header: '4',
      subHeader: 'Build your Portfolio',
      paragraph: 'Buy winning stocks and Sell losing stocks in a single shot through our Rebalance advice. Say good-bye to complicated trading interfaces.',
    },
  ];

  const pressData = [
    {
      image:  "/img/cnbc.png",
      text: 'Teji Mandi to revolutionize investment for retail investors with equity investment advisory.',
      link: 'https://www.cnbctv18.com/market/teji-mandi-to-revolutionize-investment-for-retail-investors-with-equity-investment-advisory-8339821.html',
      title: 'CNBC',
    },
    {
      image: "/img/business-line.jpg",
      text: 'Motilal launches retail advisory service TejiMandi.',
      link: 'https://www.thehindubusinessline.com/markets/stock-markets/motilal-launches-retail-advisory-service-tejimandi/article33843507.ece',
      title: 'Business Line',
    },
    {
      image:  "/img/investment-guru.png",
      text: 'TejiMandi to revolutionize equity investment for retail investors with equity investment advisory.',
      link: 'http://bit.ly/3qnoq7D',
      title: 'Investment Guru India',
    },
  ];

  return (
    <>
      <Snackbar
        open={snackBar}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={6000}
        onClose={() => toggleSnackBar(false)}
      >
        <Alert onClose={() => toggleSnackBar(false)} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <section
        className="wrapper-container"
        style={{
          marginTop: '10px', paddingBottom: '0px',
        }}
      >

        <Hidden mdUp>
          <Grid container style={{ alignItems: 'center', marginTop: '10px' }}>
            <Grid item sm={1} md={1} />
            <Grid item xs={12} sm={10} md={10} className={`main-heading ${classes.mainHeading}`}>
              <h2>Stock Investing, Simplified</h2>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '10px 0px' }}>
            <Grid item xs={12} className={`main-sub-heading ${classes.subMainHeading}`}>
              <h5>Teji Mandi helps you build a strong long-term portfolio of high quality companies</h5>

            </Grid>
          </Grid>
          <Grid container style={{ margin: '10px 0px' }}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <div style={{ border: '1px solid #006004', backgroundColor: '#006004' }}>
                <p style={{
                  padding: '2px', color: '#fff', fontWeight: 'bold', textAlign: 'center', margin: '0px',
                }}
                >
                  Trusted by 1500+ Investors
                </p>
              </div>
            </Grid>
          </Grid>

          {/* <Grid container>
            <Grid item xs={12}>
              <ul style={{ padding: '0' }}>
                <li className={classes.stockRow}>
                  <CheckMark width={20} />

                  <Typography
                    component="p"
                    align="left"
                    gutterBottom
                    style={{
                      fontWeight: 'bold', fontSize: '16px', color: '#727272', marginLeft: '5px',
                    }}
                  >
                    Build a strong portfolio of high-quality stocks
                  </Typography>
                </li>
                <li className={classes.stockRow}>
                  <CheckMark width={20} />
                  <Typography
                    component="p"
                    align="left"
                    gutterBottom
                    style={{
                      fontWeight: 'bold', fontSize: '16px', color: '#727272', marginLeft: '5px',
                    }}

                  >
                    Rebalance your portfolio regularly with one-click
                    {' '}
                  </Typography>
                </li>
                <li className={classes.stockRow}>
                  <CheckMark width={20} />
                  <Typography
                    component="p"
                    align="left"
                    gutterBottom
                    style={{
                      fontWeight: 'bold', fontSize: '16px', color: '#727272', marginLeft: '5px',
                    }}
                  >
                    Get easy-to-understand information about stocks
                    {' '}
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center', lineHeight: '0' }}>
              <img src="/img/phone1.jpg" alt="" style={{ height: '350px', maxWidth: '400px' }} />

            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid item sm={1} md={1} />
            <Grid item sm={6} md={6}>
              <Grid container>

                <Grid item xs={12} className={`main-heading ${classes.mainHeading}`}>
                  <h2>Stock Investing, Simplified</h2>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={`main-sub-heading ${classes.subMainHeading}`}>
                  <h5>Teji Mandi helps you build a strong long-term portfolio of high quality companies</h5>

                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8} sm={6}>
                  <div style={{ border: '1px solid #006004', backgroundColor: '#006004' }}>
                    <p style={{
                      padding: '10px', color: '#fff', fontWeight: 'bold', textAlign: 'center', margin: '0px',
                    }}
                    >
                      Trusted by 1500+ Investors
                    </p>
                  </div>
                </Grid>
              </Grid>
              {/* <Grid container>
                <Grid item xs={12}>
                  <ul style={{ padding: '0' }}>
                    <li className={classes.stockRow}>
                      <CheckMark width={24} />
                      <Typography
                        component="p"
                        align="left"
                        gutterBottom
                        style={{
                          fontWeight: 'bold', fontSize: '24px', color: '#727272', marginLeft: '5px',
                        }}
                      >

                        Build a strong portfolio of high-quality stocks
                      </Typography>
                    </li>
                    <li className={classes.stockRow}>
                      <CheckMark width={24} />
                      <Typography
                        component="p"
                        align="left"
                        gutterBottom
                        style={{
                          fontWeight: 'bold', fontSize: '24px', color: '#727272', marginLeft: '5px',
                        }}

                      >
                        Rebalance your portfolio regularly with one-click
                        {' '}
                      </Typography>
                    </li>
                    <li className={classes.stockRow}>
                      <CheckMark width={24} />
                      <Typography
                        component="p"
                        align="left"
                        gutterBottom
                        style={{
                          fontWeight: 'bold', fontSize: '24px', color: '#727272', marginLeft: '5px',
                        }}

                      >
                        Get easy-to-understand information about stocks
                        {' '}
                      </Typography>
                    </li>
                  </ul>

                </Grid>
              </Grid> */}
              {showAppDownloads && (
              <Hidden smDown>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                }}
                >
                  <div>
                    <a
                      href={getAppLink('google')}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
                    </a>
                  </div>
                  <div>
                    <a
                      rel="noreferrer"
                      href={getAppLink('apple')}
                      target="_blank"
                    >
                      <img src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
                    </a>

                  </div>
                </div>
              </Hidden>
              )}
            </Grid>
            <Grid item sm={1} md={1} />

            <Grid sm={4} md={4} style={{ textAlign: 'left', lineHeight: '0' }}>
            <img src="/img/phone1.jpg" alt="" style={{maxWidth: '400px'}} />
            </Grid>
          </Grid>
        </Hidden>
      </section>
      <div>

        {showFooter && (
        <section className="wrapper-container">

          <Hidden smDown>
            <div style={{ marginTop: '20px' }}>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <Typography style={{ fontSize: '16px' }}>No. of complaints as per SEBI guidelines</Typography>
                </Grid>
              </Grid>
              <Grid container style={{ alignItems: 'center' }}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Grid container spacing={1} style={{ border: '1px solid #333' }}>
                    <div className={classes.sebiSectionDiv}>
                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ padding: '10px 5px' }}>
                          <Typography component="p" style={{ marginLeft: '5px' }}>
                            At the beginning of the month
                          </Typography>
                        </div>
                        <div style={{ padding: '10px 5px', textAlign: 'right' }}>
                          <Typography>
                            0
                          </Typography>
                        </div>
                      </Grid>
                    </div>
                    <div className={classes.sebiSectionDiv}>
                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ padding: '10px 5px' }}>

                          <Typography component="p" style={{ marginLeft: '5px' }}>
                            Received during the month
                          </Typography>
                        </div>
                        <div style={{ padding: '10px 5px', textAlign: 'right' }}>
                          <Typography>
                            0
                          </Typography>
                        </div>
                      </Grid>

                    </div>
                    <div className={classes.sebiSectionDiv}>
                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ padding: '10px 5px' }}>

                          <Typography component="p" style={{ marginLeft: '5px' }}>
                            Resolved during the month
                          </Typography>
                        </div>
                        <div style={{ padding: '10px 5px', textAlign: 'right' }}>
                          <Typography>
                            0
                          </Typography>
                        </div>
                      </Grid>

                    </div>
                    <div className={classes.sebiSectionDiv}>
                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ padding: '10px 5px' }}>
                          <Typography component="p" style={{ marginLeft: '5px' }}>
                            Pending at the end of the month
                          </Typography>

                        </div>
                        <div style={{ padding: '10px 5px', textAlign: 'right' }}>
                          {' '}
                          <Typography>
                            0
                          </Typography>

                        </div>
                      </Grid>

                    </div>
                    <div className={classes.sebiSectionDiv}>
                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ padding: '10px 5px' }}>

                          <Typography component="p" style={{ marginLeft: '5px' }}>
                            Reasons for pendency
                          </Typography>
                        </div>
                        <div style={{ padding: '10px 5px', textAlign: 'right' }}>

                          <Typography>
                            -
                          </Typography>
                        </div>
                      </Grid>

                    </div>

                  </Grid>
                </Grid>

              </Grid>
            </div>
          </Hidden>
          <Hidden mdUp>
            <Grid container>
              <Grid sm={3} md={3} />
              <Grid xs={12} sm={6} md={6}>

                <div className={classes.sebiBox}>

                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />
                    <Grid item xs={11}>

                      <Typography component="p" style={{ marginLeft: '5px', fontSize: '15px' }}>
                        <b>No. of complaints as per SEBI guidelines</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>

                      <Typography component="p" style={{ marginLeft: '5px', fontSize: '15px' }}>
                        At the beginning of the month
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>

                      <Typography>
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>

                      <Typography component="p" style={{ marginLeft: '5px', fontSize: '15px' }}>
                        Received during the month
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>

                      <Typography>
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>

                      <Typography component="p" style={{ marginLeft: '5px', fontSize: '15px' }}>
                        Resolved during the month
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>

                      <Typography>
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>

                      <Typography component="p" style={{ marginLeft: '5px', fontSize: '15px' }}>
                        Pending at the end of the month
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>

                      <Typography>
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.sebiDataRow}>
                    <Grid item xs={1} />

                    <Grid item xs={10}>

                      <Typography component="p" style={{ marginLeft: '5px' }}>
                        Reasons for pendency
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>

                      <Typography>
                        -
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Hidden>

        </section>
        )}

      </div>
      {showVideo && (
        <section className="wrapper-container mobile-app-container" id="what-is-tejimandi">
          <Grid container className="section-header">
            <h2>What is Teji Mandi?</h2>

          </Grid>
          <div>
            <Grid container>
              \
              {' '}
              <Grid item sm={2} />
              <Grid item xs={12} sm={8}>

                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%' /* 16:9 */,
                  paddingTop: 25,
                  height: 0,
                }}
                >

                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    width="560"
                    height="315"
                    title="What is Teji Mandi?"
                    src="https://www.youtube.com/embed/oWKcPk9RJy8"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      )}
      {showPressArticles && (
      <section className="wrapper-container mobile-app-container" id="press">
        <Grid container className="section-header">
          <h2>Teji Mandi In The Press:</h2>
        </Grid>
        <Grid container>
          {pressData.map((element, i) => (
            <Grid item xs={12} key={i} sm={4} style={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>

              <Card style={{ maxWidth: 345, width: '100%' }}>
                <div style={{ textAlign: 'center' }}>

                  <img src={element.image} alt={element.title} style={{ height: '150px' }} />
                </div>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="h3" style={{ fontSize: '16px', color: '#333' }}>
                    {element.text}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'right' }}>
                    <a href={element.link} target="_blank" rel="noreferrer" style={{ color: '#006004', fontWeight: 'bold', fontSize: '16px' }}>Read More</a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      )}
      {showHowItWorks && (
      <section className="wrapper-container mobile-app-container" id="how-it-works">
        <Grid container className="section-header">
          <h2>How it works?</h2>
        </Grid>
        {/* <div className="store-link-container">
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container>
                <Grid item sm={4} style={{ alignSelf: 'center' }}>
                  <Hidden xsDown>
                    <LeftHand1 />

                  </Hidden>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <img src={data.phone1.childImageSharp.fluid.src} alt="SignUp" className={classes.phoneScreens} />

                </Grid>
              </Grid>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item sm={4} />
                <Grid item xs={12} sm={8}>
                  <span className={classes.stepNumber}>Step 1</span>
                  <span className={classes.stepText}>Sign Up</span>
                </Grid>
              </Grid>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item sm={4} />
                <Grid item xs={12} sm={8}>
                  <p className={classes.stepParaText}>
                    Login with your phone number, fill in
                    {' '}
                    <br />
                    {' '}
                    some required details and answer a few
                    <br />
                    {' '}
                    questions about your risk level

                  </p>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <img src={data.phone2.childImageSharp.fluid.src} alt="Select A Plan" className={classes.phoneScreens} />

                </Grid>
                <Grid item sm={4} style={{ alignSelf: 'center' }}>
                  <Hidden xsDown>
                    <RightHand1 width={333} />
                  </Hidden>

                </Grid>
              </Grid>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={8}>
                  <span className={classes.stepNumber}>Step 2</span>
                  <span className={classes.stepText}>Select a Plan</span>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={8}>
                  <p className={classes.stepParaText}>
                    Select from monthly. quarterly &
                    <br />
                    {' '}
                    half-yearly plans. Avail discounted pricing
                    <br />
                    {' '}
                    on our long term plans
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container>
                <Grid item sm={4} style={{ alignSelf: 'center' }}>
                  <Hidden xsDown>
                    <LeftHand2 />
                  </Hidden>

                </Grid>
                <Grid item xs={12} sm={8}>
                  <img src={data.phone3.childImageSharp.fluid.src} alt="Select a Broker" className={classes.phoneScreens} />

                </Grid>
              </Grid>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item sm={4} />
                <Grid item xs={12} sm={8}>
                  <span className={classes.stepNumber}>Step 3</span>
                  <span className={classes.stepText}>Select a Broker</span>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item sm={4} />
                <Grid item xs={12} sm={8}>
                  <p className={classes.stepParaText}>
                    Select from India's top brokers to start
                    <br />
                    your investment. If you don't have a
                    {' '}
                    <br />
                    demat account with any, we will help you open one
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <img src={data.phone4.childImageSharp.fluid.src} alt="Build your portfolio" className={classes.phoneScreens} />
                </Grid>
                <Grid item sm={4} style={{ alignSelf: 'center' }}>
                  <Hidden xsDown>
                    <RightHand2 />
                  </Hidden>

                </Grid>
              </Grid>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={8}>
                  <span className={classes.stepNumber}>Step 4</span>
                  <span className={classes.stepText}>Build your portfolio</span>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={8}>
                  <p className={classes.stepParaText}>
                    Buy winning stocks and Sell losing stocks in a
                    <br />
                    {' '}
                    single shot through our
                    {' '}
                    <b>Rebalance</b>
                    {' '}
                    advice. Say good-bye
                    <br />
                    {' '}
                    to complicated trading interfaces
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </div> */}
        <Carousel
          arrows
          value={howItWorksCarousel}
          onChange={setHowItWorksCarousel}
          slides={howItWorksDataArray.map((element, i) => (
            <div key={i}>
              <Hidden smDown>
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item sm={6} style={{ textAlign: 'center' }}>
                    <img src={element.image} alt="" className="how-it-works-image" style={{maxWidth: '400px'}} />

                  </Grid>
                  <Grid item sm={5}>
                    <Typography
                      component="h2"
                      gutterBottom
                      style={{ fontSize: '32px', color: 'grey', fontWeight: 'bold' }}
                    >
                      {element.header}
                    </Typography>
                    <Typography
                      component="h3"
                      gutterBottom
                      style={{ fontSize: '24px', color: 'grey', fontWeight: 'bold' }}
                    >
                      {element.subHeader}
                    </Typography>
                    <Typography
                      component="p"
                      gutterBottom
                      style={{ fontSize: '20px', color: 'grey', fontWeight: 'bold' }}
                    >
                      {element.paragraph}
                    </Typography>
                  </Grid>
                </Grid>

              </Hidden>
              <Hidden mdUp>
                <Grid container>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <img src={element.image} alt="" style={{ height: '350px', maxWidth: '400px' }} />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography
                          component="h2"
                          gutterBottom
                          style={{ fontSize: '24px', color: 'grey', fontWeight: 'bold' }}
                        >
                          {element.header}
                        </Typography>
                        <Typography
                          component="h3"
                          gutterBottom
                          style={{ fontSize: '18px', color: 'grey', fontWeight: 'bold' }}
                        >
                          {element.subHeader}
                        </Typography>
                        <Typography
                          component="p"
                          gutterBottom
                          style={{ fontSize: '16px', color: 'grey', fontWeight: 'bold' }}
                        >
                          {element.paragraph}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Hidden>
            </div>
          ))}
          plugins={[
            'centered',
            'infinite',
            {
              resolve: autoplayPlugin,
              options: {
                interval: 2000,
              },
            },
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <button type="button"><ArrowLeft style={{ color: '#333' }} /></button>,
                arrowLeftDisabled: <button type="button"><ArrowLeft /></button>,
                arrowRight: <button type="button"><ArrowRight style={{ color: '#333' }} /></button>,
                arrowRightDisabled: <button type="button"><ArrowRight /></button>,
                addArrowClickHandler: true,
              },
            },
          ]}
        />
        {/* {showAppDownloads && (
        <Hidden mdUp>
          <Grid container style={{ textAlign: 'center', marginTop: '30px' }}>
            <Grid item xs={12}>
              <a
                href={getAppLink()}
                target="_blank"
                rel="noreferrer"
                className={classes.buttonLinkDefault}
              >
                DOWNLOAD THE APP NOW
              </a>
            </Grid>

          </Grid>
        </Hidden>
        )} */}
        {showAppDownloads && (
        <Hidden smDown>

          <div className={classes.appStoreImageDiv}>
            <div>
              <a
                href={getAppLink('google')}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
              </a>
            </div>
            <div>
              <a
                rel="noreferrer"
                href={getAppLink('apple')}
                target="_blank"
              >
                <img src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
              </a>

            </div>
          </div>
        </Hidden>
        )}
      </section>
      )}
      {/* Form Component */}
      {showForm && (
      <section className="wrapper-container">
        <Grid container>

          <Grid sm={2} md={3} />
          <Grid sm={8} md={6}>

            <LaunchForm location={location} title="Have an advisor call you back" />
          </Grid>
        </Grid>
      </section>
      )}
      <div>
        {showChart && <ChartSection getAppLink={getAppLink} showAppDownloads={showAppDownloads} paretClasses={classes} />}
        {/* -------------------TEAM----------*/}
        {showTeam && (
        <section className="wrapper-container">
          <Grid container className="section-header">
            <h2>
              Our Team
            </h2>
          </Grid>

          <Container>
            <Grid container>
              <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
                <img src="/img/va.jpeg" className={classes.teamMemberPic} alt="Vaibhav Agrawal" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  component="h5"
                  className={classes.teamMemberName}
                >
                  Vaibhav Agrawal
                </Typography>
                <Typography
                  component="h6"
                  gutterBottom
                  className={classes.teamMemberTitle}
                >
                  Chief Investment Officer - Teji Mandi
                </Typography>
                <Typography
                  component="p"
                  align="left"
                  gutterBottom
                >
                  Vaibhav is the Chief Investment Officer at Teji Mandi. He has over a decade of experience in stock picking and generating index-beating returns. Under the mentorship of ace investor, Mr. Raamdeo Agrawal, Vaibhav has developed his distinct investment philosophy. His style involves combining a portfolio of tactical bets with long term winners to generate optimum returns. Vaibhav holds a Bachelors in Computer Science from the University of Pennsylvania and an MBA from London Business School.
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="section-header">
              <h2>

                Board Members
              </h2>

            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <img src="/img/ra.jpeg" className={classes.teamMemberPic} alt="Mr. Raamdeo Agrawal" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  component="h5"
                  align="left"
                  className={classes.teamMemberName}
                >
                  Mr. Raamdeo Agrawal
                </Typography>
                <Typography
                  component="h6"
                  gutterBottom
                  className={classes.teamMemberTitle}
                >
                  Chairman - Motilal Oswal Group
                </Typography>
                <Typography
                  component="p"
                  gutterBottom
                  align="left"
                >
                  Mr Raamdeo Agrawal is the co-founder of Motilal Oswal Financial Services - a well-diversified financial services firm focused on Indian equity capital markets and research. He is also the chairman of MOFSL's asset management business (Motilal Oswal Asset Management Company).
                  Mr Agrawal has framed the "QGLP" (Quality Growth Longevity & favorable Price) Investment Framework and the MOFSL group's 'Buy Right, Sit Tight' investing philosophy. He is the driving force behind the Group's highly awarded research and has authored the annual Motilal Oswal Wealth Creation Study since its inception in 1996. He has also authored the book "The Art of Wealth Creation" which compiles insights from his 22 "Wealth Creation Studies".
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <img src="/img/am.jpeg" className={classes.teamMemberPic} alt="Mr. Ajay Menon" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  component="h5"
                  className={classes.teamMemberName}
                >
                  Mr. Ajay Menon
                </Typography>
                <Typography
                  component="h6"
                  className={classes.teamMemberTitle}
                  gutterBottom
                >
                  CEO - Broking & Distribution business, Motilal Oswal Financial Services Ltd.
                </Typography>
                <Typography
                  component="p"
                  gutterBottom
                  align="left"
                >
                  Ajay has over 23 years of vast experience in Indian Capital Markets. He joined the MOFSL Group in 1998. Ajay is a member of the Institute of Chartered Accountants of India from Nov, 1997 and is a graduate from N.M. College of Commerce, Mumbai. He is also certified in Series 7, 24 and 63 of FINRA Regulations. Ajay is passionate about creating and building several cutting edge technology initiatives to provide the best experience to the customers and also the MOFSL team. Under Ajay’s stewardship, MOFSL has excelled by delivering superior business results even during volatile market conditions. His multi-product strategy helped the organization sustain its revenue in the changing scenario.
                </Typography>
              </Grid>
            </Grid>

          </Container>
          {/* {showAppDownloads && (
          <Hidden mdUp>
            <Grid container style={{ textAlign: 'center', marginTop: '30px' }}>
              <Grid item xs={12}>
                <a
                  href={getAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.buttonLinkDefault}
                >
                  DOWNLOAD THE APP NOW
                </a>
              </Grid>

            </Grid>
          </Hidden>
          )} */}
          {showAppDownloads && (
          <Hidden smDown>

            <div className={classes.appStoreImageDiv}>
              <div>
                <a
                  href={getAppLink('google')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
                </a>
              </div>
              <div>
                <a
                  rel="noreferrer"
                  href={getAppLink('apple')}
                  target="_blank"
                >
                  <img src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
                </a>

              </div>
            </div>
          </Hidden>
          )}
        </section>
        )}
      </div>
      {/* <section className="wrapper-container">
        <Grid container>
          <Grid item md={3} />
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
      {/* {formStatus === FORM_STATUS.FAILED && (
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
              <a
                target="_blank"
                rel="noreferrer"
                href="/legal/terms"
              >
                terms and conditions

              </a>
            </Typography>
          </Grid>
        </Grid>
      </section> */}
      {showReviews && (
        <section className="wrapper-container">
          <Grid container className="section-header">
            {/* <BearFAQ /> */}
            <Typography variant="h4" component="h4">
              What our users say about us
            </Typography>
            {/* <BullFAQ /> */}
          </Grid>
          <Carousel
            arrows
            value={carousalSlide}
            onChange={setCarouselSlide}
            slides={[(<Grid container>
              <Grid sm={3} md={3} />
              <Grid xs={12} sm={6} md={6}>
                <Card className={classes.cardroot}>
                  <CardContent>
                    <Typography className={classes.cardtitle} gutterBottom>
                      Loved the overall experience!
                    </Typography>
                    <div className={classes.cardDescriptionDiv}>
                      <Typography variant="body2" component="h2" className={classes.cardDescription}>
                        "Been investing since the lockdown only. Never did anything other than MFs before. Just subscribed and invested through Teji Mandi. Saw all the stocks on my Zerodha account. Brilliant how everything is so easily connected. "
                        {' '}

                      </Typography>
                    </div>

                    <Typography variant="h5" component="h2" className={classes.reviewer}>
                      - Payal Mulchandani
                    </Typography>
                  </CardContent>

                </Card>
              </Grid>
                      </Grid>),
            (<Grid container>
              <Grid sm={3} md={3} />
              <Grid xs={12} sm={6} md={6}>
                <Card className={classes.cardroot}>
                  <CardContent>
                    <Typography className={classes.cardtitle} gutterBottom>
                      Felt more confident while investing.
                    </Typography>
                    <div className={classes.cardDescriptionDiv}>
                      <Typography variant="body2" component="h2" className={classes.cardDescription}>
                        "I have demat account for an year now but never invested as I don't have much knowledge but through app i felt more confident."
                      </Typography>
                    </div>

                    <Typography variant="h5" component="h2" className={classes.reviewer}>
                      - Sohil Chhabra
                    </Typography>
                  </CardContent>

                </Card>
              </Grid>
             </Grid>)]}
            plugins={[
              'centered',
              'infinite',
              {
                resolve: autoplayPlugin,
                options: {
                  interval: 2000,
                },
              },
              {
                resolve: arrowsPlugin,
                options: {
                  arrowLeft: <button type="button"><ArrowLeft style={{ color: '#333' }} /></button>,
                  arrowLeftDisabled: <button type="button"><ArrowLeft /></button>,
                  arrowRight: <button type="button"><ArrowRight style={{ color: '#333' }} /></button>,
                  arrowRightDisabled: <button type="button"><ArrowRight /></button>,
                  addArrowClickHandler: true,
                },
              },
            ]}
          />
          <Dots value={carousalSlide} onChange={(value) => setCarouselSlide(value)} number={2} />
          {/* {showAppDownloads && (
          <Hidden mdUp>
            <Grid container style={{ textAlign: 'center', marginTop: '30px' }}>
              <Grid item xs={12}>
                <a
                  href={getAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.buttonLinkDefault}
                >
                  DOWNLOAD THE APP NOW
                </a>
              </Grid>

            </Grid>
          </Hidden>
          )} */}
          {showAppDownloads && (
          <Hidden smDown>

            <div className={classes.appStoreImageDiv}>
              <div>
                <a
                  href={getAppLink('google')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
                </a>
              </div>
              <div>
                <a
                  rel="noreferrer"
                  href={getAppLink('apple')}
                  target="_blank"
                >
                  <img src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
                </a>

              </div>
            </div>
          </Hidden>
          )}
        </section>
      )}
      {(showNewsletterForm || showFAQ) && (
      <section className="wrapper-container">
        {showNewsletterForm && (
        <div>

          <Grid container className="section-header">
            <h3>Subscribe to our free #ThreeThings newsletter</h3>
          </Grid>
          <form id="email" onSubmit={handleSubmitEmail(onEmailSubmit)}>
            <Grid container className="d-flex-center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Enter your email ID"
                  variant="outlined"
                  inputRef={registerEmail({
                    required: 'Email is required.',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Invalid email address',
                    },
                  })}
                  error={(errorsEmail.email && true) || false}
                  helperText={errorsEmail.email && errorsEmail.email.message}
                />
              </Grid>
            </Grid>
            <Grid container className="d-flex-center" style={{ marginTop: '10px' }}>
              <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 0, fontSize: '18px' }}>SUBSCRIBE</Button>
              {formStatus === FORM_STATUS.SUBMITTING_EMAIL && (
              <div className={classes.buttonContainer}>
                <CircularProgress color="primary" />
              </div>
              )}
            </Grid>
          </form>
        </div>
        )}
        {showFAQ && (
        <div>
          <Grid container className="section-header" id="faq">
            {/* <BearFAQ /> */}
            <Typography variant="h4" component="h4">
              FAQs
            </Typography>
            {/* <BullFAQ /> */}
          </Grid>
          <Grid container className="d-flex-center">
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Is Teji Mandi a stock broker?

                  </Typography>
                  <Typography variant="body2" component="p">
                    No, Teji Mandi is not a stockbroker. We are a SEBI Registered Investment advisor.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>
              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    What does Teji Mandi exactly help me with?

                  </Typography>
                  <Typography variant="body2" component="p">
                    Teji Mandi is a SEBI Registered Investment Advisor (RIA). We make investing in the stock market a simple process by telling our subscribers which stocks to buy, Why to buy them and when to sell them. We also educate our subscribers with simple & easy to understand the content, which makes them better at investing their money
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    I do not have a Demat account, How do I start investing?
                  </Typography>
                  <Typography variant="body2" component="p">
                    That’s not a problem, We will help you open your Demat account through one of our partner brokers which includes 11 of India’s biggest brokers. Just select the ‘I don’t have a Demat account’ at the investment stage and we will get it set up for you!
                    {' '}

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    How much is the Teji Mandi Subscription fee?
                  </Typography>
                  <Typography variant="body2" component="p">
                    You can subscribe to our advisory services for ₹149/mo for 6 months and ₹199/mo for 3 months. We also offer a monthly subscription for ₹249/ month.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>
              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Why does Teji Mandi charge a subscription fee?
                  </Typography>
                  <Typography variant="body2" component="p">
                    Teji Mandi is a fee-only advisor, We charge a nominal fixed fee on the advice we give regardless of the amount you invest. Unlike many advisors in the market, we do not make commissions on products from any third-party companies. This ensures that we are only working for you and not for any other person’s interests.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Can I get a refund on the fee?
                  </Typography>
                  <Typography variant="body2" component="p">
                    Our advisory services are available on a monthly, three & six-monthly basis. We do not give a refund on the fee, In case you are unhappy with our services, you can discontinue renewal of your subscription. We are always available on chat for feedback and to hear from you.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    How much do I need to invest?

                  </Typography>
                  <Typography variant="body2" component="p">
                    The minimum investment on your end is purposely low at INR 19-25k depending on the value of the 15-20 stocks in our portfolio.  Since we cannot buy partial stocks in India, this is the minimum amount needed to allow our investors to have a balanced and diversified portfolio. This amount may vary by a few rupees based on the current stock price.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    My broker is not supported. How do I invest?

                  </Typography>
                  <Typography variant="body2" component="p">
                    At this time we support 9 of India’s top brokers and we are soon adding support for more. We can help you open a Demat account as well. If you want to transact with your own broker, you can subscribe and get access to our stock portfolio, premium stock updates & rebalancing alerts. You can execute these trades on your own on your broker’s platform.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Will I be getting daily trading calls?

                  </Typography>
                  <Typography variant="body2" component="p">
                    No, we do not provide any intraday or short term trading calls. We only provide advisory on our Teji Mandi portfolio. We will tell you which stocks to buy, when to buy & when to sell them from the Teji Mandi portfolio itself.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    What are the charges for linking your broker with us?

                  </Typography>
                  <Typography variant="body2" component="p">
                    Some brokers charge a fee for linking your account with us. Here is the list of charges.

                  </Typography>
                  <ul>
                    <li className="broker-charges-list">
                      Zerodha - Rs 100 + GST one time only*

                    </li>
                    <li className="broker-charges-list">
                      Upstox - Rs 200 + GST one time only*

                    </li>
                    <li className="broker-charges-list">
                      5Paisa- Rs 10 per stock*

                    </li>
                    <li className="broker-charges-list">
                      IIFL Sec - Rs 100 + GST one time only*

                    </li>
                    <li className="broker-charges-list">
                      HDFC Sec - No Charges*

                    </li>
                    <li className="broker-charges-list">
                      Axis Direct - No Charges*

                    </li>
                    <li className="broker-charges-list">
                      Edelweiss - No Charges*

                    </li>
                    <li className="broker-charges-list">
                      Angel Broking - No Charges*

                    </li>
                    <li className="broker-charges-list">
                      Trustline - No Charges*

                    </li>
                    <li className="broker-charges-list">
                      Alice Blue - No Charges*

                    </li>
                  </ul>
                  <Typography variant="body2" component="p">
                    *Please note that these charges are subject to changes as per the broker's discretion
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    What is the investment horizon for the Teji Mandi portfolio?

                  </Typography>
                  <Typography variant="body2" component="p">
                    We recommend our subscribers to be invested in the Teji Mandi portfolio for a minimum period of 2-3 years. There is no maximum period, you can stay invested in the portfolio for more than 3 years if you wish.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Where can I see my stocks from the Teji Mandi portfolio after investing?

                  </Typography>
                  <Typography variant="body2" component="p">
                    All the stocks you invest in from the Teji Mandi portfolio will be in your Demat account which you have linked. In case you want to see the performance of the portfolio you will have to log in to the Teji Mandi app.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    How can I sell my portfolio in case I need the money ?

                  </Typography>
                  <Typography variant="body2" component="p">
                    Since all the stocks are in your linked Demat account, you own the stocks. Hence you can sell the stocks from your portfolio in case you need the money.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Do you guarantee a return on my investment?
                  </Typography>
                  <Typography variant="body2" component="p">
                    Teji Mandi believes in managing the risk over guaranteeing a return. While we do not guarantee a return, our aim is to partner with you to make you a better investor while making you
                    money on your investments.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8} className={classes.faqItem}>

              <Card className={classes.faqCard} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    What is the investment philosophy of Teji Mandi?
                  </Typography>
                  <Typography variant="body2" component="p">
                    Our investment philosophy has 4 aspects, we pick stocks from the Nifty 500 which provides adequate liquidity. We follow a focused stock-picking method where we combine a portfolio of tactical bets with long term winners to ensure optimum returns. Our selling strategy is disciplined where we eliminate the losers and double down on the winners to ensure meaningful capital protection for clients. Lastly, we maintain 1 portfolio to ensure standardisation and uniformity of returns across all clients.

                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid item xs={12} sm={8} className={classes.faqItem}>

            <Card className={classes.faqCard} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  What happens with my money if Teji Mandi shuts down?
                </Typography>
                <Typography variant="body2" component="p">
                  Teji Mandi does not hold your money - your stocks are held safely with your broker and can be withdrawn at any time. We only work with some of India’s top brokers ensuring reliability in your investments.

                </Typography>
              </CardContent>
            </Card>
          </Grid> */}

          </Grid>
        </div>
        )}
        {/* {showFAQ && showAppDownloads && (
        <Hidden mdUp>
          <Grid container style={{ textAlign: 'center', marginTop: '30px' }}>
            <Grid item xs={12}>
              <a
                href={getAppLink()}
                target="_blank"
                rel="noreferrer"
                className={classes.buttonLinkDefault}
              >
                DOWNLOAD THE APP NOW
              </a>
            </Grid>

          </Grid>
        </Hidden>
        )} */}
        {showFAQ && showAppDownloads && (
        <Hidden smDown>

          <div className={classes.appStoreImageDiv}>
            <div>
              <a
                href={getAppLink('google')}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
              </a>
            </div>
            <div>
              <a
                rel="noreferrer"
                href={getAppLink('apple')}
                target="_blank"
              >
                <img src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
              </a>

            </div>
          </div>
        </Hidden>
        )}
      </section>
      )}
    </>
  );
};

IndexPageTemplate.propTypes = {
  showAppDownloads: PropTypes.bool,
  showChart: PropTypes.bool,
  showFAQ: PropTypes.bool,
  showFooter: PropTypes.bool,
  showForm: PropTypes.bool,
  showHowItWorks: PropTypes.bool,
  showNewsletterForm: PropTypes.bool,
  showTeam: PropTypes.bool,
  showPhoneNumberForm: PropTypes.bool,
  showReviews: PropTypes.bool,
  showVideo: PropTypes.bool,
  showPressArticles: PropTypes.bool,
};

IndexPageTemplate.defaultProps = {
  showAppDownloads: true,
  showChart: true,
  showFAQ: true,
  showFooter: true,
  showForm: true,
  showHowItWorks: true,
  showNewsletterForm: true,
  showTeam: true,
  showPhoneNumberForm: true,
  showReviews: true,
  showVideo: true,
  showPressArticles: true,
};

export default IndexPageTemplate;
