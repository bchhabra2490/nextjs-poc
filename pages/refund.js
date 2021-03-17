import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const StaticContent = () => {
  try {
    window.fcWidget.hide();
  } catch (er) {
    console.log(er);
  }
  return (
    <Layout>
      <SEO title="Teji Mandi - Cancellation & Refund Policy" />
      <section className="static-content-wrapper">
        <div className="container">
          <div className="section-title">
            <h2 className="title">Cancellation & Refund Policy</h2>
          </div>
          <div style={{ height: 300 }}>
            <h4 style={{ position: 'absolute', top: '50%', fontSize: '20px' }}>
              Our advisory services are available on a monthly, three & six-monthly basis.
              We
              {' '}
              <b>do not give a refund</b>
              {' '}
              on the fee, In case you are unhappy with our services, you can discontinue by cancelling
              {' '}
              <b>the renewal</b>
              {' '}
              of your subscription.
              We are always available on chat for feedback and to hear on any issues you have with the subscriptions.
            </h4>
          </div>
        </div>
      </section>
    </Layout>
  );
};

StaticContent.propTypes = {};

export default StaticContent;
