import mapboxgl from '!mapbox-gl';

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
