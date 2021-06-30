import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";
import { useEffect, useRef } from "react";

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