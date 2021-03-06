import React, { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import { Vector as VectorLayer } from "ol/layer";
import { DRAW_LAYER_NAME } from "../../constants";

/**
 * Layer for drawing point/line/polygon on the map
 * @component 
 */
const DrawLayer = React.memo(({ source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (map) {
			let drawLayer = new VectorLayer({
				source,
				zIndex,
			});
			drawLayer.set('name', DRAW_LAYER_NAME);
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
});

export default DrawLayer;