import React from 'react';
import queryString from 'query-string';

const Portfolio = ({ params }) => {
  const connect = () => new Promise((resolve, reject) => {
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
        resolve();
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
        reject();
      });
  });
  const triggerSmallcaseOrder = (type, scid, iscid, batchTag) => {
    window.sc
      .triggerSmallcaseOrder({
        scid,
        type,
        iscid,
        batchTag,
      })
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
  };
  React.useEffect(() => {
    if (params.smallcaseAuthToken && params.type) {
      window.sc.init({ userData: params.smallcaseAuthToken }).then(() => {
        triggerSmallcaseOrder(params.type, params.scid, params.iscid, params.batchTag);
      });
    } else if (!params.smallcaseAuthToken && params.type) {
      connect().then(() => {
        triggerSmallcaseOrder(params.type, params.scid, params.iscid, params.batchTag);
      });
    }
    return () => {};
  }, []);
  return <div />;
};


export async function getServerSideProps({query}) {
  return {
    props: {
      params: query,
    }, // will be passed to the page component as props
  }
}
Portfolio.propTypes = {};

export default Portfolio;
