// @flow

import React from "react";
import { getRowStyle } from "../utils/customChartUtils";

type PropType = {
  def: Object,
  v: string,
  options: Object,
  value: number
};

const CustomCell = ({ def, v, options, value }: PropType) => (
  <div
    style={{
      height: options.style.height,
      textAlign: "center",
      ...getRowStyle(def[v], value)
    }}
  >
    <span
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden"
      }}
      title={value}
    >
      {value}
    </span>
  </div>
);

export default CustomCell;
