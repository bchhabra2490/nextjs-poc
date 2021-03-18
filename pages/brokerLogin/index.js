import React from 'react';
import queryString from 'query-string';
import { createApolloFetch } from 'apollo-fetch';
import {
  CircularProgress,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

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
      expiresIn: '30d',
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

const Invest = () => {
  let params = null;
  let brokers = null;
  if (typeof window !== 'undefined') {
    params = queryString.parse(window.location.search);
    try {
      window.fcWidget.hide();
    } catch (er) {
      console.log(er);
    }
  }
  if (params) {
    brokers = params.broker;
  }

  // const defaultBrokers = ['fivepaisa', 'aliceblue', 'axis', 'edel', 'hdfc', 'iifl', 'kite', 'trustline', 'upstox'];
  let selectedBroker = [];
  if (brokers) {
    selectedBroker = brokers.split(',');
  }
  const status = useScript('https://gateway.smallcase.com/scdk/2.0.0/scdk.js');
  const smallcaseRef = React.useRef(null);

  React.useEffect(() => {
    if (status === 'ready') {
      apolloFetch({
        query,
        variables: {
          transaction: {
            intent: 'CONNECT',
          },
        },
      }).then((response) => {
        console.log('Response from CONNECT intent graphql', response);
        smallcaseRef.current = new window.scDK({
          gateway: 'tejimandi',
          smallcaseAuthToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWVzdCI6dHJ1ZSwiaWF0IjoxNTkzNTg1ODIxfQ.pXSkE7nTRZUojABSi14peHboXkBDcDhpvJlQoSNWKy8',
          config: {
            amo: true,
          },
        });
        if (!isEmpty(response.data.getSmallcaseTransaction)) {
          let { userToken } = response.data.getSmallcaseTransaction;
          const { transactionId } = response.data.getSmallcaseTransaction;
          if (!userToken) {
            userToken = getToken();
          }
          console.log('Broker', selectedBroker);
          const triggerTransactionPayload = {
            transactionId,
            brokers: selectedBroker,
          };

          smallcaseRef.current
            .init({ userData: userToken })
            .then((resp) => {
              console.log('Smallcase Auth Response: ', resp);
              smallcaseRef.current
                .triggerTransaction(
                  triggerTransactionPayload,
                ).then((res) => {
                  console.log('Smallcase Trigger Transaction Response: ', res);
                  if (
                    window.webkit
                    && window.webkit.messageHandlers
                    && window.webkit.messageHandlers.SmallcaseInterface
                    && window.webkit.messageHandlers.SmallcaseInterface.postMessage
                  ) {
                    try {
                      console.log(
                        'window.webkit.messageHandlers.SmallcaseInterface.postMessage',
                        JSON.stringify(res),
                      );
                      window.webkit.messageHandlers.SmallcaseInterface.postMessage(
                        JSON.stringify(res),
                      );
                    } catch (ex) {
                      console.log(ex);
                    }
                  } else if (
                    window.SmallcaseInterface
                    && window.SmallcaseInterface.postMessage
                  ) {
                    try {
                      window.SmallcaseInterface.postMessage(JSON.stringify(res));
                    } catch (ex) {
                      console.log(ex);
                    }
                  }
                }).catch((err) => {
                  console.log('Error in triggerTransaction: ', err);
                  if (
                    window.SmallcaseInterface
                  && window.SmallcaseInterface.closeWindow
                  ) {
                    try {
                      console.log('calling window.SmallcaseInterface.closeWindow');
                      window.SmallcaseInterface.closeWindow();
                    } catch (ex) {
                      console.log(ex);
                    }
                  } else if (
                    window.webkit
                  && window.webkit.messageHandlers
                  && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
                  && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
                    .postMessage
                  ) {
                    try {
                      console.log(
                        'calling window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage',
                      );
                      window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage(
                        '',
                      );
                    } catch (ex) {
                      console.log(ex);
                    }
                  } else {
                    console.log(
                      'Couldnt find window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage or window.SmallcaseInterface.closeWindow',
                    );
                  }
                });
            })
            .catch((error) => {
              console.log('SmallcaseInterfaceCloseWindow.postMessage', error);
              if (
                window.SmallcaseInterface
              && window.SmallcaseInterface.closeWindow
              ) {
                try {
                  console.log('calling window.SmallcaseInterface.closeWindow');
                  window.SmallcaseInterface.closeWindow();
                } catch (ex) {
                  console.log(ex);
                }
              } else if (
                window.webkit
              && window.webkit.messageHandlers
              && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
              && window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow
                .postMessage
              ) {
                try {
                  console.log(
                    'calling window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage',
                  );
                  window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage(
                    '',
                  );
                } catch (ex) {
                  console.log(ex);
                }
              } else {
                console.log(
                  'Couldnt find window.webkit.messageHandlers.SmallcaseInterfaceCloseWindow.postMessage or window.SmallcaseInterface.closeWindow',
                );
              }
            });
        }
      }).catch((e) => {
        console.log('Failed to get CONNECT response', e.message);
      });
    }
    return () => {};
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

Invest.propTypes = {};

export default Invest;
