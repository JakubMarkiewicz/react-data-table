// @flow

import React from "react";
import { getRowStyle, validIndicator } from "../utils/customChartUtils";
import CustomIndicator from "./CustomIndicator";

class CustomBar extends React.Component<$CustomBarProps, void> {
  barRef = React.createRef();

  // componentDidMount() {
  //   this.animate(0, this.props.entry[this.props.columnName]);
  // }

  // componentDidUpdate() {
  //   const { options, entry, columnName } = this.props;
  //   this.barRef.current.style.background = `linear-gradient(90deg, ${
  //     options.colorScheme[0]
  //   } ${entry[columnName]}%, ${options.colorScheme[1]} ${entry[columnName]}%)`;
  // }

  // animate = (start, end) => {
  //   const { options } = this.props;
  //   const stepCount = 200 / 16;
  //   const stepSize = (end - start) / stepCount;
  //   const val = start + stepSize;
  //   this.barRef.current.style.background = `linear-gradient(90deg, ${
  //     options.colorScheme[0]
  //   } ${val}%, ${options.colorScheme[1]} ${val}%)`;
  //   if (val <= end) requestAnimationFrame(() => this.animate(val, end));
  // };

  render() {
    const { def, columnName, entry, options } = this.props;
    const score = entry[columnName];
    const entryDef = def[columnName];
    return (
      <div className="graph">
        <div className="graph__score">{score}</div>
        <div
          className="graph__bar"
          style={getRowStyle(entryDef, score, options.colorScheme)}
          ref={this.barRef}
        >
          {validIndicator(entryDef, "main") && (
            <CustomIndicator
              title={def[columnName].options.indicators.mainTitle}
              type={"main"}
              value={entry[`${columnName}MainInd`]}
              options={options}
            />
          )}
        </div>
        <style jsx>{`
          .graph {
            display: grid;
            grid-template-columns: ${options.style.height}px 1fr;
          }
          .graph__score {
            display: grid;
            place-content: center;
            border-right: 1px solid
              ${options.colorScheme ? options.colorScheme[1] : "grey"};
            background: ${options.colorScheme
              ? options.colorScheme[0]
              : "grey"};
            color: #fff;
            font-size: calc(0.6 * ${options.style.height}px);
            font-weight: 700;
          }
        `}</style>
      </div>
    );
  }
}

export default CustomBar;
