import {
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
} from "./constants";

const DefaultDrawStyles = function () {
  let strokeColor = DEFAULT_STROKE_COLOR;
  let strokeWidth = DEFAULT_STROKE_WIDTH;
  let fillOpacity = DEFAULT_FILL_OPACITY;

  this.change = (paramName, value) => {
    switch (paramName) {
      case "strokeColor":
        strokeColor = value;
        break;
      case "strokeWidth":
        strokeWidth = value;
        break;
      case "fillOpacity":
        fillOpacity = value;
        break;
      default:
        break;
    }
  };

  this.get = (paramName) => {
    switch (paramName) {
      case "strokeColor":
        return strokeColor;
      case "strokeWidth":
        return strokeWidth;
      case "fillOpacity":
        return fillOpacity;
      default:
        return null;
    }
  };

  this.getAll = () => ({ strokeColor, strokeWidth, fillOpacity });
};

const defaultDrawStyles = new DefaultDrawStyles();

export { defaultDrawStyles };
