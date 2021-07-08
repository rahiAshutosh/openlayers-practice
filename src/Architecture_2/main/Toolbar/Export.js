import React from "react";
import { Tooltip } from "antd";
import VectorLayer from "ol/layer/Vector";
import { exportVectorFeaturesAsGeoJSON } from "../../../Architecture_1/helper";
import { mapObj } from "../../libraries/ol-wrapper";

/**
 * Export current map (all vector layers) as GeoJSON
 * @component
 */
const Export = React.memo(() => {
  const exportGeojson = () => {
    let features = [];
    mapObj.getLayers().forEach((layer) => {
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
      <Tooltip title="Export GeoJSON" placement="right">
        <div className="btn" onClick={exportGeojson}>
          <i className="fas fa-download"></i>
        </div>
      </Tooltip>
    </>
  );
});

export default Export;