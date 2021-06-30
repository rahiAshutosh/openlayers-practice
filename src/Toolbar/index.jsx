import React from "react";
import Draw from "./Draw";
import Export from "./Export";
import Features from "./Features";
import Import from "./Import";
import Layers from "./Layers";
import Zoom from "./Zoom";

const Toolbar = ({
  drawSource
}) => {
  return (
    <div className="toolbar">
      <Zoom />
      <Layers />
      <Draw drawSource={drawSource} />
      <Features />
      <Import />
      <Export />
    </div>
  );
};

export default Toolbar;