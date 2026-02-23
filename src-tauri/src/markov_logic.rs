use crate::types::{Matrix, EPSILON};

// #[tauri::command]
// pub async fn get_steady_state_data_points(
//   graph_matrix: Matrix,
//   state_matrix: Matrix,
//   max_iterations: usize,
//   tolerance: Option<u64>,
// ) {
//   let data: Vec<GraphDataPoint> = Vec::new();
// }

#[tauri::command(rename_all = "snake_case")]
pub async fn get_steady_state_result(
  graph_matrix: Matrix,
  state_matrix: Matrix,
  max_iterations: usize,
  tolerance: Option<f64>,
) -> Result<Matrix, String> {
  let tolerance = tolerance.unwrap_or(EPSILON);
  let steady_state: Matrix = graph_matrix
    .steady_state(state_matrix, max_iterations, tolerance)
    .await
    .map_err(|e| {
      format!(
        "Failed to compute steady state.\n\nError Code: {}\nReason: {}",
        e.error_code, e.reason
      )
    })?;
  Ok(steady_state)
}

#[tauri::command]
pub fn print_ln_on_backend() {
  println!("printed via typescript");
}
