import React from 'react';
import queryString from 'query-string';
import { createApolloFetch } from 'apollo-fetch';
import {
  CircularProgress,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

import useScript from '../../components/hooks/useScript';

const OpenDemat = () => {
  const status = useScript('https://gateway.smallcase.com/scdk/2.0.0/scdk.js');
  const smallcaseRef = React.useRef(null);
  if (typeof window !== 'undefined') {
    try {
      window.fcWidget.hide();
    } catch (er) {
      console.log(er);
    }
  }
  const startDematFlow = (userDetails) => {
    smallcaseRef.current.signup(userDetails).then(() => {
      console.log('signup flow has now ended');
      const x = document.createElement('P'); // Create a <p> node
      const t = document.createTextNode('Press back to go to App.'); // Create a text node
      x.appendChild(t);
      x.style.fontWeight = 'bold';
      document.getElementById('back-text').appendChild(x);
      document.getElementById('loading').style.display = 'none';
    }).catch((e) => {
      console.log(e.message);
      const x = document.createElement('P'); // Create a <p> node
      const t = document.createTextNode('An error occurred. Press back to go to App.'); // Create a text node
      x.appendChild(t);
      x.style.fontWeight = 'bold';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('back-text').appendChild(x);
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
        const userDetails = {
          name: params.name,
          email: params.email,
          contact: params.contact,
          pinCode: params.pinCode,
        };
        startDematFlow(userDetails);
      } catch (e) {
        console.log(e.message);
      }
    }
    return () => {};
  }, [status]);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '600px',
    }}
    >
      <CircularProgress
        id="loading"
        width={20}
        height={20}
      />
      <div id="back-text" />
    </div>
  );
};

OpenDemat.propTypes = {};

export default OpenDemat;
