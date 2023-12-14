import React from 'react';
import './styles.scss';
import TagList from '../../Tag/TagList';
import ImageWrapper from '../../Image/ImageWrapper';
import { formatDate } from '../../../../utils';
import Cta from '../../Cta/Cta';

const MapPopup = ({ event, handleOnClosePopUp }) => {
  const { title, date, hourStart, hourEnd, address, image, tags } = event;

  return (
    <article className="map-popup">
      {/* Close icon */}
      <div className="close-icon" onClick={handleOnClosePopUp}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path
            d="M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z"
            fill="#141414"
          />
        </svg>
      </div>

      <div className="tags">
        <TagList tags={tags} />
      </div>

      <div className="image">
        <ImageWrapper image={image} />
      </div>

      <div className="metadata">
        <h5>
          {formatDate(date)} | {hourStart} {hourEnd ? ` - ${hourEnd}` : ''}
        </h5>

        {address && <span>{address}</span>}
      </div>

      <h2>{title}</h2>

      <Cta cta={{ ...event, title: 'Go to Event Page', isButton: true }} />
    </article>
  );
};

export default MapPopup;
