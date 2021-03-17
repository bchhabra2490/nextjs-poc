import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from './SocialLink';

const SectionBottom = ({ showFooterSocialLinks }) => (
  <div className="section-bottom-container">
    <div className="columns">
      <div className="column is-12">
        <div className="section-container">
          <div className="section-nav-container">
            <div className="nav-item">
              <p>
                SEBI Registered Investment Advisor - INA000015303
              </p>
            </div>
            <div className="nav-item">
              <a href="mailto:support@tejimandi.com">Email us: support@tejimandi.com</a>
              {showFooterSocialLinks && <SocialLink />}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="column">
        <h4 className="text-title">Disclaimer:</h4>
        <p className="text-paragraph">
          Teji Mandi has applied for a SEBI Registered Investment Advisory
          License. It relies on information from various sources believed to be
          reliable, but cannot guarantee the accuracy and completeness of that
          information. Nothing in this communication should be construed as an
          offer, recommendation, or solicitation to buy or sell any security.
        </p>
      </div> */}
    </div>
  </div>
);

SectionBottom.propTypes = {
  showFooterSocialLinks: PropTypes.bool,
};

SectionBottom.defaultProps = {
  showFooterSocialLinks: true,
};
export default SectionBottom;
