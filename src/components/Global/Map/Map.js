import React, { useEffect, useRef } from 'react';
import { createMapReference } from './utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const Map = ({}) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = createMapReference(mapContainerRef, [10, 15], 8.85, 1.99, 1, true);
  });

  return (
    <div className="map-wrapper">
      <h3>Map Events Headline</h3>

      <div className="map">
        <div ref={mapContainerRef} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
