import { useEffect, useRef } from "react";
import { DragRotate } from "ol/interaction";
import { altKeyOnly } from "ol/events/condition";

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