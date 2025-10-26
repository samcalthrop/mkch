use serde::{Deserialize, Serialize};

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
