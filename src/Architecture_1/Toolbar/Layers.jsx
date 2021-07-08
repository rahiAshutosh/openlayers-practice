import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Select, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { CurrentLayerContext } from "../index";
import { LAYERS } from "../../constants";

/**
 * Base layers switching
 * @component 
 */
const Layers = React.memo(() => {
  const { selectedLayer, handleChangeLayer } = useContext(CurrentLayerContext);
  const [showLayers, setShowLayers] = useState(false);

  const toggleOpenDrawer = () => {
    setShowLayers(v => !v);
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
        onChange={handleChangeLayer}
      />
    </Drawer>
    </>
  );
});

export default Layers;