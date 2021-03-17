import React, { memo, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const PhoneNumber = ({ phoneNumberRef }) => {
  const classes = useStyles();
  const phoneNumber = '(091) 987654321';
  useLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    phoneNumberRef.current = null;
  }, []);
  return (
    <div className={classes.titleContainer}>
      <Typography
        variant="h4"
        component="h4"
        className={classes.title}
        align="center"
      >
        Enter OTP
      </Typography>
      <Typography variant="body1" component="p" align="center" className={classes.paragraph}>
        Enter the verification code sent to
        {' '}
        <b>{phoneNumber}</b>
      </Typography>
    </div>
  );
};

PhoneNumber.propTypes = {
  phoneNumberRef: PropTypes.instanceOf(Object),
};

PhoneNumber.defaultProps = {
  phoneNumberRef: {},
};

export default memo(PhoneNumber);
