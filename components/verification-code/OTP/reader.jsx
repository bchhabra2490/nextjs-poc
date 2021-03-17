import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import useOTP from './hooks/useOTP';
import useStyles from './styles';

const OtpInput = ({ numberOfInput, onChange, disabled }) => {
  const classes = useStyles();
  const {
    activeInput,
    currentValue,
    handleChange,
    handleKeypress,
    handlePaste,
    handleInputFocus
  } = useOTP({
    onChange,
    numberOfInput
  });

  const renderInputs = useMemo(() => Array.from({ length: 6 }).map((item, index) => (
    <Input
      // eslint-disable-next-line react/no-array-index-key
      key={(index)}
      focus={activeInput === index}
      value={currentValue && currentValue[index]}
      onChange={handleChange}
      onKeyDown={handleKeypress}
      onPaste={handlePaste}
      disabled={disabled}
      onFocus={() => handleInputFocus(index)}
    />
  )), [
    activeInput,
    currentValue,
    handleChange,
    handleKeypress,
    handlePaste,
    handleInputFocus
  ]);

  return <div className={classes.container}>{renderInputs}</div>;
};

OtpInput.propTypes = {
  numberOfInput: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

OtpInput.defaultProps = {
  numberOfInput: 6,
  onChange: () => {},
  disabled: false
};

export default OtpInput;
