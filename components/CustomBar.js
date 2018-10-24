// @flow

import React from "react";
import { getRowStyle, validIndicator } from "../utils/customChartUtils";
import CustomIndicator from "./CustomIndicator";

type PropType = {
  v: string | number,
  def: Object,
  singleEntry: Object,
  options: Object
};

class CustomBar extends React.Component<PropType, void> {
  // barRef = React.createRef();
  // componentDidMount() {
  //   this.animate(55, this.props.singleEntry[this.props.v]);
  // }
  // animate = (start, end) => {
  //   const stepCount = 200 / 16;
  //   const stepSize = (end - start) / stepCount;
  //   const val = start + stepSize;
  //   this.barRef.current.style.background = `linear-gradient(90deg, rgb(255,0,0) ${val}%, rgb(100,100,100) ${val}%)`;
  //   if (val <= end) requestAnimationFrame(() => this.animate(val, end));
  // };
  render() {
    const { def, v, singleEntry, options } = this.props;
    return (
      <div className="graph">
        <div className="graph__score">{singleEntry[v]}</div>
        <div
          className="graph__bar"
          style={{
            ...getRowStyle(def[v], singleEntry[v])
          }}
          ref={this.barRef}
          key={singleEntry}
        >
          {validIndicator(def[v], "main") && (
            <CustomIndicator desc="test" type="main" value={20} />
          )}
        </div>
        <style jsx>{`
class CustomBar extends React.Component<PropType, void> {
  render () {
    return ()
  }
}

      .graph {
        display: grid;
        grid-template-columns: ${options.style.height}px 1fr;
      }
      .graph__score {
        display: grid;
        place-content: center;
        border-right: 1px solid rgb(100, 100, 100);
        background: rgb(255, 0, 0);
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
