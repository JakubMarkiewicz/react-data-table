// @flow

import React from "react";
import { getRowStyle, validIndicator } from "../utils/customChartUtils";
import CustomIndicator from "./CustomIndicator";

class CustomBar extends React.Component<$CustomBarProps, void> {
  barRef = React.createRef();

  // componentDidMount() {
  //   this.animate(0, this.props.singleEntry[this.props.v])
  // }

  // componentDidUpdate() {
  //   const { options, singleEntry, v } = this.props
  //   console.log('test')
  //   this.barRef.current.style.background = `linear-gradient(90deg, ${
  //     options.colorScheme[0]
  //   } ${singleEntry[v]}%, ${options.colorScheme[1]} ${singleEntry[v]}%)`
  // }

  // animate = (start, end) => {
  //   const { options } = this.props
  //   const stepCount = 200 / 16
  //   const stepSize = (end - start) / stepCount
  //   const val = start + stepSize
  //   this.barRef.current.style.background = `linear-gradient(90deg, ${
  //     options.colorScheme[0]
  //   } ${val}%, ${options.colorScheme[1]} ${val}%)`
  //   if (val <= end) requestAnimationFrame(() => this.animate(val, end))
  // }

  render() {
    const { def, columnName, entry, options } = this.props;
    const score = entry[columnName];
    const entryDef = def[columnName];
    return (
      <div className="graph">
        <div className="graph__score">{score}</div>
        <div
          className="graph__bar"
          style={getRowStyle(entryDef, score)}
          ref={this.barRef}
        >
          {validIndicator(entryDef, "main") && (
            <CustomIndicator
              title="Q3 2018" // TODO: no hardcoded vals
              type="main"
              value={entry[`${columnName}ind`]}
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
            border-right: 1px solid ${"grey"}; // TODO: optional chaining from colorscheme
            background: ${"transparent"};
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
