// @flow

import React from "react";
import * as utils from "../utils/customChartUtils";
import { Flipper, Flipped } from "react-flip-toolkit";

import CustomBar from "./CustomBar";
import CustomCell from "./CustomCell";
import CustomHeader from "./CustomHeader";

type PropType = {
  def: Object,
  options: Object
};

type StateType = {
  activeSortDim: string,
  sortDirection: string,
  data: Object[]
};

class CustomChart extends React.Component<PropType, StateType> {
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
    const { def, options, generalOptions } = this.props;
    const { activeSortDim, data, sortDirection } = this.state;
    const headers = utils.getHeaders(def);
    const dataLength = utils.getDataLength(def);
    return (
      <div className="custom-chart" style={{ ...generalOptions }}>
        {!options.hideHeader && (
          <CustomHeader
            {...{
              headers,
              activeSortDim,
              setActiveSortDim: this.setActiveSortDim,
              sortDirection,
              def
            }}
          />
        )}
        <div className="custom-chart__body">
          {data.map((singleEntry, ind) => (
            <div className="body__row" key={`ccb-${ind}`}>
              {headers.map(
                v =>
                  def[v].graph ? (
                    <CustomBar key={v} {...{ v, def, singleEntry, options }} />
                  ) : (
                    <CustomCell
                      key={v}
                      {...{ v, def, value: singleEntry[v], options }}
                    />
                  )
              )}
            </div>
          ))}
        </div>

        <style jsx>{`
          .body__row {
            width: 100%;
            height: ${options.style.height
              ? `${options.style.height}px`
              : `calc(${Math.floor(100 / dataLength)}% - ${options.style
                  .padding || 0 * 2}px)`};
            margin: ${options.style.margin};
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
    stacja: {
      data: [
        "CODO 1",
        "CODO 2",
        "CODO 3",
        "CODO 4",
        "PKN ORLEN",
        "CODO 5",
        "CODO 6",
        "DOFO 1",
        "DOFO 2"
      ]
    },
    ocena: {
      data: [96, 91, 89, 100, 80, 75, 74, 71, 70],
      graph: "bar",
      width: "50%",
      options: {
        indicators: {
          main: false
        }
      }
    },
    zmiana: {
      data: [0, -1, 2, 3, 3, -4, -3, -2, -2],
      style: { fontWeight: 700 }
    },
    "liczba ocen": {
      data: [200, 200, 200, 200, 1800, 200, 200, 200, 200],
      style: { fontWeight: 700 }
    }
  },
  options: {
    defaultSortDim: "ocena",
    style: {
      margin: `40px 0`,
      height: 30
    }
  }
};
