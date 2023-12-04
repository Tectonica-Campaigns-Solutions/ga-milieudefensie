import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './index.scss';

function HeroBasic({ title, image = null, imageMobile = null, imageAlignment = null, backgroundColor = null }) {
  return (
    <div
      className={`hero-basic ${backgroundColor?.textContrast ? 'text-contrast' : ''} ${
        imageAlignment ? imageAlignment : ''
      }`}
      style={{ backgroundColor: backgroundColor ? backgroundColor.color.hex : '' }}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb textWhite currentPage={title} />

            <h1 className="text-with-border-color">
              <span>{title}</span>
            </h1>
          </div>
        </div>

        {/* Images */}
        {image && <img className="col-image-desktop" src={image.gatsbyImageData.images.fallback.src} />}
        {imageMobile && <img className="col-image-mobile" src={imageMobile.gatsbyImageData.images.fallback.src} />}
      </div>
    </div>
  );
}

export default HeroBasic;
