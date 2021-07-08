import React, { useContext } from "react";
import { Tooltip } from "antd";
import MapContext from "../Map/MapContext";
import VectorLayer from "ol/layer/Vector";
import { exportVectorFeaturesAsGeoJSON } from "../helper";

/**
 * Export current map (all vector layers) as GeoJSON
 * @component
 */
const Export = React.memo(() => {
  const { map } = useContext(MapContext);

  const exportGeojson = () => {
    let features = [];
    map.getLayers().forEach((layer) => {
      const source = layer.getSource();
      const isVectorLayer = layer instanceof VectorLayer;
      if (isVectorLayer) {
        features = features.concat(source.getFeatures());
      }
    });
    exportVectorFeaturesAsGeoJSON(features);
  };

  return (
    <>
      <Tooltip title="Export GeoJSON" placement="left">
        <div className="btn" onClick={exportGeojson}>
          <i className="fas fa-download"></i>
        </div>
      </Tooltip>
    </>
  );
});

export default Export;