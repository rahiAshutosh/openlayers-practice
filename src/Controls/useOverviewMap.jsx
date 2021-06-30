import { useEffect } from "react";
import { Tile } from "ol/layer";
import OverviewMap from "ol/control/OverviewMap";

/**
 * Hook: Control to display an [overlay]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Overlay-Overlay.html} in the map
 * @function
 * @param {object} map - The [map]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Map-Map.html} object
 */
const useOverviewMap = (map) => {
  useEffect(() => {
    if (map) {
      const control = new OverviewMap({
        layers: [
          new Tile({
            source: map.getLayers().item(0).getSource()
          })
        ]
      });
      map.addControl(control);
    }
  }, [map]);
};

export default useOverviewMap;