import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../Map/MapContext";
import List from "./List";

/**
 * Layer specific controls
 * @component
 */
const LayerSwitch = React.memo(() => {
  const mapLayers = useRef(null);
  const [layers, setLayers] = useState([]);
  const { map } = useContext(MapContext);

  /**
   * Update the layers in the state as per map layers changes
   * @function
   */
  const updateLayers = () => {
    mapLayers.current = map.getLayers();
    setLayers([
      ...mapLayers.current
        .getArray()
        .filter((layer) => layer.getZIndex() !== 0),
    ]);
  };

  useEffect(() => {
    if (map) {
      if (!layers.length) updateLayers(); // Initialise base layer
      mapLayers.current.on(
        ["propertychange", "change", "change:visible"],
        updateLayers
      );
    }
    // eslint-disable-next-line
  }, [map]);

  return (
    <div className="layer-switch">
      <div className="heading">LAYERS ({layers && layers.length})</div>
      <List layers={layers} updateLayers={updateLayers} />
    </div>
  );
});

export default LayerSwitch;
