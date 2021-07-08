import React from "react";
import Draw from "./Draw";
import Zoom from "./Zoom";
import BaseLayer from "./BaseLayer";
import Export from "./Export";
import Import from "./Import";

const Toolbar = React.memo(() => {
  return (
    <div className="toolbar">
      <Zoom />
      <Draw />
      <BaseLayer />
      <Export />
      <Import />
    </div>
  );
}, () => true);

export default Toolbar;