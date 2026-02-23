import classes from "./TitleBar.module.css";

export function TitleBar() {
  return (
    <div className={classes.titlebar} data-tauri-drag-region>
      <div className={classes.trafficLightsSpacer} />
      <div className={classes.appTitle}></div>
      <div className={classes.pointer}>{"⟩"}</div>
      <div className={classes.projectPath}>path-to-project</div>
      <div className={classes.titlebarContent} data-tauri-drag-region></div>
    </div>
  )
}
