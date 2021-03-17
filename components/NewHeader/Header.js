import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useStaticQuery, graphql } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';
import {
  Hidden,
} from '@material-ui/core';
import WhatsappIcon from '../../assets/svgs/NewWhatapp';
import Instagram from '../../assets/svgs/Instagram';
import TwitterIcon from '../../assets/svgs/Twitter';
import LinkedIn from '../../assets/svgs/LinkedIn';
import Facebook from '../../assets/svgs/facebook';
import TelegramIcon from '../../assets/svgs/telegram';
import YouTubeIcon from '../../assets/svgs/youtubeIcon';
import HamburgerIcon from '../../assets/svgs/Hamburger';

function getAppLink(store) {
  // if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  //   const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
  if (store === 'google') {
    return 'https://play.google.com/store/apps/details?id=com.tejimandi.android';
  } if (store === 'apple') {
    return 'https://apps.apple.com/in/app/teji-mandi-portfolio-advisor/id1531900507';
  }
  //   // iOS detection from: http://stackoverflow.com/a/9039885/177710
  //   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //   }
  // }
  return 'https://app.adjust.net.in/jsr?url=https%3A%2F%2Fjgua.adj.st%3Fadj_t%3Di6gf3cx';
}

function getOS() {
  if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }
  }
  return 'android';
}

const Header = ({
  handleSidebar, showLinks, showMenu, headerLink,
}) => {
  const data = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      },playstore:file(relativePath: { eq: "playstore.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      },
      appstore:file(relativePath: { eq: "app_store.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      },
    }
  `);
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation" style={!headerLink ? { justifyContent: 'center' } : {}}>
          <div className="navbar-brand" style={!headerLink ? { justifyContent: 'center' } : {}}>
            {showMenu && (
            <a
              role="button"
              className="navbar-burger burger"
              onClick={() => handleSidebar(true)}
            >
              <HamburgerIcon />
            </a>
            )}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              {headerLink && (
              <Link to="/" className="navbar-item is-desktop">
                <div className="app-logo">
                  {/* <AppLogo /> */}
                  <img
                    src={data.logoImage.childImageSharp.fluid.src}
                    alt="Teji Mandi"
                    height={100}
                  />
                  {/* <h1>Teji <span className="header-text">Mandi</span></h1> */}
                </div>
              </Link>
              )}
              {!headerLink && (
              <div className="app-logo">
                {/* <AppLogo /> */}
                <img
                  src={data.logoImage.childImageSharp.fluid.src}
                  alt="Teji Mandi"
                />
                {/* <h1>Teji <span className="header-text">Mandi</span></h1> */}
              </div>
              )}
              <Hidden mdUp>
                <div style={{ marginRight: '10px', marginTop: '5px' }}>
                  <a
                    href={getAppLink()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getOS() === 'android' && <img src={data.playstore.childImageSharp.fluid.src} alt="Google Play" style={{ height: '40px' }} />}
                    {getOS() === 'ios' && <img src={data.appstore.childImageSharp.fluid.src} alt="Apple Store" style={{ height: '40px' }} />}

                  </a>

                </div>
              </Hidden>
            </div>
          </div>

          {showLinks && (
          <div className="navbar-menu">

            <>
              <Link
                to="/#how-it-works"
                activeClassName="is-active"
                className="navbar-item is-desktop"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    scrollTo('#how-it-works');
                  }
                }}
              >
                How It Works
              </Link>
              <Link
                to="/#performance"
                activeClassName="is-active"
                className="navbar-item is-desktop"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    scrollTo('#performance');
                  }
                }}
              >
                Track Record
              </Link>
              <Link
                to="/research"
                activeClassName="is-active"
                className="navbar-item is-desktop"
              >
                Research
              </Link>
              <Link
                to="https://www.linkedin.com/company/tejimandiapp/jobs/"
                target="_blank"
                activeClassName="is-active"
                className="navbar-item is-desktop"
              >
                Careers
              </Link>
              <Link
                to="/#faq"
                activeClassName="is-active"
                className="navbar-item is-desktop"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    scrollTo('#faq');
                  }
                }}
              >
                FAQs
              </Link>
            </>

          </div>
          )}
          {showLinks && (
            <div className="navbar-social">
              <div className="social-container">
                <div className="social-item">
                  <a href="https://twitter.com/tejimandiapp" target="__blank">
                    <TwitterIcon />
                  </a>
                  <a
                    target="__blank"
                    href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
                  >
                    <WhatsappIcon />
                  </a>
                  <a
                    target="__blank"
                    href="https://www.linkedin.com/company/tejimandiapp"
                  >
                    <LinkedIn />
                  </a>
                  <a
                    target="__blank"
                    href="https://www.facebook.com/TejiMandiInvest/"
                  >
                    <Facebook />
                  </a>
                  <a
                    target="__blank"
                    href="https://www.instagram.com/tejimandiapp"
                  >
                    <Instagram />
                  </a>
                  <a
                    target="__blank"
                    href="https://t.me/tejimandiapp"
                  >
                    <TelegramIcon />
                  </a>
                  <a
                    target="__blank"
                    href="https://www.youtube.com/channel/UC22aV3096SNSfweF7Io4NtQ?sub_confirmation=1"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  showLinks: PropTypes.bool,
  showMenu: PropTypes.bool,
  headerLink: PropTypes.bool,
};

Header.defaultProps = {
  showLinks: true,
  showMenu: true,
  headerLink: true,
};

export default Header;
