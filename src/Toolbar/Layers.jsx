import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Select, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { CurrentLayerContext } from "../App";

const LAYERS = [
  { label: 'Satellite Only', value: 'satelliteOnly' },
  { label: 'Road Map', value: 'roadmap' },
  { label: 'Terrain', value: 'terrain' },
  { label: 'Altered Road Map', value: 'alteredRoadmap' },
  { label: 'Terrain Only', value: 'terrainOnly' },
  { label: 'Hybrid', value: 'hybrid' },
];

const Layers = () => {
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
};

export default Layers;