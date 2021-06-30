import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import MapContext from "../Map/MapContext";
import { Row, Col, Modal } from "antd";
import { ZoomInOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { exportVectorFeaturesAsGeoJSON } from "../helper";

const LayerSwitch = () => {
  const mapLayers = useRef(null);
  const [layers, setLayers] = useState([]);
  const [showConfirmRemoveLayer, setShowConfirmRemoveLayer] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);
  const { map } = useContext(MapContext);

  const updateLayers = () => {
    mapLayers.current = map.getLayers();
    setLayers([...mapLayers.current.getArray().filter((layer) => layer.getZIndex() !== 0)]);
  };

  useEffect(() => {
    if (map) {
      if (!layers.length) updateLayers(); // Initialise base layer
      mapLayers.current.on(['propertychange', 'change', 'change:visible'], updateLayers);
    }
    // eslint-disable-next-line
  }, [map]);

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
        <i
          className={iconClassName}
          onClick={toggleVisibility}
        /> <em>{areAllOn ? "Hide All Layers" : "Show All Layers"}</em>
      </div>
    );
    // eslint-disable-next-line
  }, [layers]);

  const toggleDeleteLayer = (resetActiveLayer=false) => {
    setShowConfirmRemoveLayer(v => !v);
    if (resetActiveLayer) setActiveLayer(null);
  };

  const deleteLayer = () => {
    map.removeLayer(activeLayer);
    toggleDeleteLayer(true);
  };

  return (
    <div className="layer-switch">
      <div className="heading">LAYERS ({layers && layers.length})</div>
      {toggleAll}
      {
        layers.length > 0 && layers.map((layer, index) => {
          const isLayerVisible = layer.getVisible() ? "far fa-eye" : "far fa-eye-slash";
  
          const toggleVisibility = () => {
            const layerVisible = layer.getVisible();
            layer.setVisible(!layerVisible);
            updateLayers();
          };

          const markLayerForDelete = () => {
            setActiveLayer(layer);
            toggleDeleteLayer();
          };
  
          const zoomToLayer = () => {
            map.getView().fit(layer.getSource().getExtent());
          };

          const downloadLayerAsGeoJSON = () => {
            exportVectorFeaturesAsGeoJSON(layer.getSource().getFeatures());
          };

          return (
            <div className="layer-option">
              <Row style={{ width: '100%' }}>
                <Col span={18}>
                  <i
                    className={isLayerVisible}
                    onClick={toggleVisibility}
                  /> {layer.get('name')}
                </Col>
                <Col span={2}>
                  <DownloadOutlined onClick={downloadLayerAsGeoJSON} />
                </Col>
                <Col span={2}>
                  <ZoomInOutlined onClick={zoomToLayer} />
                </Col>
                <Col span={2}>
                  <DeleteOutlined onClick={markLayerForDelete} />
                </Col>
              </Row>
            </div>
          );
        })
      }
      <Modal
        visible={showConfirmRemoveLayer}
        onCancel={() => toggleDeleteLayer(true)}
        onOk={deleteLayer}
        title={<>Remove Layer: <b>{activeLayer && activeLayer.get('name')}</b></>}
      >
        Are you sure you want to remove this layer?
      </Modal>
    </div>
  );
};

export default LayerSwitch;