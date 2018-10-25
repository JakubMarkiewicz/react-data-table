// @flow

const validateHeaders = (headers: mixed[]) =>
  headers.every(v => v === "") ? [] : headers;

export const getHeaders = (def: Object): any[] =>
  validateHeaders(Object.entries(def).map(([k, v]) => v.title || k));

export const getDataLength = (def: Object) =>
  Math.max(...Object.values(def).map(v => v.data.length));

export const getValues = (def: Object): Array<Array<number>> =>
  [...Array(getDataLength(def))].map((v, ind) =>
    Object.values(def).map(v => v.data[ind])
  );

export const generateColumnSizes = (def: Object) =>
  Object.values(def)
    .map(v => v.width || "1fr")
    .join(" ");

const getTitles = obj => Object.entries(obj).map(([k, v]) => v.title || k);

const getVal = obj => Object.values(obj).map(v => v.data);

export const traverseChartData = (obj: Object) =>
  [...Array(getDataLength(obj))].map((v, mInd) =>
    getTitles(obj).reduce((acc, v, ind) => {
      if (Object.values(obj)[ind].graph && Object.values(obj)[ind].options) {
        return {
          ...acc,
          [v]: getVal(obj)[ind][mInd],
          [`${v}ind`]: Object.values(obj)[ind].options.indicators.mainData[mInd]
        };
      }
      return { ...acc, [v]: getVal(obj)[ind][mInd] };
    }, {})
  );

export const getRowStyle = (data: Object, v?: number) => {
  let res = {
    width: "100%",
    height: "100",
    display: "grid",
    // placeContent: 'center',
    whiteSpace: "nowrap"
  };
  if (data?.graph && v) {
    res = {
      ...res,
      position: "relative",
      color: "#fff",
      background: `linear-gradient(90deg, rgb(0,0,0) ${v}%, rgb(100,0,0) ${v}%)`
    };
  }
  if (data && data.style) {
    res = { ...res, ...data.style };
  }

  return res;
};

const sortingDef = {
  descending: (a, b, dim) => (a[dim] < b[dim] ? 1 : b[dim] < a[dim] ? -1 : 0),
  ascending: (a, b, dim) => (a[dim] > b[dim] ? 1 : b[dim] > a[dim] ? -1 : 0)
};

export const sortByDim = (
  data: Object[],
  dim: string,
  direction: string = "descending"
): Object[] => data.sort((a, b) => sortingDef[direction](a, b, dim));

const changeDirection = direction =>
  direction === "descending" ? "ascending" : "descending";

export const resolveNewDirection = (
  prevDim: string,
  newDim: string,
  direction: string
) => (prevDim === newDim ? changeDirection(direction) : "descending");

export const validIndicator = (def, type) =>
  def.options && def.options.indicators && def.options.indicators[type];
