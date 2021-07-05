import React, { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import Translate from "ol/interaction/Translate";
import MapContext from "../../Map/MapContext";
import ConfigContext from "./ConfigContext";

const TranslateModifyConfig = ({
  children
}) => {
  const [config, setConfig] = useState({
    allowModify: false,
    allowTranslate: false
  });
  const { map } = useContext(MapContext);

  const translateRef = useRef();

  const handleChangeConfig = (newConfig={}) => {
    setConfig(existingConfig => ({
      ...existingConfig,
      ...newConfig
    }));
  };

  useEffect(() => {
    if (map) {
      translateRef.current = new Translate();
      translateRef.current.setActive(config.allowTranslate);
      map.addInteraction(translateRef.current);
      return () => {
        map.removeInteraction(translateRef.current);
      }
    }
    // eslint-disable-next-line
  }, [map, config]);

  const value = {
    config,
    handleChangeConfig
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export default TranslateModifyConfig;