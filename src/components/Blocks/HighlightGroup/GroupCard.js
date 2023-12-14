import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import CtaList from '../../Global/Cta/CtaList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const GroupCard = ({ group }) => {
  console.log({ group });
  const { title, image, cta = [] } = group;

  return (
    <div className="group-card">
      {image && (
        <div className="image">
          <ImageWrapper image={image} />
        </div>
      )}

      <div className="content">
        <div>
          {title && (
            <h3>
              <Link to={group}>{title}</Link>
            </h3>
          )}
        </div>

        {Array.isArray(cta) && <CtaList ctas={cta} />}
      </div>
    </div>
  );
};

export default GroupCard;
