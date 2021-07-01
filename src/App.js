import React, { useState, useMemo, createContext, useRef } from "react";
import Map from "./Map";
import { Layers, TileLayer, DrawLayer } from "./Layers";
import { fromLonLat } from "ol/proj";
import * as olSource from "ol/source";
import "./App.css";
import "antd/dist/antd.css";
import "ol/ol.css";
import Toolbar from "./Toolbar";
import LayerSwitch from "./LayerSwitch";
import { Vector as VectorSource } from "ol/source";
// import Explore from "./Map/Explore";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeometryType from "ol/geom/GeometryType";
import {
  GMAP_BASELAYERS,
  INITIAL_COORDINATES,
  INITIAL_ZOOM,
} from "./constants";
import { defaultDrawStyles } from "./store";

export const CurrentLayerContext = createContext();

/**
 * Main App Component
 * @component
 */
const App = () => {
  const center = useRef(INITIAL_COORDINATES);
  const zoom = useRef(INITIAL_ZOOM);
  const [selectedLayer, setSelectedLayer] = useState("hybrid");

  /**
   * Layer change handler
   * @param {string} layerName - Name of layer being chosen
   */
  const handleChangeLayer = (layerName) => {
    setSelectedLayer(layerName);
  };

  /**
   * Provide source for base layer as per user choice
   * @function
   */
  const getSource = useMemo(() => {
    return new olSource.XYZ({
      url: GMAP_BASELAYERS[selectedLayer],
    });
  }, [selectedLayer]);

  const drawSource = new VectorSource({ wrapX: false });

  drawSource.on("addfeature", (event) => {
    const { strokeColor, strokeWidth, fillOpacity } =
      defaultDrawStyles.getAll();
    if (event.feature.getGeometry().getType() !== GeometryType.POINT) {
      const { rgb } = strokeColor;
      const { r, g, b, a } = rgb;
      event.feature.setStyle(
        new Style({
          fill: new Fill({
            color: `rgba(${r},${g},${b},${fillOpacity})`,
          }),
          stroke: new Stroke({
            color: `rgba(${r},${g},${b},${a})`,
            width: strokeWidth,
          }),
        })
      );
      event.feature.setProperties({
        // For exporting these styles to geojson.io as well
        fill: strokeColor.hex,
        stroke: strokeColor.hex,
        "stroke-width": strokeWidth,
        "fill-opacity": fillOpacity,
      });
    }
  });

  /**
   * Context containing the active layer, and callback to change the layer
   */
  const currentLayerContext = {
    selectedLayer,
    handleChangeLayer,
  };

  return (
    <div>
      <Map center={fromLonLat(center.current)} zoom={zoom.current}>
        <Layers>
          <div key={selectedLayer}>
            <TileLayer source={getSource} zIndex={0} />
          </div>
          <DrawLayer source={drawSource} zIndex={1} />
        </Layers>
        <CurrentLayerContext.Provider value={currentLayerContext}>
          <Toolbar drawSource={drawSource} />
        </CurrentLayerContext.Provider>
        <LayerSwitch />
        {/* <Explore /> */}
      </Map>
    </div>
  );
};

export default App;
