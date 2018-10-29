// @flow

import React from "react";
import test from "../static/indicator.svg";

const CustomIndicator = ({
  title,
  type,
  value,
  options
}: $CustomIndicatorProps) => {
  const textPosition = {
    left: `calc(${value}% - ${Math.abs(
      1 - title.length * 4 + title.length
    )}px)`,
    [type === "main" ? "top" : "bottom"]: "-20px"
  };
  const position = { left: `calc(${value}% - 15px)` };
  return (
    <React.Fragment>
      <div className="indicator-desc" style={textPosition} title={value}>
        {title}
      </div>
      <div
        className="indicator"
        style={{
          ...position,
          transform: `rotate(${type === "main" ? "90" : "-90"}deg)`,
          top:
            type === "main"
              ? `${-options.theme.rowStyle.height / 2}px`
              : `${options.theme.rowStyle.height / 2}px`
        }}
      >
        <img src={test} alt="indicator" />
      </div>
      <style jsx>{`
        .indicator {
          height: 100%;
          color: #000;
          position: absolute;
        }
        .indicator-desc {
          text-align: center;
          position: absolute;
          color: transparent;
          font-size: 12px;
          color: #000;
        }
      `}</style>
    </React.Fragment>
  );
};
export default CustomIndicator;
