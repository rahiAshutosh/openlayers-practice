import { Drawer, Tooltip } from "antd";
import React, { useState } from "react";

const Features = () => {
  const [showStyle, setShowStyle] = useState(false);
  const toggleShowStyle = () => {
    setShowStyle(v => !v);
  };

  return (
    <>
      <Tooltip title="Style Features" placement="left">
        <div className="btn" onClick={toggleShowStyle}>
          <i className="fas fa-shapes"></i>
        </div>
      </Tooltip>
      <Drawer
        push
        width="30vw"
        visible={showStyle}
        onClose={toggleShowStyle}
        title="Style Features"
      >
        
      </Drawer>
    </>
  );
};

export default Features;