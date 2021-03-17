import React from 'react';
import PropTypes from 'prop-types';

const Facebook = ({ classname }) => (
  <svg className="svg-root iconSize" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1">
    <title>Facebook-color</title>
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"><path d="M225.638 208H202.65a2.65 2.65 0 0 1-2.649-2.65v-42.7a2.649 2.649 0 0 1 2.65-2.65h42.701a2.649 2.649 0 0 1 2.649 2.65v42.7a2.65 2.65 0 0 1-2.649 2.65h-12.232v-18.588h6.24l.934-7.244h-7.174v-4.625c0-2.098.583-3.527 3.59-3.527l3.836-.002v-6.479c-.663-.088-2.94-.285-5.59-.285-5.53 0-9.317 3.376-9.317 9.575v5.343h-6.255v7.244h6.255V208z" id="Facebook" /></g></g>
  </svg>
);

Facebook.propTypes = {
  classname: PropTypes.string,
};

Facebook.defaultProps = {
  classname: '',
};

export default Facebook;
