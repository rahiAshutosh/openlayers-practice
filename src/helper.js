import GeoJSON from "ol/format/GeoJSON";

/**
 * Export (Download) Vector features as GeoJSON
 * @function
 * @param {array} features - Array of features ([ol.Feature]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Feature-Feature.html})
 * @param {object=} [config={}] - Config Object
 * @param {string=} config.dataProjection - Target Projection
 * @param {string=} config.featureProjection - Existing Features' Projection
 */
const exportVectorFeaturesAsGeoJSON = (features, config={}) => {
  const geoJson = (new GeoJSON()).writeFeaturesObject(features, {
    dataProjection: config.dataProjection || 'EPSG:4326',
    featureProjection: config.featureProjection || 'EPSG:3857'
  });
  geoJson.features.forEach((feature) => {
    if (feature.properties === null) feature.properties = {};
  });
  const geoJsonBlob = new Blob([JSON.stringify(geoJson)], { type: 'application/geo+json' });
  const url = window.URL.createObjectURL(geoJsonBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'map.geojson';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export {
  exportVectorFeaturesAsGeoJSON
};