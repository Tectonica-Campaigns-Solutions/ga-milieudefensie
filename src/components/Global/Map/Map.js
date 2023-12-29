import React, { useEffect, useRef } from 'react';
import { createMapMarkers, createMapReference } from './utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const Map = ({ title, data = [], type = 'event', mobileView = false, setMobileView }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // 4, 51
    const map = createMapReference(mapContainerRef, [5.6, 52.1], 20, 5, 6.9, true);

    const pins = data
      .filter((e) => e.coordinates && e.coordinates.latitude && e.coordinates.longitude)
      .map((e) => ({
        ...e,
        coordinates: [e.coordinates.longitude, e.coordinates.latitude],
      }));

    createMapMarkers(map, pins, type);

    return () => map.remove();
  }, [data]);

  return (
    <div className={`map-wrapper ${mobileView ? 'mobile' : ''}`}>
      {title && <h3>{title}</h3>}

      <div className="map">
        {/* Pre-header */}
        <div className="pre-header">
          <div className="container">
            <div className="action" onClick={() => setMobileView((prev) => !prev)}>
              <span>←</span>
              <span>List {type === 'event' ? 'Events' : 'Local Groups'}</span>
            </div>
          </div>
        </div>

        <div ref={mapContainerRef} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
