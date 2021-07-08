import React from "react";
import { Tooltip } from "antd";
import { mapObj, SHAPES_TO_DRAW } from "../../libraries/ol-wrapper";

const Draw = React.memo(() => {

  return (
    <>
      {
        SHAPES_TO_DRAW.map((shape) => {
          const { tooltipTitle, iconClassName, type } = shape;
          const handleDraw = () => mapObj.startDraw(type);
          return (
            <Tooltip key={tooltipTitle} title={tooltipTitle} placement="right">
              <div className="btn" onClick={handleDraw}>
                <i className={iconClassName} />
              </div>
            </Tooltip>
          );
        })
      }
    </>
  );
}, () => true);

export default Draw;