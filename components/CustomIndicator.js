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
    left: `calc(${value}% - ${Math.abs(1 - title.length * 4 + title.length)}px)`
  };
  const position = { left: `calc(${value}% - 15px)` };
  return (
    <React.Fragment>
      <div className="indicator-desc" style={textPosition} title={value}>
        {title}
      </div>
      <div className="indicator" style={position}>
        <img src={test} alt="indicator" />
      </div>
      <style jsx>{`
        .indicator {
          top: ${-options.style.height / 2}px;
          height: 100%;
          color: #000;
          position: absolute;
          transform: rotate(${type === "main" ? "90" : "-45"}deg);
        }
        .indicator-desc {
          top: -20px;
          text-align: center;
          position: absolute;
          color: #000;
          font-size: 12px;
        }
      `}</style>
    </React.Fragment>
  );
};
export default CustomIndicator;
