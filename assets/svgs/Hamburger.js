import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ classname }) => (
  <svg
    className={classnames('svg-root iconSize', classname)}
    focusable="false"
    width="20"
    height="18"
    viewBox="0 0 20 18"
    aria-hidden="true"
    role="presentation"
  >
    <path
      d="M18.718 2.58974H1.28207C0.573828 2.58974 0 2.01592 0 1.30771C0 0.59951 0.573828 0.0256424 1.28207 0.0256424H18.718C19.4262 0.0256424 20 0.59947 20 1.30771C20 2.01595 19.4262 2.58974 18.718 2.58974Z"
      fill="#00A651"
    />
    <path
      d="M11.5385 10.2821H1.28207C0.573828 10.2821 0 9.70824 0 9.00004C0 8.29184 0.573828 7.71798 1.28207 7.71798H11.5385C12.2467 7.71798 12.8205 8.2918 12.8205 9.00004C12.8205 9.70828 12.2467 10.2821 11.5385 10.2821Z"
      fill="#00A651"
    />
    <path
      d="M18.718 17.9744H1.28207C0.573828 17.9744 0 17.4005 0 16.6923C0 15.9841 0.573828 15.4102 1.28207 15.4102H18.718C19.4262 15.4102 20 15.9841 20 16.6923C20 17.4005 19.4262 17.9744 18.718 17.9744Z"
      fill="#00A651"
    />
  </svg>
);

Menu.propTypes = {
  classname: PropTypes.string,
};

Menu.defaultProps = {
  classname: '',
};

export default Menu;
