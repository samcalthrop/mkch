use serde::{Deserialize, Serialize};

pub const EPSILON: f64 = 1e-10;

// diagram data
#[derive(Serialize, Deserialize)]
pub struct Node {
  pub id: f64,
  pub label: String,
  pub position: Position,
  pub arcs_in: Vec<Node>,
  pub arcs_out: Vec<Node>,
}

#[derive(Serialize, Deserialize)]
pub struct Position {
  pub x: f64,
  pub y: f64,
}

#[derive(Serialize, Deserialize)]
pub struct Arc {
  pub id: String,
  pub source: String,
  pub target: String,
}

#[derive(Deserialize)]
pub struct Config {
  pub root_directory_path: String,
}

#[derive(Serialize, Deserialize)]
pub struct MarkovChainData {
  pub nodes: Vec<Node>,
  pub arcs: Vec<Arc>,
}

pub struct GraphDataPoint {
  // range between 0-1
  pub probability: u64,
  // time-slice at which probability is obtained
  pub instant: usize,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Matrix {
  pub weights_arr: Vec<f64>,
  pub width: usize,
  pub height: usize,
}

#[derive(Debug)]
pub struct MatrixError {
  pub error_code: usize,
  pub reason: String,
}
