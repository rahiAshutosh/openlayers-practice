import React, { useEffect, useRef, useState } from "react";
import { mapObj } from "../../libraries/ol-wrapper";
import List from "./List";

/**
 * Layer specific controls
 * @component
 */
const LayerSwitch = React.memo(() => {
  const mapLayers = useRef(null);
  const [layers, setLayers] = useState([]);

  /**
   * Update the layers in the state as per map layers changes
   * @function
   */
  const updateLayers = () => {
    mapLayers.current = mapObj.getLayers();
    setLayers([
      ...mapLayers.current
        .getArray()
        .filter((layer) => layer.getZIndex() !== 0),
    ]);
  };

  useEffect(() => {
    if (mapObj) {
      if (!layers.length) updateLayers(); // Initialise base layer
      mapLayers.current.on(
        ["propertychange", "change", "change:visible"],
        updateLayers
      );
    }
    // eslint-disable-next-line
  }, []);

  if (layers.length > 0) {
    return (
      <div className="layer-switch">
        <div className="heading">LAYERS ({layers && layers.length})</div>
        <List layers={layers} updateLayers={updateLayers} />
      </div>
    );
  } else return null; 
});

export default LayerSwitch;
