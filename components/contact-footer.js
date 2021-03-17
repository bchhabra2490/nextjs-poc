import React from 'react';
import {
  Grid, Typography, Container,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  moLogo: {
    width: '300px',
    [theme.breakpoints.down('md')]: {
      width: '200px',
    },
  },
  footer: {
    padding: '40px 0px 20px',
    backgroundColor: '#061626',
    color: '#fff',
  },
  footerContainer: {
    width: '100%',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  copyright: {
    fontSize: '16px',
    fontFamily: 'Open Sans',
    fontWeight: '500',
    marginBottom: '2rem',
    textAlign: 'center',
  },
}));

const ContactFooter = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="h5"
              variant="h5"
              gutterBottom
            >
              SEBI Registered Investment Advisor - INA000015303
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <Typography
              component="h5"
              variant="h5"
              gutterBottom
              align="center"
            >
              Powered By
            </Typography>
            <img className={classes.moLogo} src={data.motilalOswal.childImageSharp.fluid.src} alt="Motilal Oswal" />
          </Grid> */}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="p"
              variant="p"
              gutterBottom
              align="justify"
            >
              {' '}
              Disclaimer:
              <br />
              By using this website, you understand the information
              being presented is provided for informational
              purposes only and agree to our Terms of Service and
              Privacy Policy. Teji Mandi relies on information from
              various sources believed to be reliable, but cannot guarantee
              the accuracy and completeness of that information. Nothing in this
              communication should be construed as an offer, recommendation, or solicitation
              to buy or sell any security.
              <br />
              <b>Additionally, Past performance is not indicative of future returns</b>

            </Typography>
            <p className={classes.copyright}>&copy; 2021 TM Investment Technologies Pvt Ltd. All Rights Reserved </p>

          </Grid>
        </Grid>
      </Container>

    </footer>
  );
};

export default ContactFooter;
