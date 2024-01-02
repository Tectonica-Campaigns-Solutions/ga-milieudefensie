import React, { useEffect, useState } from 'react';
import './index.scss';

function HomeHero({ title, subtitle, image, mobileImage = null }) {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (window) {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const backgroundImage = windowWidth <= 767 ? mobileImage : image;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className="wrapper-hero">
      <div className="hero-home" style={{ backgroundImage: `url(${bgImageUrl})` }}>
        <div className="container">
          <div className="content">
            {title && <h1>{title}</h1>}
            {subtitle && <div className="introduction" dangerouslySetInnerHTML={{ __html: subtitle }} />}

            {/* Form here */}
          </div>
        </div>

        <div className="overlay" />
      </div>
    </div>
  );
}

export default HomeHero;
