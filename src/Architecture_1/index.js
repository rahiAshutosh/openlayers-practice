import React, { useState, useMemo, createContext, useRef } from "react";
import Map from "./Map";
import { Layers, TileLayer, DrawLayer } from "./Layers";
import { fromLonLat } from "ol/proj";
import * as olSource from "ol/source";
import "../App.css";
import "antd/dist/antd.css";
import "ol/ol.css";
import Toolbar from "./Toolbar";
import TranslateModifyConfig from "./Interactions/TranslateModifyConfig/index";
import LayerSwitch from "./LayerSwitch";
import { Vector as VectorSource } from "ol/source";
import {
  GMAP_BASELAYERS,
  INITIAL_COORDINATES,
  INITIAL_ZOOM,
} from "../constants";

export const CurrentLayerContext = createContext();

/**
 * Main App Component
 * @component
 */
const Architecture1 = () => {
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
          <TranslateModifyConfig>
            <Toolbar drawSource={drawSource} />
          </TranslateModifyConfig>
        </CurrentLayerContext.Provider>
        <LayerSwitch />
        {/* <Explore /> */}
      </Map>
    </div>
  );
};

export default Architecture1;
