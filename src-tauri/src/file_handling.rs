use crate::types::{Arc, Config, MarkovChainData, Node};
use crate::USER_SETTINGS_PATH;
use serde_json::{self, json, Value};
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn save_markov_chain(name: String, chain_data: MarkovChainData) -> std::io::Result<()> {
    let mut proj_dir = PathBuf::from(get_root_directory(USER_SETTINGS_PATH).unwrap());
    proj_dir.push(&name);
    fs::create_dir_all(&proj_dir)?;

    let mut node_file_path: PathBuf = proj_dir.clone();
    let mut arc_file_path: PathBuf = proj_dir.clone();
    node_file_path.push("node.json");
    arc_file_path.push("arc.json");

    let node_json = serde_json::to_string_pretty(&chain_data.nodes).unwrap();
    let arc_json = serde_json::to_string_pretty(&chain_data.arcs).unwrap();

    let mut node_file = File::create(node_file_path)?;
    let mut arc_file = File::create(arc_file_path)?;
    node_file.write_all(node_json.as_bytes())?;
    arc_file.write_all(arc_json.as_bytes())?;

    return Ok(());
}

#[tauri::command]
pub fn fetch_markov_chain(name: String) -> MarkovChainData {
    let mut proj_dir = PathBuf::from(get_root_directory(USER_SETTINGS_PATH).unwrap());
    proj_dir.push(&name);

    let mut node_json_path = proj_dir.clone();
    let mut arc_json_path = proj_dir.clone();

    node_json_path.push("node.json");
    arc_json_path.push("arc.json");

    let node_data_json: String = fs::read_to_string(node_json_path).unwrap();
    let arc_data_json: String = fs::read_to_string(arc_json_path).unwrap();

    let nodes: Vec<Node> = serde_json::from_str(&node_data_json).unwrap();
    let arcs: Vec<Arc> = serde_json::from_str(&arc_data_json).unwrap();

    return MarkovChainData { nodes, arcs };
}

#[tauri::command]
pub fn set_root_directory<P: AsRef<Path>>(
    new_path: &str,
    user_settings_path: P,
) -> std::io::Result<()> {
    let contents = fs::read_to_string(&user_settings_path).unwrap_or_else(|_| "{}".to_string());
    let mut json_value: Value = serde_json::from_str(&contents).unwrap_or_else(|_| json!({}));
    json_value["root_directory_path"] = Value::String(new_path.to_string());

    let updated = serde_json::to_string_pretty(&json_value).unwrap();
    fs::write(user_settings_path, updated)?;
    Ok(())
}

#[tauri::command]
pub fn get_root_directory<P: AsRef<Path>>(user_settings_path: P) -> std::io::Result<String> {
    let json_str: String = fs::read_to_string(user_settings_path)?;
    let config: Config =
        serde_json::from_str(&json_str).expect("missing root dir or shit formatting");
    Ok(config.root_directory_path)
}
