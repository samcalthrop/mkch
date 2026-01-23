import { MarkovView } from "../MarkovView";
import classes from "./ProjectView.module.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { StatesView } from "../StatesView";
import { ResizableBox } from "@/components/ResizableBox";

export const ProjectView = (): JSX.Element => {
  const resize = (e: MouseEvent, axis: "x" | "y", onResize: (delta: number) => void): void => {
    e.preventDefault();
    const start = axis == "x" ? e.clientX : e.clientY;

    const move = (ev: MouseEvent) => {
      const current = axis == "x" ? ev.clientX : ev.clientY;
      onResize(current - start);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };

  return (
    <div className={classes.primaryContainer}>
      <div className={classes.chainBox}>
        <ResizableBox title="Chain">
          <MarkovView />
        </ResizableBox>
      </div>
      <div className={classes.secondaryContainer}>
        <div className={classes.tertiaryContainer}>
          <div className={classes.statesBox}>
            <ResizableBox title="States">
              <StatesView />
            </ResizableBox>
          </div>
          <div className={classes.controlsBox}>
            <ResizableBox title="Controls"><></></ResizableBox>
          </div>
        </div>
        <div className={classes.graphBox}>
          <ResizableBox title="Graph"><></></ResizableBox>
        </div>
        <div className={classes.resizeVertical} onMouseDown={(e) => startResize} />
        <div className={classes.resizeHorizontal} />
        <div className={classes.resizeVerticalInner} />
      </div>
    </div >
  );
};
