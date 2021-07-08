import { Popover, Tooltip, Radio, Space } from "antd";
import React, { useContext } from "react";
import ConfigContext from "../Interactions/TranslateModifyConfig/ConfigContext";

const Tools = () => {
  const { config, handleChangeConfig } = useContext(ConfigContext);
  const { allowModify, allowTranslate } = config;

  const toggleAllow = (e) => {
    const allowedInteraction = e.target.value;
    const otherInteraction = allowedInteraction === 'allowModify' ? 'allowTranslate' : 'allowModify';
    handleChangeConfig({
      [allowedInteraction]: true,
      [otherInteraction]: false,
    });
  };

  const selectedValue = allowModify ? 'allowModify' : (allowTranslate ? 'allowTranslate' : null);

  const Content = (
    <div>
      <div>
        <Radio.Group value={selectedValue} onChange={toggleAllow}>
          <Space direction="vertical">
            <Radio value="allowModify">Allow Modify</Radio>
            <Radio value="allowTranslate">Allow Translate</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );

  return (
    <>
      <Tooltip title="Allow Modify and Translate" placement="bottom">
        <Popover trigger="click" content={Content} placement="right">
          <div className="btn">
            <i className="fas fa-wrench" />
          </div>
        </Popover>
      </Tooltip>
    </>
  );
};

export default Tools;