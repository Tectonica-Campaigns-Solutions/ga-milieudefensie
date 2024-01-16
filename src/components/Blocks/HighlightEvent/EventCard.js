import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const EventCard = ({ event, isHighlighted = false }) => {
  const { title, introduction, image, date, address, hourStart, hourEnd, tags = [], type, url } = event;
  const isCslEvent = type === 'INTERNATIONAL';

  const renderContent = () => (
    <>
      <div className="metadata">
        {date && <span className="date">{formatDate(date)}</span>}

        <div className="venue">
          <span>
            {hourStart} {hourEnd ? `- ${hourEnd}` : ''}
          </span>

          {address && <span>{address}</span>}
        </div>

        {Array.isArray(tags) && tags.length > 0 ? <TagList tags={tags} /> : <div className="tags-list" />}
      </div>

      <div className="basic-info">
        {title && <h4>{title}</h4>}
        {introduction && (
          <div className="introduction" dangerouslySetInnerHTML={{ __html: truncateText(introduction, 200) }} />
        )}

        <span className="custom-btn custom-btn-primary">Go to Event Page</span>
      </div>

      {(image.gatsbyImageData || image.url) && (
        <div className="image">
          <ImageWrapper image={image} />
        </div>
      )}
    </>
  );

  if (isCslEvent) {
    return (
      <Link to={'/csl-event/' + event.slug} className={`event-card ${isHighlighted ? 'highlighted' : ''}`}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <Link to={event} className={`event-card ${isHighlighted ? 'highlighted' : ''}`}>
      {renderContent()}
    </Link>
  );
};

export default EventCard;
