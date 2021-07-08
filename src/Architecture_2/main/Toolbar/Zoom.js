import React from "react";
import { Tooltip } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { mapObj } from "../../libraries/ol-wrapper";

const Zoom = React.memo(() => {
  const zoomIn = () => {
    mapObj.zoomIn();
  };

  const zoomOut = () => {
    mapObj.zoomOut();
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
}, () => true);

export default Zoom;