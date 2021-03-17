import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { useRouter } from 'next/router'

// import useStyles from './styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import defaultTheme from '../theme-material-ui/theme';
import IndexPageTemplate from '../components/index-page-template';

const IndexPage = ({ location }) => {
  const router = useRouter()

  console.log("Router: ", router, process.env);
  return(
 
  <Layout location={location} showLinks>
    <SEO title="Teji Mandi - Stock Investing, Simplified" />
    <ThemeProvider theme={defaultTheme}>
      <IndexPageTemplate showForm={false} />
    </ThemeProvider>
  </Layout>
)};

IndexPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default IndexPage;
