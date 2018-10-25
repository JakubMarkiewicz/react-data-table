// @flow

import React from "react";
import { FixedSizeList as List } from "react-window";
import * as utils from "../utils/customChartUtils";

import CustomBar from "./CustomBar";
import CustomCell from "./CustomCell";
import CustomHeader from "./CustomHeader";

class CustomChart extends React.PureComponent<
  $CustomChartProps,
  $CustomChartState
> {
  chartRef = React.createRef();

  state = {
    activeSortDim: this.props.options.defaultSortDim || "",
    data: utils.traverseChartData(this.props.def),
    sortDirection: "descending"
  };

  componentDidMount() {
    this.setState(prevState => ({
      data: utils.sortByDim(
        prevState.data,
        prevState.activeSortDim,
        prevState.sortDirection
      )
    }));
  }

  setActiveSortDim = (dim: string) =>
    this.setState(prevState => ({
      activeSortDim: dim,
      data: utils.sortByDim(
        prevState.data,
        dim,
        utils.resolveNewDirection(
          prevState.activeSortDim,
          dim,
          prevState.sortDirection
        )
      ),
      sortDirection: utils.resolveNewDirection(
        prevState.activeSortDim,
        dim,
        prevState.sortDirection
      )
    }));

  render() {
    const { def, options } = this.props;
    const { activeSortDim, data, sortDirection } = this.state;
    const headers = utils.getHeaders(def);
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
        <div className="custom-chart__body">
          <List
            height={500}
            itemCount={data.length}
            itemSize={
              options.style.height +
              Number(
                options.style.margin.slice(
                  0,
                  options.style.margin.indexOf("px")
                ) * 2
              )
            }
          >
            {({ index, style }) => (
              <div className="body__row" key={`ccb-${index}`} style={style}>
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
                        {...{ options, options }}
                      />
                    )
                )}
              </div>
            )}
          </List>
        </div>

        <style jsx>{`
          * {
            box-sizing: border-box;
          }
          .body__row {
            width: 100%;
            padding: ${options.style.margin || 0};
            display: grid;
            grid-template-columns: ${utils.generateColumnSizes(def)};
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}

export default CustomChart;

CustomChart.defaultProps = {
  def: {
    title: {
      data: [
        "Title 1",
        "Title 2",
        "Title 3",
        "Title 4",
        "Title 5",
        "Title 6",
        "Title 7",
        "Title 8",
        "Title 9"
      ]
    },
    score: {
      data: [96, 91, 89, 100, 80, 75, 74, 71, 70],
      graph: "bar",
      width: "50%"
    },
    count: {
      data: [200, 200, 200, 200, 1800, 200, 200, 200, 200],
      style: { fontWeight: 700 }
    }
  },
  options: {
    defaultSortDim: "ocena",
    style: {
      margin: `20px 0`,
      height: 30
    }
  }
};
