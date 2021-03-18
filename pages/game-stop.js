import React, { useEffect } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Hidden,
} from '@material-ui/core';
import Image from 'next/image'
import GameStopSVG from '../assets/svgs/game-stop';
import SEO from '../components/seo';
import defaultTheme from '../theme-material-ui/theme';
import ContactFooter from '../components/contact-footer';

const useStyles = makeStyles((theme) => ({
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
      width: '100px',
    },
  },
  appText: {
    fontSize: '24px',
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    margin: '100px 0px 20px 0px',
  },
  appStoreImageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '100px',
  },
  appStoreImage: {
    height: '50px',
    margin: '10px',
  },
  buttonLinkDefault: {
    color: '#fff',
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    padding: '10px',
  },
}));
const GameStop = ({ location }) => {
  const classes = useStyles();
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.fcWidget.hide();
      }
    } catch (er) {
      console.log(er);
    }
  }, []);
  return (
    <>
      <SEO title="Teji Mandi - Stock Investing, Simplified" image="https://firebasestorage.googleapis.com/v0/b/tejimandiprod.appspot.com/o/images%2F08a63748-de6b-f880-2c79-ab3c9aea7d29.png?alt=media&token=a9ef2852-c589-432c-87f0-60171b38fa1a" />
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Grid container>
            <Grid item xs={12} className={classes.appLogo}>
              <img
                src="/img/logo.png"
                alt="Teji Mandi"
                className={classes.appLogoImage}
              />
              <p className={classes.appText}>Stock Investing, Simplified</p>
            </Grid>
          </Grid>
          <div style={{ backgroundColor: '#000', padding: '0px' }}>

            <Grid container>
              <Grid item xs={12} style={{ textAlign: 'center', margin: '100px 0px 20px 0px' }}>
                {/* <h1 className={classes.title}>
                  Game
                  {' '}
                  <span style={{ color: '#ff0000' }}>Stop!</span>
                </h1> */}
                <GameStopSVG />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Typography component="p" gutterBottom style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
                  Teji Mandi simplifies stock market investing by guiding you on what stocks to buy,
                  when to buy & when to sell. We also tell you the rationale behind each move, we keep the process transparent & to empower
                  our investors making the right decision.
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Typography
                  component="p"
                  style={{
                    color: '#fff', fontWeight: 'bold', fontSize: '18px', margin: '20px 0px',
                  }}
                >
                  Install Teji Mandi app and become a smart investor.
                </Typography>
              </Grid>
            </Grid>
            <Hidden mdUp>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center', margin: '30px 0px 100px 0px' }}>
                  <a
                    href="https://app.adjust.net.in/jsr?url=https%3A%2F%2Fjgua.adj.st%3Fadj_t%3Dlkwcr2l"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.buttonLinkDefault}
                  >
                    DOWNLOAD THE APP NOW
                  </a>
                </Grid>

              </Grid>
            </Hidden>

            <Hidden smDown>

              <div className={classes.appStoreImageDiv}>
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.tejimandi.android"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                src="/img/playstore.png" alt="Google Play" className={classes.appStoreImage} />
                  </a>
                </div>
                <div>
                  <a
                    rel="noreferrer"
                    href="https://apps.apple.com/in/app/teji-mandi-portfolio-advisor/id1531900507"
                    target="_blank"
                  >
                    <img
                src="/img/app_store.png" alt="Apple Store" className={classes.appStoreImage} />
                  </a>

                </div>
              </div>
            </Hidden>

          </div>
        </div>
        <ContactFooter />
      </ThemeProvider>
    </>
  );
};

GameStop.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default GameStop;
