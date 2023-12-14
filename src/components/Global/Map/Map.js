import React, { useEffect, useRef } from 'react';
import { createMapMarkers, createMapReference } from './utils';
import MapPopup from './MapPopup/MapPopup';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const Map = ({ events = [], onClickMarker }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = createMapReference(mapContainerRef, [4, 51], 8.85, 1.99, 5, true);

    // Markers
    const pins = events
      .filter((e) => e.coordinates)
      .map((e) => ({
        coordinates: [e.coordinates.longitude, e.coordinates.latitude],
        onClickMarker: () => onClickMarker(e),
      }));

    createMapMarkers(map, pins);
  }, [events]);

  return (
    <div className="map-wrapper">
      <h3>Evenementen</h3>

      <MapPopup event={events[0]} />

      <div className="map">
        <div ref={mapContainerRef} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
