import React from 'react';
import './styles.scss';

// Variant options: white, light
const WrapperLayout = ({ variant, children }) => {
  return <div className={`wrapper-layout ${variant}`}>{children}</div>;
};

export default WrapperLayout;
