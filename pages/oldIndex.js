import React from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import SEO from '../components/seo';
// import LaunchForm from '../components/LaunchForm';
// import GooglePlay from '../assets/svgs/google';
// import AppleStore from '../assets/svgs/apple-store';

export const IndexPageTemplate = () => (
  <>
    <section className="wrapper-container background-image">
      <div className="container">
        <div className="wrapper-content" style={{ minHeight: '500px', display: 'flex', alignItems: 'center' }}>
          <div className="left-container">
            <h6>We specialize in picking stocks</h6>
            <p>We’ll tell you</p>
            <h4>What to buy.</h4>
            <h4>Why to buy.</h4>
            <h4>And when to sell</h4>
            {/* <p>through an easy-to-use app</p> */}
            {/* <div style={{ marginTop: '20px' }}>
              <a
                role="button"
                style={{
                  backgroundColor: '#fff',
                  padding: '8px 32px',
                  color: '#0C552F',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  borderRadius: '57px',
                  textTransform: 'capitalize',
                  fontFamily: 'Open Sans',

                }}
                href="https://tejimandi.smallcase.com"
                rel="noreferrer"
                target="_blank"
              >
                Invest Now
              </a>
            </div> */}

          </div>
          <div className="right-container">
            <p
              className="sc-embed"
              data-smallcase="true"
              data-cardsize="big"
              data-scid="TJPMO_0001"
              data-cta="view"
              style={{
                width: '500px', maxWidth: '100%', minHeight: '300px', display: 'flex', alignItems: 'strech', justifyContent: 'center',
              }}
            >
              {' '}
              <strong>Loading smallcase widget</strong>
              {' '}
            </p>
          </div>
        </div>
        {/* <div className="wrapper-bottom-content">
          <div className="wrapper-link-content">
            <h1 className="wrapper-title">Launching Soon on</h1>
            <div className="store-link-container">
              <a
                href="https://play.google.com/store/apps/details?id=com.tejimandi"
                target="_to"
                rel="noopener"
              >
                <img
                  className="image"
                  src={PlayStore}
                  width="162"
                  height="48"
                  alt="Teji Mandi"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tejimandi"
                target="_to"
                rel="noopener"
              >
                <img src={AppStore} width="162" height="48" alt="Teji Mandi" />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
    {/* <section className="mobile-app-container">
      <LaunchForm />
    </section> */}
    {/* <section className="mobile-app-container">
      <h2>Launching Soon on</h2>
      <div className="store-link-container">
        <div className="google">
          <GooglePlay />
        </div>
        <div className="apple">
          <AppleStore />
        </div>
      </div>
    </section> */}
  </>
);

const IndexPage = ({ location }) => (
  <Layout location={location} showLinks={false}>
    <SEO title="Teji Mandi - Stock Investing, Simplified" />
    <IndexPageTemplate />
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default IndexPage;
