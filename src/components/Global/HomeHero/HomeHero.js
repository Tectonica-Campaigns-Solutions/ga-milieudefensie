import React from 'react';
import './index.scss';

function HomeHero({ title, subtitle, image }) {
  const heroBgImage = image?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className="hero-home" style={{ backgroundImage: `url(${heroBgImage})` }}>
      <div className="container">
        {title && (
          <h1 className="text-with-border-color">
            <span>{title}</span>
          </h1>
        )}

        {subtitle && <div className="introduction" dangerouslySetInnerHTML={{ __html: subtitle }} />}
      </div>
    </div>
  );
}

export default HomeHero;
