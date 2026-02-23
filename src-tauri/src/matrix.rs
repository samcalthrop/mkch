use crate::types::{GraphDataPoint, Matrix, MatrixError, EPSILON};

impl Matrix {
  // OK
  pub fn new(states_arr: Vec<String>, weights_arr: Vec<f64>, height: usize, width: usize) -> Self {
    Self {
      states_arr,
      weights_arr,
      width: width,
      height: height,
      // is_square: height == width,
    }
  }

  // OK
  fn index(&self, row: usize, col: usize) -> usize {
    row * self.width + col
  }

  // OK
  pub fn get(&self, row: usize, col: usize) -> f64 {
    self.weights_arr[self.index(row, col)]
  }

  // OK
  fn set(&mut self, row: usize, col: usize, val: f64) {
    let i = self.index(row, col);
    self.weights_arr[i] = val;
  }

  // OK
  pub fn multiply(m1: &Matrix, m2: &Matrix) -> Result<Matrix, MatrixError> {
    if m1.width != m2.height {
      return Err(MatrixError {
        error_code: 1,
        reason: "Dimension Error: mat1 width != m2 height; cannot multiply".into(),
      });
    } else {
      let result_width: usize = m2.width;
      let result_height: usize = m1.height;
      let result_array: Vec<f64> = vec![0.0; result_width * result_height];
      let mut result: Matrix = Matrix::new(
        m1.states_arr.clone(),
        result_array,
        result_height,
        result_width,
      );
      let mut temp: f64 = 0.0;
      // iterate through m1 rows
      for row1 in 0..m1.height {
        // iterate through m2 columns
        for column2 in 0..m2.width {
          // iterate through m1 columns
          for column1 in 0..m1.width {
            temp += m1.get(row1, column1) * m2.get(column1, column2);
          }
          result.set(row1, column2, temp);
          temp = 0.0;
        }
      }
      Ok(result)
    }
  }

  // OK
  pub fn add(m1: &Matrix, m2: &Matrix) -> Result<Matrix, MatrixError> {
    let width = m1.width;
    let height = m1.height;
    if !(width == m2.width && height == m2.height) {
      return Err(MatrixError {
        error_code: 1,
        reason: "Dimension Error: Matrices must have same dimensions to be added.".into(),
      });
    } else {
      let mut result: Matrix = Matrix::new(
        m1.states_arr.clone(),
        vec![0.0; width * height],
        height,
        width,
      );
      for row in 0..m1.height {
        for column in 0..m1.width {
          result.set(row, column, m1.get(row, column) + m2.get(row, column));
        }
      }
      Ok(result)
    }
  }

  // OK
  pub fn subtract(m1: &Matrix, m2: &Matrix) -> Result<Matrix, MatrixError> {
    let width = m1.width;
    let height = m1.height;
    if !(width == m2.width && height == m2.height) {
      return Err(MatrixError {
        error_code: 1,
        reason: "Dimension Error: Matrices must have same dimensions to be added.".into(),
      });
    } else {
      let mut result: Matrix = Matrix::new(
        m1.states_arr.clone(),
        vec![0.0; width * height],
        height,
        width,
      );
      for row in 0..m1.height {
        for column in 0..m1.width {
          result.set(row, column, m1.get(row, column) - m2.get(row, column));
        }
      }
      Ok(result)
    }
  }

  // OK ?
  pub async fn steady_state(
    &self,
    mut state_matrix: Matrix,
    max_iterations: usize,
    tolerance: f64,
  ) -> Result<Matrix, MatrixError> {
    let is_square: bool = self.width == self.height;
    if !(is_square) {
      Err(MatrixError {
        error_code: 1,
        reason: "Dimension Error: Matrix must be square.".into(),
      })
    } else if self.height != state_matrix.height {
      Err(MatrixError {
        error_code: 1,
        reason: "Dimension Error: Matrix dimensions incompatible with state matrix dimensions."
          .into(),
      })
    } else {
      // check column probabilities sum to 1 (within tolerance)
      for column in 0..self.width {
        let mut sum: f64 = 0.0;
        for row in 0..self.height {
          sum += self.get(row, column);
        }
        if (sum - 1.0).abs() > EPSILON {
          return Err(MatrixError {
                        error_code: 2,
                        reason: "Probability Error: Probabilities do not sum to 1 (within tolerance) in all columns of matrix.".into(),
                    });
        }
      }
      // let data: Vec<GraphDataPoint> = Vec::new();
      for _ in 0..max_iterations {
        let next_state: Matrix = Matrix::multiply(self, &state_matrix).unwrap();
        // calculate deltas
        let mut flag: bool = true;
        for i in 0..self.height {
          if (next_state.weights_arr[i] - state_matrix.weights_arr[i]).abs() > tolerance {
            flag = false;
          }
          // data[i] = {};
        }
        if flag {
          return Ok(state_matrix);
        }
        state_matrix = next_state;
      }
      Ok(state_matrix)
    }
  }

  // OK
  pub fn log(&self) {
    for i in 0..self.height {
      print!("{} --> [ ", self.states_arr[i]);
      for j in 0..self.width {
        print!("{} ", self.weights_arr[self.index(i, j)]);
      }
      println!("]");
    }
  }
}
