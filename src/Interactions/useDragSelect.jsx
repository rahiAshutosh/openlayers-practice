import { click, platformModifierKeyOnly } from "ol/events/condition";
import { DragBox, Select } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef } from "react";
import { DELETE_KEYCODE } from "../constants";

const useDragSelect = (map) => {
  const selectedFeatures = useRef();
  const selectInteraction = useRef(null);
  const dragBoxInteraction = useRef(null);
  const handleKeydown = useRef(null);

  useEffect(() => {
    if (map) {
      dragBoxInteraction.current = new DragBox({
        condition: platformModifierKeyOnly
      });
      selectInteraction.current = new Select({
        condition: click,
      });
      selectedFeatures.current = selectInteraction.current.getFeatures();
      dragBoxInteraction.current.on('boxend', (event) => {
        let extent = dragBoxInteraction.current.getGeometry().getExtent();
        map.getLayers().forEach((layer) => {
          const source = layer.getSource();
          const isVectorSource = source instanceof VectorSource;
          if (isVectorSource) {
            source.forEachFeatureIntersectingExtent(extent, (feature) => {
              selectedFeatures.current.push(feature);
            });
          }
        })
      });
      map.addInteraction(dragBoxInteraction.current);
      map.addInteraction(selectInteraction.current);
      return () => {
        map.removeInteraction(dragBoxInteraction.current);
        map.removeInteraction(selectInteraction.current);
      };
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      handleKeydown.current = (event) => {
        const isDeletePressed = event.originalEvent.keyCode === DELETE_KEYCODE;
        if (isDeletePressed) {
          selectedFeatures.current.forEach((feature) => {
            map.getLayers().forEach((layer) => {
              const source = layer.getSource();
              const isVectorSource = source instanceof VectorSource;
              if (isVectorSource && source.hasFeature(feature)) {
                source.removeFeature(feature);
              }
            });
          });
        }
      };
      map.on('keydown', handleKeydown.current);
      return () => map.un('keydown', handleKeydown.current);
    }
  }, [map]);
};

export default useDragSelect;