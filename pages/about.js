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
      <SEO title="Teji Mandi - About" />
      <section className="static-content-wrapper">
        <div className="container">
          <div className="section-title">
            <h2 className="title">ABOUT US</h2>
          </div>
          <div className="static-page-desc">
            <h4>
              Teji Mandi was started with the goal of simplifying every investors journey in the stock market.
            </h4>
          </div>
          <div className="static-content">
            <p><strong>Who do we cater to?</strong></p>
            <p> You want to invest in the stock market but</p>
            <ul>
              <li>Are confused with stock tips and news</li>
              <li>Have lost money in the marketHave no time to track the market</li>
              <li>Frustrated with complicated analysis</li>
              <li>Don't understand trading websites</li>
            </ul>
            <p>
              <strong>What do we offer?</strong>

            </p>
            <p>Invest through Teji Mandi & cut through the noise, complexity & confusion of the stock market.</p>
            <p>
              <strong>Get one powerful strategy</strong>
            </p>
            <p>Combines short term tactical bets and long-term winners to generate best in class returns.</p>
            <p>
              <strong>Invest and rebalance with ease</strong>
            </p>
            <p>
              Buy winning stocks and exit losing stocks with a few clicks through a broker of your choice.
            </p>
            <p>
              <strong>Get practical information in a simple language</strong>

            </p>
            <p>
              Our research team focuses on explaining everything in simple English to our clients.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

StaticContent.propTypes = {};

export default StaticContent;
