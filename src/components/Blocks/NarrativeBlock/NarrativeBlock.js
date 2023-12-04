import React from 'react';
import { isArray } from '../../../utils';
import CtaList from '../../Global/Cta/CtaList';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import VideoPlayer from '../../Global/VideoPlayer/VideoPlayer';

import './index.scss';

export default function NarrativeBlock({ block, anchor = null }) {
  const {
    alignment,
    preTitle,
    title,
    textContent,
    ctas,
    image,
    imageMobile,
    backgroundImage,
    floatingImage,
    logo,
    video,
    backgroundColor,
  } = block;

  const hasBackgroundImage = Boolean(backgroundImage);
  const backgroundImageUrl = hasBackgroundImage ? backgroundImage.gatsbyImageData.images.fallback.src : '';
  const renderFloatingImage = !image && backgroundImage && floatingImage;
  const isAlignmentTopCenter = alignment === 'top-center';

  const renderTopCenterContent = () => {
    return (
      <div className="top-center">
        <div>
          {image && <ImageWrapper image={image} />}
          {backgroundImage && <img className="top-image" src={backgroundImageUrl} alt="Floating bg image" />}
        </div>

        <h2>
          {preTitle && <span>{preTitle}</span>}
          {title && <span>{title}</span>}
        </h2>

        {textContent && (
          <div
            className={`text-content ${!isArray(ctas) ? 'mb-0' : ''}`}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}

        {isArray(ctas) && <CtaList ctas={ctas} textStyle />}
      </div>
    );
  };

  return (
    <div
      className={`component-narrative-block ${backgroundColor ? backgroundColor : ''} ${
        renderFloatingImage ? '' : 'default-container'
      }`}
      id={`section-${anchor}`}
      style={isAlignmentTopCenter ? null : hasBackgroundImage ? { backgroundImage: `url(${backgroundImageUrl})` } : {}}
    >
      <div className={`container`}>
        {isAlignmentTopCenter ? (
          <>{renderTopCenterContent()}</>
        ) : (
          <div className={`row ${alignment === 'left' ? 'flex-row-reverse' : ''} `}>
            <div className={`col-lg-6 main-content col-sm-order-1 ${renderFloatingImage ? '' : 'default'}`}>
              {logo && <img className="logo" src={logo.url} alt={logo.alt ?? 'Logo icon'} />}

              <h2>
                {preTitle && <span>{preTitle}</span>}
                {title && <span>{title}</span>}
              </h2>

              {textContent && (
                <div
                  className={`text-content ${!isArray(ctas) ? 'mb-0' : ''}`}
                  dangerouslySetInnerHTML={{ __html: textContent }}
                />
              )}

              {isArray(ctas) && <CtaList ctas={ctas} textStyle />}
            </div>

            {/* Render image  */}
            {!renderFloatingImage && (image || video) && (
              <div
                className={`img-wrapper-nb col-lg-5 mt-5 mt-lg-0 col-sm-order-2 ${
                  alignment === 'right' ? 'offset-lg-1  mt-5 mt-lg-0' : ''
                }`}
              >
                {video ? (
                  <VideoPlayer video={video} />
                ) : image ? (
                  <div>
                    <ImageWrapper image={image} imageMobile={imageMobile} objectFit="contain" />
                  </div>
                ) : null}
              </div>
            )}

            {/* Floating image */}
            {renderFloatingImage && floatingImage && (
              <div
                className="col-lg-5 col-floating-image"
                style={
                  isAlignmentTopCenter
                    ? null
                    : hasBackgroundImage
                      ? { backgroundImage: `url(${backgroundImageUrl})` }
                      : {}
                }
              >
                <div className="floating-image">
                  <ImageWrapper image={floatingImage} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
