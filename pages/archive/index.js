import React from 'react';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { createApolloFetch } from 'apollo-fetch';
import {
  CircularProgress,
} from '@material-ui/core';
import useScript from '../../components/hooks/useScript';

const jwt = require('jsonwebtoken');

const getToken = () => {
  const webToken = jwt.sign(
    {
      guest: true,
      iat: Math.floor(Date.now() / 1000),
    },
    'tejimandi_46fc1cc61ada44c5b3d7ad2d3d5b64ce',
    {
      expiresIn: '360d',
    },
  );
  return webToken;
};

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

const apolloFetch = createApolloFetch({ uri });

const query = `
  query getSmallcaseTransaction ($transaction: SmallcaseTransactionData!) {
    getSmallcaseTransaction (transaction: $transaction) {
        transactionId
        userToken
        expireAt
    }
  }
`;

const Transaction = () => {
  if (typeof window !== 'undefined') {
    try {
      window.fcWidget.hide();
    } catch (er) {
      console.log(er);
    }
  }
  const smallcaseRef = React.useRef(null);
  const status = useScript('https://gateway.smallcase.com/scdk/2.0.0/scdk.js');
  const archive = (iscid, scAuthId) => {
    let orderConfig = {
      type: 'BUY',
    };
    if (iscid) {
      orderConfig = {
        ...orderConfig,
        iscid,
        scid: 'TJMMO_0003',
      };
    }
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = {
        'api-version': 2,
        smallcaseAuthId: scAuthId,
      };
      next();
    });
    return apolloFetch({
      query,
      variables: {
        transaction: {
          intent: 'TOKEN',
          orderConfig,
        },
      },
    }).then((response) => {
      console.log('Response from TRANSACTION intent graphql', response);
      if (!isEmpty(response.data.getSmallcaseTransaction)) {
        let { userToken } = response.data.getSmallcaseTransaction;
        if (!userToken) {
          userToken = getToken();
        }

        smallcaseRef.current
          .init({
            userData: userToken,
          })
          .then(() => {
            console.log(iscid);
            smallcaseRef.current
              .markArchived(
                { iscid },
              )
              .then((smallcaseResponse) => {
                console.log('Smallcase Response', smallcaseResponse.orderBatches[0][0].status);
                let appResp = false;
                if (smallcaseResponse != null && smallcaseResponse.orderBatches != null) {
                  if (smallcaseResponse.orderBatches.length > 0 && smallcaseResponse.orderBatches[0].length > 0) {
                    if (smallcaseResponse.orderBatches[0][0].status === 'MARKEDCOMPLETE') {
                      appResp = true;
                    }
                  }
                }
                if (
                  window.webkit
                  && window.webkit.messageHandlers
                  && window.webkit.messageHandlers.SmallcaseInterface
                  && window.webkit.messageHandlers.SmallcaseInterface.postMessage
                ) {
                  try {
                    console.log(
                      'window.webkit.messageHandlers.SmallcaseInterface.postMessage',
                      appResp,
                    );
                    window.webkit.messageHandlers.SmallcaseInterface.postMessage(
                      JSON.stringify({ status: appResp }),
                    );
                  } catch (ex) {
                    console.log(ex);
                  }
                } else if (
                  window.SmallcaseInterface
                  && window.SmallcaseInterface.postMessage
                ) {
                  try {
                    window.SmallcaseInterface.postMessage(
                      JSON.stringify({ status: appResp }),
                    );
                  } catch (ex) {
                    console.log(ex);
                  }
                }
              })
              .catch((error) => {
                console.log('window.SmallcaseInterface.closeWindow', JSON.stringify({ status: false }));
                if (
                  window.webkit
                  && window.webkit.messageHandlers
                  && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
                  && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
                    .postMessage
                ) {
                  try {
                    console.log(
                      'window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage',
                      false,
                    );
                    window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage(
                      JSON.stringify({ status: 'false' }),
                    );
                  } catch (ex) {
                    console.log(ex);
                  }
                } else if (
                  window.SmallcaseInterface
                  && window.SmallcaseInterface.closeWindow
                ) {
                  try {
                    window.SmallcaseInterface.closeWindow(JSON.stringify({ status: 'false' }));
                  } catch (ex) {
                    console.log(ex);
                  }
                }
              });
          }).catch((e) => {
            console.log('Error while initialising smallCase: ', e.message);
          });
      } else {
        console.log(response.errors);
        if (
          window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
        && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
          .postMessage
        ) {
          try {
            console.log(
              'window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage',
              JSON.stringify(response.errors, Object.getOwnPropertyNames(response.errors)),
            );
            window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage(
              JSON.stringify(response.errors, Object.getOwnPropertyNames(response.errors)),
            );
          } catch (ex) {
            console.log(ex);
          }
        } else if (
          window.SmallcaseInterface
        && window.SmallcaseInterface.closeWindow
        ) {
          try {
            window.SmallcaseInterface.closeWindow(
              JSON.stringify(response.errors, Object.getOwnPropertyNames(response.errors)),
            );
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    });
  };

  React.useEffect(() => {
    if (status === 'ready') {
      try {
        smallcaseRef.current = new window.scDK({
          gateway: 'tejimandi',
          smallcaseAuthToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWVzdCI6dHJ1ZSwiaWF0IjoxNTkzNTg1ODIxfQ.pXSkE7nTRZUojABSi14peHboXkBDcDhpvJlQoSNWKy8',
          config: {
            amo: true,
          },
        });
        const params = queryString.parse(window.location.search);
        archive(
          params.iscid,
          params.scAuthId,
        );
      } catch (e) {
        console.log('Error while update smallcaseRef: ', e.message);
      }
    }
  }, [status]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '600px',
    }}
    >
      <CircularProgress
        width={20}
        height={20}
      />
    </div>
  );
};

Transaction.propTypes = {};

export default Transaction;
