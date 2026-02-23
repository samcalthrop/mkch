mod file_handling;
mod markov_logic;
mod matrix;
mod types;

use markov_logic::{get_steady_state_result, print_ln_on_backend};
use tauri::{WebviewUrl, WebviewWindowBuilder};

// pub const USER_SETTINGS_PATH: &str = "./user_settings.json";
pub const USER_SETTINGS_PATH: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/user_settings.json");

pub trait WindowExt {
  #[cfg(target_os = "macos")]
  fn set_transparent_titlebar(&self, transparent: bool);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      print_ln_on_backend,
      get_steady_state_result
    ])
    .plugin(tauri_plugin_opener::init())
    .setup(|app| {
      let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
        .title("mk.ch")
        .inner_size(800.0, 600.0)
        .title_bar_style(tauri::TitleBarStyle::Overlay);

      let _window = win_builder.build().unwrap();

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
