import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';

// import useStyles from './styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import defaultTheme from '../theme-material-ui/theme';
import IndexPageTemplate from '../components/index-page-template';
import ContactFooter from '../components/contact-footer';

const IndexPage = ({ location }) => {
  if (typeof window !== 'undefined') {
    useEffect(() => {
      try {
        window.fcWidget.hide();
      } catch (er) {
        console.log(er);
      }
    }, []);
  }

  return (

    <Layout location={location} headerPos="center" headerLink={false} showLinks={false} showFooterSocialLinks={false} showMenu={false} showFooter={false}>
      <SEO title="Teji Mandi - Stock Investing, Simplified" />
      <ThemeProvider theme={defaultTheme}>
        <IndexPageTemplate location={location} showPressArticles={false} showFAQ={false} showFooter={false} showHowItWorks={false} showNewsletterForm={false} showPhoneNumberForm={false} showReviews={false} showVideo={false} />
        <ContactFooter />
      </ThemeProvider>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default IndexPage;
