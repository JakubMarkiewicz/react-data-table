// @flow

const validateHeaders = (headers: mixed[]) =>
  headers.every(v => v === "") ? [] : headers;

export const getHeaders = (def: Object, data: Object[]): any[] =>
  validateHeaders(
    Object.entries(def).map(([k, v]) => {
      if (Object.keys(data[0]).includes(k)) {
        return v.title || k;
      }
      return "";
    })
  ).filter(v => v !== "");

export const getDataLength = (def: Object) =>
  Math.max(...Object.values(def).map(v => v.data.length));

export const getValues = (def: Object): Array<Array<number>> =>
  [...Array(getDataLength(def))].map((v, ind) =>
    Object.values(def).map(v => v.data[ind])
  );

export const generateColumnSizes = (def: Object, headers: string[]) =>
  headers &&
  Object.entries(def)
    .filter(([k, v]) => headers.includes(k) || headers.includes(v.title))
    .map(([k, v]) => v.width || "1fr")
    .join(" ");

export const getRowStyle = (
  data: Object,
  v?: number,
  colorScheme?: string[]
) => {
  let res = {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    textAlign: "center",
    alignContent: "center",
    whiteSpace: "nowrap"
  };
  if (data.graph && typeof v === "number") {
    res = {
      ...res,
      position: "relative",
      color: "#fff",
      background: `linear-gradient(90deg, ${colorScheme[0]} ${v}%, ${
        colorScheme[1]
      } ${v}%)`,
      borderTopRightRadius: "3px",
      borderBottomRightRadius: "3px"
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
