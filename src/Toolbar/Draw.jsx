import { Tooltip } from "antd";
import React, { useContext, useRef, useEffect } from "react";
import { Draw, Modify, Snap } from "ol/interaction";
import MapContext from "../Map/MapContext";
import GeometryType from "ol/geom/GeometryType";

const DrawActions = ({
  drawSource,
}) => {
  const draw = useRef(null);
  const snap = useRef(null);
  const { map } = useContext(MapContext);

  const clearInteractions = () => {
    map.removeInteraction(draw.current);
    map.removeInteraction(snap.current);
  };

  const drawPolygon = () => {
    clearInteractions();
    addInteraction(GeometryType.POLYGON);
  };

  const drawPoint = () => {
    clearInteractions();
    addInteraction(GeometryType.POINT);
  };

  const drawLine = () => {
    clearInteractions();
    addInteraction(GeometryType.LINE_STRING);
  };

  useEffect(() => {
    if (map) {
      var modify = new Modify({ source: drawSource });
      map.addInteraction(modify);
    }
  }, [map, drawSource]);

  const addInteraction = (selectedDrawType) => {
    var value = selectedDrawType;
    if (value !== 'None') {
      draw.current = new Draw({
        source: drawSource,
        type: selectedDrawType,
      });
      map.addInteraction(draw.current);
      snap.current = new Snap({ source: drawSource });
      map.addInteraction(snap.current);
    }
  };

  return (
    <>
      <Tooltip title="Draw Polygon" placement="left">
        <div className="btn" onClick={drawPolygon}>
          <i className="fas fa-draw-polygon"></i>
        </div>
      </Tooltip>
      <Tooltip title="Draw Point" placement="left">
        <div className="btn" onClick={drawPoint}>
          <i className="fas fa-map-marker-alt"></i>
        </div>
      </Tooltip>
      <Tooltip title="Draw Line" placement="left">
        <div className="btn" onClick={drawLine}>
          <i className="fas fa-wave-square"></i>
        </div>
      </Tooltip>
      <Tooltip title="Pan" placement="left">
        <div className="btn" onClick={clearInteractions}>
          <i className="fas fa-mouse-pointer"></i>
        </div>
      </Tooltip>
    </>
  );
};

export default DrawActions;