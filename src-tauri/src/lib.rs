mod file_handling;
mod types;

use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

// pub const USER_SETTINGS_PATH: &str = "./user_settings.json";
pub const USER_SETTINGS_PATH: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/user_settings.json");

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("flow")
                .inner_size(800.0, 600.0);

            let window = win_builder.build().unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
