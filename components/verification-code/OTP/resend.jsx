import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import useResend from './hooks/resend';
import useStyles from './styles';

const Resend = ({
  maxTime,
  timeInterval,
  onTimerComplete,
  onResendClick,
  onClose
}) => {
  const classes = useStyles();
  const { remainingTime, handelResendClick } = useResend({
    maxTime,
    onTimerComplete,
    timeInterval,
    onResendClick
  });
  return (
    <div className={classes.timerContainer}>
      <Button className={classes.textButton} color="primary" onClick={onClose}>
        Wrong number
      </Button>
      <div className={classes.timeContainer}>
        {remainingTime !== 0 && (
        <Typography variant="body1" component="time" align="center" className={classes.time}>
          {`${remainingTime} sec`}
        </Typography>
        )}
        <Button
          disabled={remainingTime !== 0}
          onClick={handelResendClick}
          className={classes.resendButton}
        >
          Resend PIN
        </Button>
      </div>
    </div>
  );
};

Resend.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  onClose: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number
};

Resend.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  onClose: () => {},
  onTimerComplete: () => {},
  onResendClick: () => {}
};

export default memo(Resend);
