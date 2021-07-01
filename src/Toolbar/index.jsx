import React from "react";
import Draw from "./Draw";
import Export from "./Export";
import Import from "./Import";
import Layers from "./Layers";
import Zoom from "./Zoom";

/**
 * Toolbar for interacting with and controlling the map
 * @component
 */
const Toolbar = ({
  drawSource
}) => {
  return (
    <div className="toolbar">
      <Zoom />
      <Layers />
      <Draw drawSource={drawSource} />
      <Import />
      <Export />
    </div>
  );
};

export default Toolbar;