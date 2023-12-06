import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import CtaList from '../../Global/Cta/CtaList';
import { ReactSVG } from 'react-svg';

import './styles.scss';

const ToolCard = ({ tool }) => {
  const { title, introduction, image, icon, cta = [] } = tool;

  return (
    <div className="tool-card">
      {image && (
        <div className="image">
          <ImageWrapper image={image} />
        </div>
      )}

      <div className="content">
        <div>
          {icon?.url && (
            <div className="icon">
              <ReactSVG src={icon.url} />
            </div>
          )}
          {title && <h3>{title}</h3>}
          {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
        </div>

        {Array.isArray(cta) && <CtaList ctas={cta} />}
      </div>
    </div>
  );
};

export default ToolCard;
