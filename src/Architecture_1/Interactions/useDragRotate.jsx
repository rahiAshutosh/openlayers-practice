import { useEffect, useRef } from "react";
import { DragRotate } from "ol/interaction";
import { altKeyOnly } from "ol/events/condition";

/**
 * Hook: Interaction to allow user to drag and rotate the map
 * @function
 * @param {object} map - The [map]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Map-Map.html} object
 */
const useDragRotate = (map) => {
  const dragRotate = useRef();

  useEffect(() => {
    if (map) {
      dragRotate.current = new DragRotate({
        condition: altKeyOnly
      });
      map.addInteraction(dragRotate.current);

      // Cleanup
      return () => map.removeInteraction(dragRotate.current);
    }
  }, [map]);
};

export default useDragRotate;