/**
 * Initial center coordinates for the map
 * @constant
 * @type {Array.number}
 * @default
 */
const INITIAL_COORDINATES = [0,0];

/**
 * Initial zoom value for the map
 * @constant
 * @type {!number}
 * @default
 */
const INITIAL_ZOOM = 1;

/**
 * Layer type vs URL mapping object
 * @constant
 * @type {object}
 * @property {string} roadmap - Link for roadmap XYZ Raster Layer
 * @property {string} terrain - Link for terrain XYZ Raster Layer
 * @property {string} alteredRoadmap - Link for alteredRoadmap XYZ Raster Layer
 * @property {string} satelliteOnly - Link for satelliteOnly XYZ Raster Layer
 * @property {string} terrainOnly - Link for terrainOnly XYZ Raster Layer
 * @property {string} hybrid - Link for hybrid XYZ Raster Layer
 */
const GMAP_BASELAYERS = {
  roadmap: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
  terrain: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
  alteredRoadmap: 'http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}',
  satelliteOnly: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
  terrainOnly: 'http://mt0.google.com/vt/lyrs=t&hl=en&x={x}&y={y}&z={z}',
  hybrid: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
};

/**
 * Allowed base layers to choose from
 * @constant
 * @type {Array.<{label: string, value: string}>}
 * @default
 */
const LAYERS = [
  { label: 'Satellite Only', value: 'satelliteOnly' },
  { label: 'Road Map', value: 'roadmap' },
  { label: 'Terrain', value: 'terrain' },
  { label: 'Altered Road Map', value: 'alteredRoadmap' },
  { label: 'Terrain Only', value: 'terrainOnly' },
  { label: 'Hybrid', value: 'hybrid' },
];

const DEFAULT_STROKE_COLOR = { hex: '#ff0000', rgb: { r: 255, g: 0, b: 0, a: 1 } };
const DEFAULT_STROKE_WIDTH = 4;
const DEFAULT_FILL_OPACITY = 0.4;

const DRAW_LAYER_NAME = 'Draw Layer';

const DELETE_KEYCODE = 46;

export {
  INITIAL_COORDINATES,
  INITIAL_ZOOM,
  GMAP_BASELAYERS,
  DEFAULT_STROKE_COLOR,
  LAYERS,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_FILL_OPACITY,
  DRAW_LAYER_NAME,
  DELETE_KEYCODE,
};