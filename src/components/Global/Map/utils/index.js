import React from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from '!mapbox-gl';
import Marker from '../Marker/Marker';
import ReactDOMServer from 'react-dom/server';
import MapPopup from '../MapPopup/MapPopup';
import GroupMarker from '../Marker/GroupMarker';

const { Popup } = mapboxgl;

export const createMapReference = (ref, coordinates, maxZoom, minZoom, zoom, interactive = false) => {
  return new mapboxgl.Map({
    container: ref.current,
    accessToken: 'pk.eyJ1IjoibWFydGluYWx2IiwiYSI6ImNscHR1YjdvZDBlY2sybHBnNTRwM2l4ZTEifQ.nn8C3qy8ULBkq6gdO3vlCg',
    style: 'mapbox://styles/martinalv/clptudeob00ub01p74jlnbdce',
    center: coordinates,
    interactive: interactive,
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoom: zoom,
  });
};

export const createMapMarkers = (mapRef, pins, type) => {
  mapRef.on('load', () => {
    mapRef.addSource('countries', { type: 'vector', url: 'mapbox://mapbox.country-boundaries-v1' });

    for (const pin of pins) {
      const markerElement = document.createElement('div');
      const root = createRoot(markerElement);
      root.render(type === 'group' ? <GroupMarker /> : <Marker />);

      // Create a Mapbox Marker at our new DOM node
      const marker = new mapboxgl.Marker(markerElement).setLngLat(pin.coordinates).addTo(mapRef);

      // Add a Popup to the marker
      const popupContent = ReactDOMServer.renderToString(
        <MapPopup card={pin} linkTitle={type === 'group' ? 'Go to Group Page' : 'Go to Event Page'} />
      );
      const popup = new Popup({ offset: 25 }).setHTML(popupContent);
      marker.setPopup(popup);
    }
  });
};
