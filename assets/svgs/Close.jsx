import React from 'react';
import PropTypes from 'prop-types';

const Close = ({ classname }) => (
  <svg
    className="svg-root iconSize"
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

Close.propTypes = {
  classname: PropTypes.string,
};

Close.defaultProps = {
  classname: '',
};

export default Close;
