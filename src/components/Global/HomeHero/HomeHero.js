import React from 'react';
import './index.scss';

function HomeHero({ title, subtitle, image }) {
  const heroBgImage = image?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className="wrapper-hero">
      <div className="hero-home" style={{ backgroundImage: `url(${heroBgImage})` }}>
        <div className="content">
          {title && <h1>{title}</h1>}
          {subtitle && <div className="introduction" dangerouslySetInnerHTML={{ __html: subtitle }} />}

          {/* Form here */}
        </div>

        <div className="overlay" />
      </div>
    </div>
  );
}

export default HomeHero;
