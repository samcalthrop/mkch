// chain types ----------------------------------------------------------------
export interface MarkovNode {
  id: string;
  label?: string;
  position: Coord2D;
  nodes_in: Array<MarkovNode>;
  nodes_out: Array<MarkovNode>;
  radius: number;
}

export interface Arc {
  fromID: string;
  fromLabel?: string;
  toID: string;
  toLabel?: string;
  weight: number;
}

export interface Coord2D {
  x: number;
  y: number;
}

export interface DraggingArcProps {
  fromID: string;
  toPos: Coord2D;
}

export type DirectArrowProps = {
  key: "direct";
  midpoint: Coord2D;
  centringFactor: Coord2D;
  arrowRadius: number;
  angle: number;
}

export type AngularArrowProps = {
  key: "angular";
  midpoint: Coord2D;
  centringFactor: Coord2D;
  arrowRadius: number;
  angle: number;
}

export type LoopArrowProps = {
  key: "loop";
  ctxPos: Coord2D;
}

export type ArrowProps = DirectArrowProps | AngularArrowProps | LoopArrowProps

// backend communicated data
// requires snake_case for variable names

// pub struct Matrix {
//   pub weights_arr: Vec<f64>,
//   pub width: usize,
//   pub height: usize,
// } :

export interface MarkovMatrix {
  weightsArr: Array<number>; // weight of each arc
  width: number; // width of matrix
  height: number; // height of matrix
}

// #[derive(Debug)]
// pub struct MatrixError {
//   pub error_code: usize,
//   pub reason: String,
// } :

export interface MatrixError {
  error_code: number;
  reason: string;
}

// layout props ---------------------------------------------------------------

export type BoxViewProps = {
  title: string
  children: React.ReactNode
}

// theme types ----------------------------------------------------------------
export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// shared data types ----------------------------------------------------------
export type SharedDataProviderProps = {
  children: React.ReactNode;
};

export type SharedData = {
  projectDirectoryPath?: string;
  setProjectDirectoryPath: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentNodes: Array<MarkovNode> | null;
  setCurrentNodes: React.Dispatch<React.SetStateAction<Array<MarkovNode> | null>>;
  currentArcs: Array<Arc> | null;
  setCurrentArcs: React.Dispatch<React.SetStateAction<Array<Arc> | null>>;
};

// table types ----------------------------------------------------------------
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
}

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onCellChange?: (params: { rowIndex: number; columnKey: K; value: string; }) => void;
}

export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

export type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onCellChange?: (params: { rowIndex: number; columnKey: K; value: string; }) => void;
}

// export type CellTextBoxProps<T, K extends keyof T> = {
//   rowIndex: number;
//   columnKey: K;
//   value: string;
//   row: T;
// }

// controls types

export type Controls = {
  tolerance: number;
  maxIterations: number;
}

export type ControlsModuleProps = {
  settingName: string;
  description: string;
}
