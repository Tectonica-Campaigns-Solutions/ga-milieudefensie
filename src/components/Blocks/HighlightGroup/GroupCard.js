import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import CtaList from '../../Global/Cta/CtaList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const GroupCard = ({ group }) => {
  const { title, image, cta = [] } = group;
  const showCtas = Array.isArray(cta) && cta.length > 0;

  return (
    <Link to={group} className="group-card">
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

        {showCtas && <CtaList ctas={cta} />}
      </div>
    </Link>
  );
};

export default GroupCard;
