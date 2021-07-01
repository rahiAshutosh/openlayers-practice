import React from "react";
import Style from "ol/style/Style";
import { HuePicker } from "react-color";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { Slider } from "antd";
import {
  DEFAULT_FILL_OPACITY,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
} from "../constants";
import { useState } from "react";
import { defaultDrawStyles } from "../store";

/**
 * For styling (fill, stroke) of the layer
 * @component
 */
const StyleLayer = ({ layer }) => {
  const [strokeColor, setStrokeColor] = useState(DEFAULT_STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
  const [fillOpacity, setFillOpacity] = useState(DEFAULT_FILL_OPACITY);

  const handleChangeStrokeColor = (color) => {
    setStrokeColor(color);
    updateStyle({ color });
  };

  const handleChangeStrokeWidth = (width) => {
    setStrokeWidth(width);
    updateStyle({ width });
  };

  const handleChangeFillOpacity = (opacity) => {
    setFillOpacity(opacity);
    updateStyle({ opacity });
  };

  const updateStyle = (config = {}) => {
    const { color, width, opacity } = config;
    const { rgb } = color || strokeColor;
    const { r, g, b, a } = rgb;
    const style = new Style({
      stroke: new Stroke({
        color: `rgba(${r},${g},${b},${a})`,
        width: width || strokeWidth,
      }),
      fill: new Fill({
        color: `rgba(${r},${g},${b},${opacity || fillOpacity})`,
      }),
    });
    layer
      .getSource()
      .getFeatures()
      .forEach((feature) => {
        feature.setStyle(style);
      });
    if (layer.get("name") === "Draw Layer") {
      defaultDrawStyles.change("strokeColor", color || strokeColor);
      defaultDrawStyles.change("strokeWidth", width || strokeWidth);
      defaultDrawStyles.change("fillOpacity", opacity || fillOpacity);
    }
  };

  const sliderContainerStyle = { margin: "0" };
  const sliderStyle = {
    background: strokeColor.hex,
    border: `2px solid ${strokeColor.hex}`,
  };

  return (
    <div className="layer-style">
      <div className="layer-style-label mt-0">Color Picker</div>
      <HuePicker
        color={strokeColor}
        onChangeComplete={handleChangeStrokeColor}
      />
      <div className="layer-style-label">Stroke Width</div>
      <Slider
        min={1}
        max={50}
        step={1}
        value={strokeWidth}
        style={sliderContainerStyle}
        trackStyle={sliderStyle}
        handleStyle={sliderStyle}
        onChange={handleChangeStrokeWidth}
      />
      <div className="layer-style-label">Fill Opacity</div>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={fillOpacity}
        style={sliderContainerStyle}
        trackStyle={sliderStyle}
        handleStyle={sliderStyle}
        onChange={handleChangeFillOpacity}
      />
    </div>
  );
};

export default StyleLayer;
