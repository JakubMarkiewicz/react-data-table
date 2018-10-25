// @flow

import * as React from "react";
import { getRowStyle } from "../utils/customChartUtils";

const CustomCell = ({ def, columnName, options, value }: $CustomCellProps) => (
  <div
    style={{
      height: options.style.height,
      textAlign: "center"
      // ...getRowStyle(def[columnName]),
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

export default React.memo(CustomCell);
