import React, { useContext } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import MapContext from "../Map/MapContext";
import { Tooltip } from "antd";

const Zoom = () => {
  const { map } = useContext(MapContext);

  const zoomIn = () => {
    const view = map.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom + 1);
  };

  const zoomOut = () => {
    const view = map.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom - 1);
  };

  return (
    <>
      <Tooltip title="Zoom In" placement="left">
        <div className="btn" onClick={zoomIn}>
          <PlusOutlined />
        </div>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="left">
        <div className="btn" onClick={zoomOut}>
          <MinusOutlined />
        </div>
      </Tooltip>
    </>
  );
};

export default Zoom;