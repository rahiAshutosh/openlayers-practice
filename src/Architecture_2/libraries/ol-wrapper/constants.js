import GeometryType from "ol/geom/GeometryType";

const INITIAL_ZOOM = 1;

const INITIAL_CENTER = [0,0];

const SHAPES_TO_DRAW = [
  {
    type: GeometryType.POLYGON,
    tooltipTitle: 'Draw Polygon',
    iconClassName: 'fas fa-draw-polygon'
  },
  {
    type: GeometryType.POINT,
    tooltipTitle: 'Draw Point',
    iconClassName: 'fas fa-map-marker-alt'
  },
  {
    type: GeometryType.LINE_STRING,
    tooltipTitle: 'Draw Line',
    iconClassName: 'fas fa-wave-square'
  },
];

export {
  INITIAL_ZOOM,
  INITIAL_CENTER,
  SHAPES_TO_DRAW,
};