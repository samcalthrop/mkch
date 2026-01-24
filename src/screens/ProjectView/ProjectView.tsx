import { MarkovView } from "../MarkovView";
import { StatesView } from "../StatesView";
import { ResizableBox } from "@/components/ResizableBox";
import classes from "./ProjectView.module.css";

export const ProjectView = (): JSX.Element => {
  const startResize = (
    e: React.MouseEvent,
    axis: "x" | "y",
    onResize: (client: number) => void
  ) => {
    e.preventDefault();

    const move = (ev: MouseEvent) => {
      const value = axis === "x" ? ev.clientX : ev.clientY;
      onResize(value);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  const resizeLeft = (clientX: number) => {
    const container = document.querySelector(`.${classes.primaryContainer}`)!;
    const rect = container.getBoundingClientRect();

    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(60, Math.max(20, percent));

    document.documentElement.style.setProperty("--left", `${clamped}%`);
  };

  const resizeTop = (clientY: number) => {
    const container = document.querySelector(`.${classes.secondaryContainer}`)!;
    const rect = container.getBoundingClientRect();

    const percent = ((clientY - rect.top) / rect.height) * 100;
    const clamped = Math.min(70, Math.max(30, percent));

    document.documentElement.style.setProperty("--top", `${clamped}%`);
  };

  const resizeInnerRight = (clientX: number) => {
    const container = document.querySelector(`.${classes.tertiaryContainer}`)!;
    const rect = container.getBoundingClientRect();

    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(70, Math.max(30, percent));

    document.documentElement.style.setProperty("--right-inner", `${clamped}%`);
  };

  return (
    <div className={classes.primaryContainer}>
      <div className={classes.chainBox}>
        <ResizableBox title="Chain">
          <MarkovView />
        </ResizableBox>
      </div>

      {/* Vertical resizer: left ↔ right */}
      <div
        className={classes.resizeVertical}
        onMouseDown={(e) =>
          startResize(e, "x", resizeLeft)
        }
      />

      <div className={classes.secondaryContainer}>
        <div className={classes.tertiaryContainer}>
          <div className={classes.statesBox}>
            <ResizableBox title="States">
              <StatesView />
            </ResizableBox>
          </div>

          {/* Inner vertical resizer */}
          <div
            className={classes.resizeVerticalInner}
            onMouseDown={(e) =>
              startResize(e, "x", resizeInnerRight)
            }
          />

          <div className={classes.controlsBox}>
            <ResizableBox title="Controls">
              <></>
            </ResizableBox>
          </div>
        </div>

        {/* Horizontal resizer */}
        <div
          className={classes.resizeHorizontal}
          onMouseDown={(e) =>
            startResize(e, "y", resizeTop)
          }
        />

        <div className={classes.graphBox}>
          <ResizableBox title="Graph" >
            <></>
          </ResizableBox>
        </div>
      </div>
    </div >
  );
};
