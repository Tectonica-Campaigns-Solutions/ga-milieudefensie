import React from 'react';
import Cta from '../../Global/Cta/Cta';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate } from '../../../utils';
import TagList from '../../Global/Tag/TagList';

import './styles.scss';

const EventCard = ({ event, isHighlighted = false }) => {
  const { title, introduction, image, date, hourStart, hourEnd, tags = [] } = event;

  return (
    <div className={`event-card ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="metadata">
        {date && <span className="date">{formatDate(date)}</span>}

        <div className="venue">
          <span>
            {hourStart}-{hourEnd}
          </span>

          <span>Venue Information</span>
        </div>

        {Array.isArray(tags) && <TagList tags={tags} />}
      </div>

      <div className="basic-info">
        {title && <h4>{title}</h4>}
        {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
        <Cta cta={{ ...event, title: 'Go to Event Page', isButton: true }} />
      </div>

      {image && (
        <div className="image">
          <ImageWrapper image={image} />
        </div>
      )}
    </div>
  );
};

export default EventCard;
