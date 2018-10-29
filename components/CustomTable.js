// @flow

import React from "react";
import * as utils from "../utils/customChartUtils";
import CustomTableBody from "./CustomTableBody";
import CustomHeader from "./CustomHeader";
import isEqual from "lodash/isEqual";

class CustomTable extends React.PureComponent<
  $CustomChartProps,
  $CustomChartState
> {
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
      <div className="custom-table" style={{ ...options.theme.tableStyle }}>
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

export default CustomTable;
