import { Modal, Tooltip, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { Modify } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import MapContext from "../Map/MapContext";

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => { onSuccess("ok"); }, 0);
};

const Import = () => {
  const { map } = useContext(MapContext);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFileList, setSelectedFileList] = useState([]);

  const toggleShowUpload = () => {
    setShowUpload(v => !v);
    setSelectedFileList([]);
  };

  const updateFileList = info => {
    setSelectedFileList(info.fileList);
  };

  const readData = (file) => {
    return (e) => {
      try {
        const geoJson = JSON.parse(e.target.result);
        const vectorSource = new VectorSource({
          wrapX: false,
          features: (new GeoJSON()).readFeatures(geoJson, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
        });
        const vectorLayer = new VectorLayer({
          zIndex: 1,
          source: vectorSource
        });
        vectorLayer.set('name', 'File: ' + file.name);
        map.addLayer(vectorLayer);
        map.getView().fit(vectorSource.getExtent());
        const modify = new Modify({ source: vectorSource });
        map.addInteraction(modify);
      } catch (ex) {
        alert('An error occurred while trying to read this file: ' + ex);
      }
    };
  };

  const importData = () => {
    selectedFileList
    .map(f => f.originFileObj)
    .forEach((file) => {
      var reader = new FileReader();
      reader.onload = readData(file);
      reader.readAsText(file);
    });
    toggleShowUpload();
  };

  return (
    <>
      <Tooltip title="Import GeoJSON" placement="left">
        <div className="btn" onClick={toggleShowUpload}>
          <i className="fas fa-file-import"></i>
        </div>
      </Tooltip>
      <Modal
        visible={showUpload}
        onCancel={toggleShowUpload}
        title="Import GeoJSON Files"
        onOk={importData}
      >
        {
          showUpload ?
          <Upload
            accept=".geojson"
            customRequest={dummyRequest}
            onChange={updateFileList}
            multiple
          >
            <Button icon={<UploadOutlined />}>Click to Import</Button>
          </Upload>: null
        }
      </Modal>
    </>
  );
};

export default Import;