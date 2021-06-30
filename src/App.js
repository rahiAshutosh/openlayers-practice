import React, { useState, useMemo, createContext, useRef } from "react";
import Map from "./Map";
import { Layers, TileLayer, DrawLayer } from "./Layers";
import { fromLonLat } from "ol/proj";
import * as olSource from "ol/source";
import "./App.css";
import "antd/dist/antd.css";
import "ol/ol.css";
import Toolbar from "./Toolbar";
import LayerSwitch from "./LayerSwitch";
import { Vector as VectorSource } from "ol/source";
// import Explore from "./Map/Explore";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeometryType from "ol/geom/GeometryType";

export const CurrentLayerContext = createContext();
const App = () => {
  const center = useRef([0,0]);
  const zoom = useRef(1);
  const [selectedLayer, setSelectedLayer] = useState('hybrid');

  const handleChangeLayer = (val) => {
    setSelectedLayer(val);
  };

  const getSource = useMemo(() => {
    const url = {
      roadmap: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
      terrain: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
      alteredRoadmap: 'http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}',
      satelliteOnly: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
      terrainOnly: 'http://mt0.google.com/vt/lyrs=t&hl=en&x={x}&y={y}&z={z}',
      hybrid: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
    };
    return new olSource.XYZ({
      url: url[selectedLayer]
    });
  }, [selectedLayer]);

  const drawSource = new VectorSource({ wrapX: false });

  drawSource.on('addfeature', (event) => {
    if (event.feature.getGeometry().getType() !== GeometryType.POINT) {
      event.feature.setStyle(new Style({
        fill: new Fill({
          color: 'rgba(0,0,0,0.5)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 4
        })
      }));
      event.feature.setProperties({ // For exporting these styles to geojson.io as well
        'fill': 'rgba(0,0,0,0.5)',
        'stroke': 'red',
        'stroke-width': 4,
        'fill-opacity': 0.5
      });
    }
  });

  const currentLayerContext = {
    selectedLayer,
    handleChangeLayer
  };

  return (
    <div>
      <Map
        center={fromLonLat(center.current)}
        zoom={zoom.current}
      >
        <Layers>
          <div key={selectedLayer}><TileLayer source={getSource} zIndex={0} /></div>
          <DrawLayer source={drawSource} zIndex={1} />
        </Layers>
        <CurrentLayerContext.Provider value={currentLayerContext}>
          <Toolbar drawSource={drawSource} />
        </CurrentLayerContext.Provider>
        {/* <Explore /> */}
        <LayerSwitch />
      </Map>
    </div>
  );
};

export default App;