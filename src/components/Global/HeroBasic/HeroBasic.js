import React from 'react';
import './index.scss';

function HeroBasic({ title, image = null, backgroundColor = null }) {
  return (
    <div
      className={`hero-basic ${backgroundColor ? backgroundColor : ''}}`}
      style={{ backgroundImage: image ? `url(${image})` : undefined }}
    >
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeroBasic;
