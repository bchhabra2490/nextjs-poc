import className from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import scrollTo from 'gatsby-plugin-smoothscroll';
import MenuIcon from '../../assets/svgs/Hamburger';
import TwitterIcon from '../../assets/svgs/Twitter';
import Instagram from '../../assets/svgs/Instagram';
import Whatsapp from '../../assets/svgs/NewWhatapp';
import LinkedIn from '../../assets/svgs/LinkedIn';
import Facebook from '../../assets/svgs/facebook';
import TelegramIcon from '../../assets/svgs/telegram';
import YouTubeIcon from '../../assets/svgs/youtubeIcon';

const Sidebar = ({ open, handleSidebar }) => {
  const overlayClicked = () => {
    handleSidebar(false);
  };
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   gtag_report_conversion(
  //     'https://play.google.com/store/apps/details?id=com.tejimandi',
  //   );
  // };
  React.useEffect(
    () => () => {
      if (document.documentElement.classList.contains('is-clipped')) {
        document.documentElement.className = '';
      }
    },
    [],
  );
  return (
    <div className={className('app-sidebar-wrapper', { active: open })}>
      <div className="sidebar-container">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <button
              aria-label="side-bar-menu"
              className="menu-app-button button"
              type="button"
              onClick={() => handleSidebar(false)}
            >
              <MenuIcon />
            </button>
          </div>
          <div className="sidebar-body">
            <ul>
              <li>
                <Link
                  to="/#how-it-works"
                  activeClassName="is-active"
                  onClick={(event) => {
                    handleSidebar(false);
                    scrollTo('#how-it-works');
                  }}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/#performance"
                  activeClassName="is-active"
                  onClick={(event) => {
                    handleSidebar(false);
                    scrollTo('#performance');
                  }}
                >
                  Track Record
                </Link>
              </li>
              <li>
                <Link to="/research" activeClassName="is-active">
                  Research
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/company/tejimandiapp/jobs/"
                  target="_blank"
                  activeClassName="is-active"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  onClick={(event) => {
                    handleSidebar(false);
                    scrollTo('#faq');
                  }}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/terms"
                >
                  Terms and Conditions
                </Link>
              </li>
              <p style={{ fontWeight: 'bold' }}>Follow Us:</p>
              <div style={{ justifyContent: 'space-evenly', display: 'flex' }}>
                <a
                  href="https://twitter.com/tejimandiapp"
                  target="_to"
                  rel="noopener"
                >
                  <span>
                    <TwitterIcon classname="iconSize" />
                  </span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
                  target="_to"
                  rel="noopener"
                >
                  <span>
                    <Whatsapp classname="iconSize" />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/company/tejimandiapp"
                  target="_to"
                  rel="noopener"
                >
                  <span>
                    <LinkedIn classname="iconSize" />
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/TejiMandiInvest/"
                  target="_to"
                  rel="noopener"
                >
                  <span>
                    <Facebook classname="iconSize" />
                  </span>
                </a>

              </div>

              <div style={{ justifyContent: 'space-evenly', display: 'flex' }}>

                <a
                  target="__blank"
                  href="https://t.me/tejimandiapp"
                >
                  <span>

                    <TelegramIcon classname="iconSize" />
                  </span>
                </a>
                <a
                  target="__blank"
                  href="https://www.youtube.com/channel/UC22aV3096SNSfweF7Io4NtQ?sub_confirmation=1"
                >
                  <span>

                    <YouTubeIcon />
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/tejimandiapp"
                  target="_to"
                  rel="noopener"
                >
                  <span>
                    <Instagram />
                  </span>
                </a>

              </div>

            </ul>
          </div>
          <div className="sidebar-footer">
            <p>Email us: support@tejimandi.com</p>

            <p>
              SEBI Registered Investment Advisor
              {' '}
              <br />
              INA000015303
            </p>

            <p className="copyright">&copy; 2020 TM Investment Technologies Pvt Ltd.</p>
          </div>
        </div>
      </div>
      <div
        className="sidebar-overlay"
        onClick={overlayClicked}
        role="presentation"
      />
    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
