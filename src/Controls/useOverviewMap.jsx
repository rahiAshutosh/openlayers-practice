import { useEffect } from "react";
import { Tile } from "ol/layer";
import OverviewMap from "ol/control/OverviewMap";

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