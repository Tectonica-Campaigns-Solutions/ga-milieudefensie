import React from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from '!mapbox-gl';
import Marker from '../Marker/Marker';
import Card from '../MapPopup/MapPopup';

export const createMapReference = (ref, coordinates, maxZoom, minZoom, zoom, interactive = false) => {
  return new mapboxgl.Map({
    container: ref.current,
    accessToken:
      'pk.eyJ1IjoibWFyY2Vsc2Fmb250dGVjdG9uaWNhIiwiYSI6ImNsZmNjNmN0bTAxMXE0MG56ZWVlaWxnOGEifQ.dSLvNNGEiQQAoW5wbT2mYA',
    style: '',
    center: coordinates,
    interactive: interactive,
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoom: zoom,
  });
};

export const createMapMarkers = (mapRef, pins) => {
  mapRef.on('load', () => {
    mapRef.addSource('countries', { type: 'vector', url: 'mapbox://mapbox.country-boundaries-v1' });

    for (const pin of pins) {
      const markerElement = document.createElement('div');
      const root = createRoot(markerElement);
      root.render(<Marker onClickMarker={pin.onClickMarker} />);

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(markerElement).setLngLat(pin.coordinates).addTo(mapRef);
    }
  });
};
