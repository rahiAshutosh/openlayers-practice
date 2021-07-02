import { Row, Col, Popover } from "antd";
import React, { useContext } from "react";
import {
  ZoomInOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import MapContext from "../Map/MapContext";
import { exportVectorFeaturesAsGeoJSON } from "../helper";
import StyleLayer from "./StyleLayer";

/**
 * All the layer based actions like layer styling, download, zoom to layer, remove layer, turn on/off etc
 * @component
 */
const LayerActions = React.memo(({ layer, updateLayers, markLayerForDelete }) => {
  const { map } = useContext(MapContext);
  const isLayerVisible = layer.getVisible() ? "far fa-eye" : "far fa-eye-slash";

  /**
   * Show or hide a layer
   * @function
   */
  const toggleVisibility = () => {
    const layerVisible = layer.getVisible();
    layer.setVisible(!layerVisible);
    updateLayers();
  };

  /**
   * Zoom to layer handler
   * @function
   */
  const zoomToLayer = () => {
    map.getView().fit(layer.getSource().getExtent());
  };

  const styleLayer = () => {};

  /**
   * Download a layer as GeoJSON
   * @function
   */
  const downloadLayerAsGeoJSON = () => {
    exportVectorFeaturesAsGeoJSON(layer.getSource().getFeatures());
  };

  const handleMarkLayerForDelete = () => markLayerForDelete(layer);

  return (
    <div className="layer-option layer-style-container">
      <Row style={{ width: "100%" }}>
        <Col span={18}>
          <Popover
            content={<StyleLayer layer={layer} />}
            trigger="click"
            placement="left"
          >
            <i className="fas fa-paint-brush" onClick={styleLayer}></i>
          </Popover>
          <i className={isLayerVisible} onClick={toggleVisibility} />{" "}
          {layer.get("name")}
        </Col>
        <Col span={2}>
          <DownloadOutlined onClick={downloadLayerAsGeoJSON} />
        </Col>
        <Col span={2}>
          <ZoomInOutlined onClick={zoomToLayer} />
        </Col>
        <Col span={2}>
          <DeleteOutlined onClick={handleMarkLayerForDelete} />
        </Col>
      </Row>
    </div>
  );
});

export default LayerActions;
