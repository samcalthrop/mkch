import { Outlet } from "react-router-dom";
import { TitleBar } from "./TitleBar";


export function WindowShell() {
  return (
    <div className="window">
      <div className="titlebar" data-tauri-drag-region>
        <TitleBar />
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
