import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const Input = ({
  focus,
  autoFocus,
  disabled,
  value,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  onBlur
}) => {
  const classes = useStyles();
  const input = useRef(null);
  const componentMounted = useRef(false);
  useEffect(() => {
    if (autoFocus && focus) {
      input.current.focus();
    }
  }, [focus, autoFocus]);

  useEffect(() => {
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
  }, [focus]);

  return (
    <input
      className={classes.input}
      maxLength="1"
      ref={input}
      type="tel"
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

Input.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
  onFocus: PropTypes.func,
};
Input.defaultProps = {
  value: '',
  focus: false,
  autoFocus: false,
  disabled: false,
  onChange: () => {},
  onKeyDown: () => {},
  onBlur: () => {},
  onPaste: () => {},
  onFocus: () => {},
};
export default React.memo(Input);
