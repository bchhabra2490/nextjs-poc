import React from 'react';
import AppInfo from './AppInfo';
import AppLogo from './AppLogo';
import Subscribe from './Subscribe';

const SectionTop = () => (
  <div className="section-top-container">
    <AppLogo />
    <Subscribe />
    <AppInfo />
  </div>
);

SectionTop.propTypes = {};

export default SectionTop;
