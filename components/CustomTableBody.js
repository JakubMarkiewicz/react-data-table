// @flow

import React from "react";
import CustomBar from "./CustomBar";
import CustomCell from "./CustomCell";
import { FixedSizeList as List } from "react-window";

const CustomTableBody = ({ options, headers, data, def, utils }) => {
  const tableRow = ({ index, style }) => (
    <div
      className={index % 2 === 0 ? "body__row" : "body__row body__row--even"}
      key={`ccb-${index}`}
      style={style}
    >
      {headers.map(
        v =>
          def[v].graph ? (
            <CustomBar
              columnName={v}
              entry={data[index]}
              {...{ options, def }}
            />
          ) : (
            <CustomCell
              columnName={v}
              value={data[index][v]}
              {...{ options, def }}
            />
          )
      )}
      <style jsx>{`
        .body__row {
          box-sizing: border-box;
          width: 100%;
          padding: ${options.theme.rowStyle.margin || 0};
          display: grid;
          grid-template-columns: ${utils.generateColumnSizes(def, headers)};
          position: relative;
          border-bottom: 1px solid #e5e6e7;
        }
        .body__row--even {
          background: #ededed;
        }
      `}</style>
    </div>
  );

  return options.virtualize ? (
    <div className="custom-table__body">
      <List
        height={options.theme.tableStyle.height}
        itemCount={data.length}
        itemSize={
          options.theme.rowStyle.height +
          Number(
            options.theme.rowStyle.margin.slice(
              0,
              options.theme.rowStyle.margin.indexOf("px")
            ) * 2
          )
        }
      >
        {tableRow}
      </List>
    </div>
  ) : (
    <div className="custom-table__body">
      {[...Array(data.length)].map((_, index) => tableRow({ index }))}
    </div>
  );
};

export default CustomTableBody;
