import { Modal, Tooltip, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Modify } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import { mapObj } from '../../libraries/ol-wrapper';

/**
 * @callback onSuccess
 * @param {string} param
 */
/**
 * Dummy request function for antd file upload to avoid file upload at a URL
 * @function
 * @param {*} file - File Object
 * @param {onSuccess} onSuccess - Callback to execute when setTimeout executes
 */
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => { onSuccess("ok"); }, 0);
};

/**
 * Import GeoJSON layer(s) in the map
 * @component 
 */
const Import = React.memo(() => {
  const modify = useRef();
  const vectorSource = useRef();
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFileList, setSelectedFileList] = useState([]);

  const toggleShowUpload = () => {
    setShowUpload(v => !v);
    setSelectedFileList([]);
  };

  const updateFileList = info => {
    setSelectedFileList(info.fileList);
  };

  const addModifyInteraction = () => {
    modify.current = new Modify({ source: vectorSource.current });
    modify.current.setActive(true);
    mapObj.addInteraction(modify.current);
  };

  useEffect(() => {
    if (modify.current) {
      mapObj.removeInteraction(modify.current);
      addModifyInteraction();
      return () => mapObj.removeInteraction(modify.current);
    }
    // eslint-disable-next-line
  }, []);

  const readData = (file) => {
    return (e) => {
      try {
        const geoJson = JSON.parse(e.target.result);
        vectorSource.current = new VectorSource({
          wrapX: false,
          features: (new GeoJSON()).readFeatures(geoJson, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
        });
        mapObj.addVectorLayer({
          zIndex: 1,
          source: vectorSource.current,
          name: 'File: ' + file.name
        });
        mapObj.fitToExtent(vectorSource.current.getExtent());
        addModifyInteraction();
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
});

export default Import;