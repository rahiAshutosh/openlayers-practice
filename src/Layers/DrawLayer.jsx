import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import { Vector as VectorLayer } from "ol/layer";

const DrawLayer = ({ source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (map) {
			let drawLayer = new VectorLayer({
				source,
				zIndex,
			});
			drawLayer.set('name', 'Draw Layer');
			map.addLayer(drawLayer);
			drawLayer.setZIndex(zIndex);

			return () => {
				if (map) {
					map.removeLayer(drawLayer);
				}
			};
		}
    // eslint-disable-next-line
	}, [map]);

	return null;
};

export default DrawLayer;