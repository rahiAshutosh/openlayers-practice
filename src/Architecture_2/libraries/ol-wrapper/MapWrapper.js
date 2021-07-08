import { Map, View } from "ol";
import GeometryType from "ol/geom/GeometryType";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM, XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Draw } from "ol/interaction";
import { INITIAL_CENTER, INITIAL_ZOOM } from "./constants";
import { GMAP_BASELAYERS } from "../../../constants";

class MapWrapper {
  view;
  target;
  layers = [];
  controls = [];
  interactions = [];

  #map = null;
  baseLayer = null;
  baseLayerType = 'OSM';
  drawLayer = null;
  drawInteraction = null;

  init(target) {
    this.view = new View({
      zoom: INITIAL_ZOOM,
      center: INITIAL_CENTER,
    });
    this.target = target;
    this.baseLayer = new TileLayer({
      source: new OSM(),
      zIndex: 0,
    });
    this.layers = [this.baseLayer];
    this.#map = new Map({
      view: this.view,
      target: this.target,
      layers: this.layers,
      controls: this.controls,
      interactions: this.interactions
    });
  }

  addVectorLayer(layerOptions) {
    const layer = new VectorLayer({ ...layerOptions });
    this.addLayer(layer);
  }

  addLayer(layer) {
    this.layers.push(layer);
    this.#map.addLayer(layer);
  }

  removeLayer(layer) {
    this.#map.removeLayer(layer);
  }

  addInteraction(interaction) {
    this.interactions.push(interaction);
    this.#map.addInteraction(interaction);
  }

  removeInteraction(interaction) {
    if (this.#map) {
      this.#map.removeInteraction(interaction);
    }
  }

  getLayers() {
    return this.#map.getLayers();
  }

  zoomIn() {
    this.view.setZoom(this.view.getZoom() + 1);
  }

  zoomOut() {
    this.view.setZoom(this.view.getZoom() - 1);
  }

  changeBaseLayer(newLayerType, callback = () => {}) {
    let newSource;
    if (newLayerType === 'OSM') {
      newSource = new OSM();
    } else {
      newSource = new XYZ({
        url: GMAP_BASELAYERS[newLayerType]
      });
    }
    this.baseLayerType = newLayerType;
    this.baseLayer.setSource(newSource);
    callback(this.baseLayerType);
  }

  startDraw(shapeType = GeometryType.POLYGON) {
    this.endDrawing();
    let vectorSource;
    if (this.drawLayer) {
      vectorSource = this.drawLayer.getSource();
    } else {
      vectorSource = new VectorSource({
        wrapX: false,
      });
      this.drawLayer = new VectorLayer({ source: vectorSource, name: 'Draw Layer' });
      this.addLayer(this.drawLayer);
    }
    const drawInteraction = new Draw({
      source: vectorSource,
      type: shapeType,
    });
    this.interactions.push(drawInteraction);
    this.drawInteraction = drawInteraction;
    this.addInteraction(drawInteraction);
  }

  endDrawing() {
    this.removeInteraction(this.drawInteraction);
    this.drawInteraction = null;
  }

  baseLayerOn(eventName, callback) {
    this.baseLayer.on(eventName, callback);
  }

  registerEventListener(eventName, callback) {
    if (this.#map) {
      this.#map.on(eventName, callback);
    }
  }

  unregisterEventListener(eventName, callback) {
    if (this.#map) {
      this.#map.un(eventName, callback);
    }
  }

  fitToExtent(extent) {
    this.#map.getView().fit(extent);
  }
}

export default MapWrapper;