import className from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import FreshChat from 'react-freshchat'
import Header from './NewHeader/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar';
import LoginModal from './login-modal';
// import Notification from './notification';

const Layout = ({
  children,
  hideHeader,
  showModal,
  showLinks,
  onClose,
  showFooterSocialLinks,
  showFooter,
  showMenu,
  headerLink,
  headerPos,
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleSidebar = (value) => {
    setOpen(value);
    if (value) {
      document.documentElement.className = 'is-clipped';
    } else {
      document.documentElement.className = '';
    }
  };
  return (
    <>
   {typeof window != 'undefined' && <FreshChat
        token={process.env.NEXT_PUBLIC_FRESHCHAT_TOKEN}
       
        onInit={widget => {
          /* Use `widget` instead of `window.fcWidget`
            widget.user.setProperties({
              email: user.email,
              first_name: user.firstName,
              last_name: user.lastName,
              phone: user.phoneNumber,
            })
          */
        }}
      />}
      {!hideHeader && (
        <Header
          siteTitle={"Teji Mandi"}
          showLinks={showLinks}
          handleSidebar={toggleSidebar}
          showMenu={showMenu}
          headerPos={headerPos}
          headerLink={headerLink}
        />
      )}
      <main
        className={className('main-container', { 'is-slider': hideHeader })}
      >
        {children}
      </main>
      {showFooter && <Footer showFooterSocialLinks={showFooterSocialLinks} />}
      <Sidebar open={open} handleSidebar={toggleSidebar} />
      {/* {showModal && <DefaultModal />} */}
      {showModal && <LoginModal onClose={onClose} />}
      {/* <PaymentModal /> */}
      {/* <Notification /> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideHeader: PropTypes.bool,
  showModal: PropTypes.bool,
  showLinks: PropTypes.bool,
  showFooterSocialLinks: PropTypes.bool,
  showFooter: PropTypes.bool,
  showMenu: PropTypes.bool,
};

Layout.defaultProps = {
  hideHeader: false,
  showModal: false,
  showLinks: true,
  showFooterSocialLinks: true,
  showFooter: true,
  showMenu: true,
};

export default Layout;
