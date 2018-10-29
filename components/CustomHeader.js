// @flow

import React from "react";
import { generateColumnSizes } from "../utils/customChartUtils";

const CustomHeader = ({
  headers,
  activeSortDim,
  setActiveSortDim,
  sortDirection,
  def,
  options
}: $CustomHeaderProps) => (
  <div className="custom-chart__header" style={options.headerStyle || {}}>
    {headers.map(v => (
      <div
        className={activeSortDim === v ? "header__info active" : "header__info"}
        onClick={() => setActiveSortDim(v)}
        role="presentation"
        key={v}
        style={options.theme.headerElementStyle || {}}
      >
        {v}
      </div>
    ))}
    <style jsx>{`
      .custom-chart__header {
        width: 100%;
        display: grid;
        place-content: center;
        text-align: center;
        font-size: 1em;
        grid-template-columns: ${generateColumnSizes(def, headers)};
        user-select: none;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(200, 200, 200);
      }
      .header__info {
        width: 100%;
        display: grid;
        place-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        padding: 3px;
        text-transform: uppercase;
        box-sizing: border-box;
      }
      .active {
        box-shadow: inset 0 ${sortDirection === "ascending" ? "-3px" : "3px"} 0
          0 rgba(0, 0, 0, 0.6);
      }
    `}</style>
  </div>
);

export default React.memo(CustomHeader);
