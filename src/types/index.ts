
export interface Node {
  id: number;
  label?: string;
  position: Coord2D;
  nodes_in: Array<Node>;
  nodes_out: Array<Node>;
};

export interface Arc {
  from: number;
  to: number;
};

export interface Coord2D {
  x: number;
  y: number;
}
