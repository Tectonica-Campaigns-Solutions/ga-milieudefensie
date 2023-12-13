import React, { useEffect, useRef } from 'react';
import { createMapMarkers, createMapReference } from './utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const Map = ({ events = [], onClickMarker }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = createMapReference(mapContainerRef, [10, 15], 8.85, 1.99, 1, true);

    // Markers
    const pins = events
      .filter((e) => e.coordinates)
      .map((e) => ({
        coordinates: [e.coordinates.longitude, e.coordinates.latitude],
        onClickMarker: () => onClickMarker(e),
      }));

    createMapMarkers(map, pins);
  });

  return (
    <div className="map-wrapper">
      <h3>Evenementen</h3>

      <div className="map">
        <div ref={mapContainerRef} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
