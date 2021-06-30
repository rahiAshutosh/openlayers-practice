import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";
import { useEffect, useRef } from "react";

/**
 * Hook: Interaction to allow user to select features in the map
 * @function
 * @param {object} map - The [map]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Map-Map.html} object
 */
const useSelect = (map) => {
  const selectInteraction = useRef(null);

  useEffect(() => {
    if (map) {
      if (selectInteraction.current) {
        map.removeInteraction(selectInteraction.current);
      }
      selectInteraction.current = new Select({
        condition: click,
      });
      selectInteraction.current.on('select', (event) => {
        console.log("SELECT EVENT: ", event.selected);
      });
      map.addInteraction(selectInteraction.current);
      return () => map.removeInteraction(selectInteraction.current);
    }
  }, [map]);
};

export default useSelect;