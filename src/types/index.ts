export interface Node {
  id: string;
  label?: string;
  position: Coord2D;
  nodes_in: Array<Node>;
  nodes_out: Array<Node>;
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
