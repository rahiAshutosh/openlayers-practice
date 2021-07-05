import DragAndDrop from 'ol/interaction/DragAndDrop';
import { useContext, useEffect, useRef } from "react";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from "ol/source/Vector";
import { Modify } from 'ol/interaction';
import ConfigContext from './TranslateModifyConfig/ConfigContext';

/**
 * Hook: Interaction for adding ability to drag and drop file into the map
 * @function
 * @param {object} map - The [map]{@link https://openlayers.org/en/v6.5.0/apidoc/module-ol_Map-Map.html} object
 */
const useDragDrop = (map) => {
  const { config } = useContext(ConfigContext);
  const dragDrop = useRef();
  const vectorSource = useRef();
  const modify = useRef();

  const addModifyInteraction = () => {
    modify.current = new Modify({ source: vectorSource.current });
    modify.current.setActive(config.allowModify);
    map.addInteraction(modify.current);
  };

  useEffect(() => {
    if (modify.current) {
      map.removeInteraction(modify.current);
      addModifyInteraction();
      return () => map.removeInteraction(modify.current);
    }
    // eslint-disable-next-line
  }, [map, config]);

  useEffect(() => {
    if (map) {
      if (dragDrop.current) {
        map.removeInteraction(dragDrop.current);
      }
      dragDrop.current = new DragAndDrop({
        formatConstructors: [GeoJSON]
      });
      dragDrop.current.on('addfeatures', function (event) {
        vectorSource.current = new VectorSource({
          wrapX: false,
          features: event.features,
        });
        const vectorLayer = new VectorLayer({
          zIndex: 1,
          source: vectorSource.current
        });
        vectorLayer.set('name', `Imported File: ${event.file.name}`);
        map.addLayer(vectorLayer);
        map.getView().fit(vectorSource.current.getExtent());
        addModifyInteraction();
      });
      map.addInteraction(dragDrop.current);
      return () => map.removeInteraction(dragDrop.current);
    }
    // eslint-disable-next-line
  }, [map]);
};

export default useDragDrop;