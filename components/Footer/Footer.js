import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import SectionBottom from './SectionBottom';

const Footer = ({ showFooterSocialLinks }) => (
  <footer className="footer">
    <div className="container">
      <SectionBottom showFooterSocialLinks={showFooterSocialLinks} />

      <Grid container>
        <Grid xs={12} sm={4} style={{ textAlign: 'center' }}>
          <div>
            <a href="/about" style={{ textDecoration: 'underline', color: '#fff' }}>About Us</a>
          </div>
          <div>
            <a href="/contact" style={{ textDecoration: 'underline', color: '#fff' }}>Contact Us</a>
          </div>
        </Grid>
        <Grid xs={12} sm={4} style={{ textAlign: 'center' }}>
          <div>
            <a href="/pricing" style={{ textDecoration: 'underline', color: '#fff' }}>Pricing</a>
          </div>
          <div>
            <a href="/refund" style={{ textDecoration: 'underline', color: '#fff' }}>Cancellation and Refund Policy</a>
          </div>
        </Grid>
        <Grid xs={12} sm={4} style={{ textAlign: 'center' }}>
          <div>
            <a href="/legal/privacy" style={{ textDecoration: 'underline', color: '#fff' }}>Privacy Policy</a>
          </div>
          <div>
            <a href="/legal/terms" style={{ textDecoration: 'underline', color: '#fff' }}>Terms and Condition</a>
          </div>
        </Grid>
      </Grid>
      <p>
        Disclaimer:
        <br />
        By using this website, you understand the information being presented is provided for informational purposes only and agree to our Terms of Service and Privacy Policy. Teji Mandi relies on information from various sources believed to be reliable, but cannot guarantee the accuracy and completeness of that information. Nothing in this communication should be construed as an offer, recommendation, or solicitation to buy or sell any security. Additionally, Teji Mandi does not provide tax advice and investors are encouraged to consult with their personal tax advisors.
      </p>
      <Grid container style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <p style={{ textDecoration: 'underline' }}>Name: TM Investment Technologies Private Limited</p>
          <p>
            Type of Registration: Non-Individual
            <br />
            Registration Number: INA000015303,
            {' '}
            <br />
            Validity: 5 years (21 Oct 2025)
            <br />
            Address: Motilal Oswal Tower, Rahimtullah Sayani Road,
            {' '}
            <br />
            Opp. Parel ST Depot, Prabhadevi, Mumbai – 400 025;
            {' '}
            <br />
            Tel: +91-93212-83592
            {' '}
          </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p style={{ textDecoration: 'underline' }}>Contact details of Principal Officer: </p>
          <p>
            Name: Vaibhav Agrawal
            {' '}
            <br />
            Email: vaibhav@mail.tejimandi.com
            {' '}
            <br />
            SEBI regional/local address: SEBI Bhavan BKC, Plot No.C4-A, 'G' Block, Bandra-Kurla Complex, Bandra (East), Mumbai - 400051, Maharashtra,
            {' '}
            <br />
            Tel : +91-22-26449000 / 40459000,
            {' '}
            <br />
            Fax : +91-22-26449019-22 / 40459019-22,
            {' '}
            <br />
            E-mail : sebi@sebi.gov.in,
            {' '}
            <br />
            Tel : +91-22-26449950 / 40459950,
            {' '}
            <br />
            Toll Free Investor Helpline: 1800 22 7575
          </p>
        </Grid>
      </Grid>

      <p className="copyright">&copy; 2021 TM Investment Technologies Pvt Ltd. All Rights Reserved</p>
    </div>
  </footer>
);

Footer.propTypes = {
  showFooterSocialLinks: PropTypes.bool,
};

Footer.defaultProps = {
  showFooterSocialLinks: true,
};

export default Footer;
