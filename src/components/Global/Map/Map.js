import React, { useEffect, useRef, useState } from 'react';
import { clusterLayer, clusterCountLayer } from './layers';
import { Map, Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import GroupMarker from './Marker/GroupMarker';
import CustomMarker from './Marker/Marker';
import MapPopup from './MapPopup/MapPopup';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const MapWrapper = ({ title, data = [], type = 'event', mobileView = false, setMobileView }) => {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (window) {
      const scrollToTop = () => window.scrollTo({ top: 0 });
      scrollToTop();
    }
    mapRef.current?.resize();
  }, [mobileView]);

  const pins = data
    .filter((e) => e.coordinates && e.coordinates.latitude && e.coordinates.longitude)
    .map((e) => ({
      type: 'Feature',
      properties: {
        id: e.id,
        title: e.title,
        date: e.date,
        hourStart: e.hourStart,
        hourEnd: e.hourEnd,
        address: e.address,
        image: e.image,
        tags: e.tags || [],
        type: e.type,
        url: e.url,
        slug: e.slug,
      },
      geometry: {
        type: 'Point',
        coordinates: [e.coordinates.longitude, e.coordinates.latitude],
      },
    }));

  const onClickCluster = (event) => {
    const feature = event.features[0];
    if (!feature) return;

    const clusterId = feature.properties.cluster_id;
    const mapboxSource = mapRef.current.getSource('pins');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }
      mapRef.current.easeTo({ center: feature.geometry.coordinates, zoom, duration: 500 });
    });
  };

  return (
    <div className={`map-wrapper ${mobileView ? 'mobile' : ''}`}>
      {title && <h3>{title}</h3>}

      <div className="map">
        <div className="pre-header">
          <div className="container">
            <div className="action" onClick={() => setMobileView((prev) => !prev)}>
              <span>←</span>
              <span>{type === 'event' ? 'Bekijk lijst' : 'Bekijk lijst'}</span>
            </div>
          </div>
        </div>

        <Map
          ref={mapRef}
          initialViewState={{ latitude: 52.25, longitude: 4.9041, zoom: 6.65 }}
          mapStyle="mapbox://styles/martinalv/clptudeob00ub01p74jlnbdce"
          mapboxAccessToken={
            'pk.eyJ1IjoibWFydGluYWx2IiwiYSI6ImNscHR1YjdvZDBlY2sybHBnNTRwM2l4ZTEifQ.nn8C3qy8ULBkq6gdO3vlCg'
          }
          interactive
          interactiveLayerIds={[clusterLayer.id]}
          scrollZoom={false}
        >
          <Source
            id="pins"
            type="geojson"
            data={{ type: 'FeatureCollection', features: pins }}
            cluster={false}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />

            {/* Pins */}
            {pins.map((e) => (
              <Marker
                key={e.properties.id}
                longitude={e.geometry.coordinates[0]}
                latitude={e.geometry.coordinates[1]}
                onClick={() => setSelectedMarker(e)}
                anchor="bottom"
              >
                {type === 'group' ? <GroupMarker /> : <CustomMarker />}
              </Marker>
            ))}

            {/* Popup */}
            {selectedMarker && (
              <Popup
                key={selectedMarker.properties.id}
                longitude={selectedMarker.geometry.coordinates[0]}
                latitude={selectedMarker.geometry.coordinates[1]}
                closeOnClick={false}
                onClose={() => setSelectedMarker(null)}
              >
                <MapPopup card={selectedMarker.properties} />
              </Popup>
            )}

            <NavigationControl position="bottom-right" />
          </Source>
        </Map>
      </div>
    </div>
  );
};

export default MapWrapper;
