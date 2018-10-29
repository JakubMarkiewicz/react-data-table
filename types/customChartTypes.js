// CustomChart

type $CustomChartOptions = {
  headerStyle?: Object,
  headerElementStyle?: Object,
  generalStyle?: Object,
  style?: Object,
  colorScheme?: string[],
  defaultSortDim?: string,
  hideHeader?: boolean,
  virtualize?: boolean
};

type $CustomChartDefOptions = {
  indicators?: {
    main?: boolean,
    mainData?: string[] | number[],
    secondary?: boolean,
    secondaryData?: string[] | number[]
  }
};

type $CustomChartDef = {
  [string]: {
    data: string[] | number[],
    graph?: string,
    options?: $CustomChartDefOptions,
    style?: Object,
    width?: string | number // TODO: allow passing number as width (px),
  }
};

type $CustomChartProps = {
  def: $CustomChartDef,
  options?: $CustomChartOptions
};

type $CustomChartState = {
  activeSortDim: string,
  data: Object[],
  sortDirection: string
};

// CustomBar

type $CustomBarProps = {
  options?: $CustomChartOptions,
  columnName: string,
  entry: Object,
  def: $CustomChartDef
};

// CustomCell

type $CustomCellProps = {
  def: $CustomChartDef,
  columnName: string,
  options?: $CustomChartOptions,
  value: number | string
};

// CustomIndicator

type $CustomIndicatorProps = {
  title: string | number,
  type: "main" | "secondary",
  value: number
};

// CustomHeader

type $CustomHeaderProps = {
  headers: mixed[],
  activeSortDim: string,
  setActiveSortDim: Function,
  sortDirecion: string,
  def: $CustomChartDef,
  options: $Cust
};
