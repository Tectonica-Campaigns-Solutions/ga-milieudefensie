import React from 'react';
import Cta from '../../Global/Cta/Cta';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate } from '../../../utils';
import TagList from '../../Global/Tag/TagList';

import './styles.scss';

const EventCard = ({ event }) => {
  const { title, introduction, image, date, tags = [] } = event;

  return (
    <div className="event-card">
      <div className="metadata">
        {date && <span className="date">{formatDate(date)}</span>}
        <span className="venue">Venue Information</span>
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
