// @flow

import React from "react";
import * as utils from "../utils/customChartUtils";
import CustomTableBody from "./CustomTableBody";
import CustomHeader from "./CustomHeader";
import isEqual from "lodash/isEqual";

class CustomChart extends React.PureComponent<
  $CustomChartProps,
  $CustomChartState
> {
  chartRef = React.createRef();

  state = {
    activeSortDim: this.props.options.defaultSortDim || "",
    data: this.props.data,
    sortDirection: "descending",
    def: this.props.def
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.def, prevState.def)) {
      return {
        data: utils.traverseChartData(nextProps.def),
        def: nextProps.def
      };
    }
  }

  componentDidMount() {
    this.setState(({ data, activeSortDim, sortDirection }) => ({
      data: utils.sortByDim(data, activeSortDim, sortDirection)
    }));
  }

  setActiveSortDim = (dim: string) =>
    this.setState(({ data, activeSortDim, sortDirection }) => ({
      activeSortDim: dim,
      data: utils.sortByDim(
        data,
        dim,
        utils.resolveNewDirection(activeSortDim, dim, sortDirection)
      ),
      sortDirection: utils.resolveNewDirection(
        activeSortDim,
        dim,
        sortDirection
      )
    }));

  render() {
    const { def, options } = this.props;
    const { activeSortDim, data, sortDirection } = this.state;
    const headers = utils.getHeaders(def, data);
    return (
      <div className="custom-chart" style={{ ...options.generalStyle }}>
        {!options.hideHeader && (
          <CustomHeader
            {...{
              headers,
              activeSortDim,
              setActiveSortDim: this.setActiveSortDim,
              sortDirection,
              def,
              options
            }}
          />
        )}
        <CustomTableBody {...{ options, headers, data, def, utils }} />
      </div>
    );
  }
}

export default CustomChart;

CustomChart.defaultProps = {
  def: {
    title: {
      data: [...Array(300)].map((v, i) => `Title ${i}`)
    },
    score: {
      data: [...Array(300)].map((v, i) => Math.floor(Math.random() * 101)),
      graph: "bar",
      width: "50%"
    },
    count: {
      data: [...Array(300)].map((v, i) => Math.floor(Math.random() * 101)),
      style: { fontWeight: 700 }
    }
  },
  options: {
    virtualize: true,
    defaultSortDim: "ocena",
    style: {
      margin: `20px 0`,
      height: 30
    },
    colorScheme: ["rgb(50,150,50)", "rgb(200, 200, 200)"]
  }
};
