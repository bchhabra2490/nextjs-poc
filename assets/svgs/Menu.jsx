import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ classname }) => (
  <svg
    className={classnames('svg-root iconSize', classname)}
    focusable="false"
    viewBox="0 0 344.339 344.339"
    aria-hidden="true"
    role="presentation"
  >
    <rect y="46.06" width="344.339" height="29.52" />
    <rect y="156.506" width="344.339" height="29.52" />
    <rect y="268.748" width="344.339" height="29.531" />
  </svg>
);

Menu.propTypes = {
  classname: PropTypes.string,
};

Menu.defaultProps = {
  classname: '',
};

export default Menu;
