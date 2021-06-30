import DragAndDrop from 'ol/interaction/DragAndDrop';
import { useEffect, useRef } from "react";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from "ol/source/Vector";
import { Modify } from 'ol/interaction';

/**
 * Hook: Interaction for adding ability to drag and drop file into the map
 * @function
 * @param {object} map - The [map]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Map-Map.html} object
 */
const useDragDrop = (map) => {
  const dragDrop = useRef();

  useEffect(() => {
    if (map) {
      if (dragDrop.current) {
        map.removeInteraction(dragDrop.current);
      }
      dragDrop.current = new DragAndDrop({
        formatConstructors: [GeoJSON]
      });
      dragDrop.current.on('addfeatures', function (event) {
        var vectorSource = new VectorSource({
          wrapX: false,
          features: event.features,
        });
        const vectorLayer = new VectorLayer({
          zIndex: 1,
          source: vectorSource
        });
        vectorLayer.set('name', `Imported File: ${event.file.name}`);
        map.addLayer(vectorLayer);
        map.getView().fit(vectorSource.getExtent());
        const modify = new Modify({ source: vectorSource });
        map.addInteraction(modify);
      });
      map.addInteraction(dragDrop.current);
      return () => map.removeInteraction(dragDrop.current);
    }
  }, [map]);
};

export default useDragDrop;