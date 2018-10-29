// @flow

import React from "react";
import { getRowStyle } from "../utils/customChartUtils";
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
          style={getRowStyle(entryDef, score, options.theme.colorScheme)}
          ref={this.barRef}
        >
          {entryDef.indicators &&
            entryDef.indicators.map((indicator, ind) => (
              <CustomIndicator
                title={indicator}
                type={ind % 2 === 0 ? "main" : "secondary"}
                value={entry[indicator]}
                options={options}
              />
            ))}
        </div>
        <style jsx>{`
          .graph {
            display: grid;
            grid-template-columns: ${options.theme.rowStyle.height}px 1fr;
          }
          .graph__score {
            display: grid;
            place-content: center;
            border-right: 1px solid ${options.theme.colorScheme[1]};
            background: ${options.theme.colorScheme[0]};
            color: #fff;
            font-size: calc(0.6 * ${options.theme.rowStyle.height}px);
            font-weight: 700;
          }
        `}</style>
      </div>
    );
  }
}

export default CustomBar;
