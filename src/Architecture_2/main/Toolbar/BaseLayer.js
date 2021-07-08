import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { LAYERS } from "../../../constants";
import { mapObj } from "../../libraries/ol-wrapper";

/**
 * Base layers switching
 * @component 
 */
const BaseLayer = React.memo(() => {
  const [selectedLayer, setSelectedLayer] = useState(mapObj.baseLayerType);
  const [showLayers, setShowLayers] = useState(false);

  const toggleOpenDrawer = () => {
    setShowLayers(v => !v);
  };

  const handleChangeBaseLayer = (layerType) => {
    mapObj.changeBaseLayer(layerType, (layerName) => setSelectedLayer(layerName));
  };

  return (
    <>
    <Tooltip title="Layers" placement="left">
      <div className="btn" onClick={toggleOpenDrawer}>
        <MenuUnfoldOutlined />
      </div>
    </Tooltip>
    <Drawer
      push
      width="30vw"
      visible={showLayers}
      onClose={toggleOpenDrawer}
      title="Layers"
    >
      <Select
        style={{ width: '100%' }}
        value={selectedLayer}
        options={LAYERS}
        onChange={handleChangeBaseLayer}
      />
    </Drawer>
    </>
  );
});

export default BaseLayer;