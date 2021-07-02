import React, { useRef, useState, useEffect } from "react";
import MapContext from "./MapContext";
import * as ol from "ol";
import useDragRotate from "../Interactions/useDragRotate";
import useOverviewMap from "../Controls/useOverviewMap";
import useDragDrop from "../Interactions/useDragDrop";
import useSelect from "../Interactions/useSelect";

/**
 * HOC: Map Wrapper Component, Initializes the map and adds interactions to it
 * @component
 * @param {object} props
 * @param {ReactNode} props.children - Children of the component (Layers) and others
 * @param {number} props.zoom - Zoom Value
 * @param {number} props.center - Center Value
 */
const Map = React.memo(({
  children,
  zoom,
  center,
}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useDragRotate(map);
  useOverviewMap(map);
  useDragDrop(map);
  useSelect(map);

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      overlays: [],
      controls: [],
      keyboardEventTarget: document, // So that keyboard interaction can work
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map) {
      map.getView().setZoom(zoom);
    }
    // eslint-disable-next-line
  }, [zoom]);

  useEffect(() => {
    if (map) {
      map.getView().setCenter(center);
    }
    // eslint-disable-next-line
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
});

export default Map;