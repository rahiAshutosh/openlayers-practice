import React from "react";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
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
import { useDebouncedCallback } from 'use-lodash-debounce';

/**
 * For styling (fill, stroke) of the layer
 * @component
 */
const StyleLayer = React.memo(({ layer }) => {
  const [strokeColor, setStrokeColor] = useState(DEFAULT_STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH);
  const [fillOpacity, setFillOpacity] = useState(DEFAULT_FILL_OPACITY);

  const handleChangeStrokeColor = useDebouncedCallback((color) => {
    setStrokeColor(color);
    updateStyle({ color });
  }, 0);

  const handleChangeStrokeWidth = (width) => {
    setStrokeWidth(width);
    updateStyle({ width });
  };

  const handleChangeFillOpacity = (opacity) => {
    setFillOpacity(opacity);
    updateStyle({ opacity });
  };

  const updateStyle = (config = {}) => {
    const { color = strokeColor, width = strokeWidth, opacity = fillOpacity } = config;
    const { rgb } = color;
    const { r, g, b, a } = rgb;
    const fill = new Fill({
      color: `rgba(${r},${g},${b},${opacity})`,
    });
    const stroke = new Stroke({
      color: `rgba(${r},${g},${b},${a})`,
      width,
    });
    const style = new Style({
      stroke,
      fill,
      image: new Icon({
        size: [100, 100],
        src: process.env.PUBLIC_URL + '/Images/marker.png',
        offset: [0, 0],
        opacity: 1,
        scale: 0.3,
      })
    });
    layer.setStyle(style);
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
        onChange={handleChangeStrokeColor}
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
});

export default StyleLayer;
