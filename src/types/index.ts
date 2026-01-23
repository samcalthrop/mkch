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
  toID: string;
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
}

export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

export type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}
