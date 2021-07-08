import React, { useState, useMemo, useContext } from "react";
import { Modal } from "antd";
import MapContext from "../Map/MapContext";
import LayerActions from "./LayerActions";

const List = React.memo(({ layers, updateLayers }) => {
  const { map } = useContext(MapContext);
  const [showConfirmRemoveLayer, setShowConfirmRemoveLayer] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);

  /**
   * Show/Hide all layers
   * @function
   */
  const toggleAll = useMemo(() => {
    const areAllOn = layers.every((layer) => layer.getVisible());
    const iconClassName = areAllOn ? "far fa-eye-slash" : "far fa-eye";

    const toggleVisibility = () => {
      layers.forEach((layer) => {
        layer.setVisible(!areAllOn);
      });
      updateLayers();
    };

    return (
      <div className="layer-option">
        <i className={iconClassName} onClick={toggleVisibility} />{" "}
        <em>{areAllOn ? "Hide All Layers" : "Show All Layers"}</em>
      </div>
    );
    // eslint-disable-next-line
  }, [layers]);

  /**
   * Show or hide delete layer popup
   * @param {boolean} [resetActiveLayer=false] - Whether active layer to delete has to be reset
   */
  const toggleDeleteLayer = (resetActiveLayer = false) => {
    setShowConfirmRemoveLayer((v) => !v);
    if (resetActiveLayer) setActiveLayer(null);
  };

  /**
   * Delete a layer
   * @function
   */
  const deleteLayer = () => {
    map.removeLayer(activeLayer);
    toggleDeleteLayer(true);
  };

  /**
   * Shows confirmation popup to delete a layer
   * @function
   */
  const markLayerForDelete = (layer) => {
    setActiveLayer(layer);
    toggleDeleteLayer();
  };

  return (
    <>
      {toggleAll}
      {layers.length > 0 &&
        layers.map((layer, index) => {
          return (
            <LayerActions
              key={layer.get("name")}
              layer={layer}
              updateLayers={updateLayers}
              markLayerForDelete={markLayerForDelete}
            />
          );
        })}
      <Modal
        visible={showConfirmRemoveLayer}
        onCancel={() => toggleDeleteLayer(true)}
        onOk={deleteLayer}
        title={
          <>
            Remove Layer: <b>{activeLayer && activeLayer.get("name")}</b>
          </>
        }
      >
        Are you sure you want to remove this layer?
      </Modal>
    </>
  );
});

export default List;
