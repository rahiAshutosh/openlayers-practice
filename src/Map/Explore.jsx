import React, { useContext, useRef, useState, useEffect } from "react";
import * as ol from "ol";
import MapContext from "./MapContext";

const Explore = () => {
  const popup = useRef();
  const overlay = useRef();
  const [coordinates, setCoordinates] = useState('');
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (map) {
      map.on('click', (event) => {
        overlay.current.setPosition(undefined);
        overlay.current.setPosition(event.coordinate);
        setCoordinates(event.coordinate.map(c => c.toFixed(4)).join(', '));
      });

      overlay.current = new ol.Overlay({
        element: popup.current
      });
      map.addOverlay(overlay.current);
    }
  }, [map]);

  return (
    <div className="coord-popup" ref={popup}>
      Coordinates: {coordinates}
    </div>
  );
};

export default Explore;