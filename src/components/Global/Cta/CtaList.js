import React from 'react';
import Cta from './Cta';

import './index.scss';

const CtaList = ({ ctas = [], textStyle = false, customVariant = null }) => {
  if (!ctas || ctas.length === 0) return null;

  return (
    <div className="ctas">
      {ctas.map((cta, index) => (
        <Cta key={cta.id ?? `cta-${index}`} cta={cta} textStyle={textStyle} customVariant={customVariant} />
      ))}
    </div>
  );
};

export default CtaList;
