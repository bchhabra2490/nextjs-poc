import React from 'react';
import {

  Grid, Typography, Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Layout from '../components/layout';
import SEO from '../components/seo';

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
  pretitle: {
    fontSize: '32px',
    textAlign: 'center',
    color: 'grey',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',

    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px',

    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
    },
  },
  duration: {
    color: 'gray',
    fontWeight: 500,
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  durationRow: {
    padding: '10px',
  },
  pricingText: {
    fontWeight: 'bold',
    padding: '10px 10px',
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  pricingRow: {
    backgroundColor: 'white',
    border: '5px solid #f9f9f9',
  },
  logo: {
    height: '30px',
    margin: ' 0px 10px',
  },
  appStoreImageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  appStoreImage: {
    height: '50px',
    margin: '10px',
  },
  buttonLinkDefault: {
    color: '#333',
    backgroundColor: 'transparent',
    border: '1px solid #333',
    padding: '10px',
  },
}));

const StaticContent = () => {
  
    try {
      window.fcWidget.hide();
    } catch (er) {
      console.log(er);
    }
  

  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Teji Mandi - Pricing" />
      <section style={{ height: '500px' }}>
        <div style={{ top: '20%', position: 'relative' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="h5"
                className={classes.pretitle}
              >
                We charge a subscription fee for our advice.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="h4"
                className={classes.title}
              >
                Choose from three plans
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={2} className={classes.durationRow}>
              <Typography
                component="p"
                className={classes.duration}
              >
                1 MONTH
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.durationRow}>
              <Typography
                component="p"
                className={classes.duration}
              >
                3 MONTHS
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.durationRow}>
              <Typography
                component="p"
                className={classes.duration}
              >
                6 MONTHS
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.pricingRow}>
              <Typography
                component="p"
                className={classes.pricingText}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img src="/img/Favicon 96x96.png" alt="" className={classes.logo}/>
                Teji Mandi Subscription
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.pricingRow}>
              <Typography
                component="p"
                className={classes.pricingText}
              >
                ₹ 249
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.pricingRow}>
              <Typography
                component="p"
                className={classes.pricingText}
              >
                ₹ 199 / month
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.pricingRow}>
              <Typography
                component="p"
                className={classes.pricingText}
              >
                ₹ 149 / month
              </Typography>
            </Grid>
          </Grid>

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

        </div>
      </section>
    </Layout>
  );
};

StaticContent.propTypes = {};

export default StaticContent;
