import React, { useContext } from "react";
import useOverviewMap from "../Controls/useOverviewMap";
import useDragDrop from "../Interactions/useDragDrop";
import useDragRotate from "../Interactions/useDragRotate";
import useDragSelect from "../Interactions/useDragSelect";
import MapContext from "../Map/MapContext";
import Draw from "./Draw";
import Export from "./Export";
import Import from "./Import";
import Layers from "./Layers";
import Tools from "./Tools";
import Zoom from "./Zoom";

/**
 * Toolbar for interacting with and controlling the map
 * @component
 */
const Toolbar = React.memo(({
  drawSource
}) => {
  const { map } = useContext(MapContext);

  useDragRotate(map);
  useOverviewMap(map);
  useDragDrop(map);
  useDragSelect(map);

  return (
    <div className="toolbar">
      <Zoom />
      <Layers />
      <Draw drawSource={drawSource} />
      <Import />
      <Export />
      <Tools />
    </div>
  );
});

export default Toolbar;