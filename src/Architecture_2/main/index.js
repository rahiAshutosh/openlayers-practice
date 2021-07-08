import React, { useEffect, useRef, useState } from "react";
import '../../App.css';
import "antd/dist/antd.css";
import "ol/ol.css";
import Toolbar from "./Toolbar";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { mapObj } from "../libraries/ol-wrapper";
import LayerSwitch from "./LayerSwitch";

const Architecture2 = () => {
  const [initiated, setInitiated] = useState(false);
  const containerRef = useRef();
  useKeyboardShortcuts();

  useEffect(() => {
    mapObj.init(containerRef.current);
    setInitiated(true);
  }, []);

  return (
    <>
      <div ref={containerRef} className="ol-map" />
      {
        initiated &&
        <>
          <Toolbar />
          <LayerSwitch />
        </>
      }
    </>
  );
};

export default Architecture2;