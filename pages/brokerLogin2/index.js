import React from 'react';
import queryString from 'query-string';

const jwt = require('jsonwebtoken');

const Invest = ({ location }) => {
  React.useEffect(() => {
    const webToken = jwt.sign(
      {
        guest: true,
        iat: Math.floor(Date.now() / 1000),
      },
      'secret',
      {
        expiresIn: '60d',
      },
    );
    console.log(webToken);
    const params = queryString.parse(location.search);
    if (window.sc) {
      window.sc.init({ userData: webToken }).then(() => {
        console.log('data');
      });
      window.sc
        .connect()
        .then((response) => {
          if (
            window.webkit
            && window.webkit.messageHandlers
            && window.webkit.messageHandlers.SmallcaseInterface
            && window.webkit.messageHandlers.SmallcaseInterface.postMessage
          ) {
            try {
              console.log(
                'window.webkit.messageHandlers.SmallcaseInterface.postMessage',
                JSON.stringify(response),
              );
              window.webkit.messageHandlers.SmallcaseInterface.postMessage(
                JSON.stringify(response),
              );
            } catch (ex) {
              console.log(ex);
            }
          } else if (
            window.SmallcaseInterface
            && window.SmallcaseInterface.postMessage
          ) {
            try {
              window.SmallcaseInterface.postMessage(JSON.stringify(response));
            } catch (ex) {
              console.log(ex);
            }
          }
        })
        .catch((error) => {
          console.log(
            'window.webkit.messageHandlers.SmallcaseInterface.postMessage',
            error,
          );
          if (
            window.webkit
            && window.webkit.messageHandlers
            && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
            && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
              .postMessage
          ) {
            try {
              console.log(
                'window.webkit.messageHandlers.SmallcaseInterface.postMessage',
                JSON.stringify(error),
              );
              window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage(
                JSON.stringify(error),
              );
            } catch (ex) {
              console.log(ex);
            }
          } else if (
            window.SmallcaseInterface
            && window.SmallcaseInterface.closeWindow
          ) {
            try {
              window.SmallcaseInterface.closeWindow(JSON.stringify(error));
            } catch (ex) {
              console.log(ex);
            }
          }
        });
    }
    return () => {};
  }, []);
  return <div />;
};

Invest.propTypes = {};

export default Invest;
