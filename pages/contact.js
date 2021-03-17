import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LaunchForm from '../components/LaunchForm';

const StaticContent = () => {
  try {
    window.fcWidget.hide();
  } catch (er) {
    console.log(er);
  }
  return (
    <Layout>
      <SEO title="Teji Mandi - Contact Us" />
      <section className="static-content-wrapper">
        <div className="container">
          <div className="section-title">
            <h2 className="title">CONTACT US</h2>
          </div>
        </div>
        <LaunchForm title="Have an advisor call you back" showRequirements />
      </section>
    </Layout>
  );
};

export default StaticContent;
