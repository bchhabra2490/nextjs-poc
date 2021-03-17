import React from 'react';
import {
  Grid, Container, Typography, Hidden,

} from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import SEO from '../components/seo';
import defaultTheme from '../theme-material-ui/theme';
import ContactFooter from '../components/contact-footer';
import ThankYouPageBear from '../assets/svgs/thank-you-page-bear';
import ThankYouPageBull from '../assets/svgs/thank-you-page-bull';
import CircleCheckMark from '../assets/svgs/checkmar-circle';
import useScript from '../components/hooks/useScript';

const useStyles = makeStyles((theme) => ({
  bottomBear: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:first-child': {
      height: '100px',
    },
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
  middleSection: {
    margin: '30px 0',
  },
}));

const ThankYouPage = ({ location }) => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
  query {
    logoImage: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    },
  }
`);

  // useScript('https://www.googletagmanager.com/gtag/js?id=AW-742207070');

  const gtag = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    }
  };
  gtag('js', new Date());
  gtag('config', 'AW-742207070');
  return (
    <>
      <SEO title="Teji Mandi - Stock Investing, Simplified" />
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth={false} className={classes.container}>
          <Grid container>
            <Grid item xs={12} className={classes.appLogo}>
              <img
                src={data.logoImage.childImageSharp.fluid.src}
                alt="Teji Mandi"
                className={classes.appLogoImage}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.middleSection}>

              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Hidden mdUp>
                    <CircleCheckMark width={74} />
                  </Hidden>
                  <Hidden smDown>
                    <CircleCheckMark width={148} />
                  </Hidden>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h2" component="h2" gutterBottom><b>Thank You!</b></Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h6" style={{ padding: '10px 0px', borderBottom: '1px solid #E5E5E5' }}>One of our advisors will get in touch with you shortly.</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center', margin: '40px 0px' }}>
                  <a
                    href="/research"
                    style={{
                      padding: '10px 10px', border: '1px solid #00A651', color: '#000', textDecoration: 'none',
                    }}
                  >
                    Read our research
                  </a>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.bottomBear}>
              {/* <img src={data.bottomBear.childImageSharp.fluid.src} alt="" /> */}
              <ThankYouPageBull />
            </Grid>
            <Grid item xs={6} className={classes.bottomBear}>
              {/* <img src={data.bottomBear.childImageSharp.fluid.src} alt="" /> */}
              <ThankYouPageBear />
            </Grid>
          </Grid>
        </Container>
        <ContactFooter />
      </ThemeProvider>
    </>
  );
};

export default ThankYouPage;
