import { MarkovView } from "../MarkovView";
import { StatesView } from "../StatesView";
import { ResizableBox } from "@/components/ResizableBox";
import classes from "./ProjectView.module.css";
import { GraphView } from "../GraphView/GraphView";
import { invoke } from '@tauri-apps/api/core';
import { MarkovMatrix } from "@/types";

invoke('print_ln_on_backend');

const state: MarkovMatrix = {
  statesArr: ["State A", "State B"],
  weightsArr: [1, 0],
  width: 1,
  height: 2,
}
const matrix: MarkovMatrix = {
  statesArr: ["State A", "State B"],
  weightsArr: [.5, .1, .5, .9],
  width: 2,
  height: 2,
}

try {
  const result: MarkovMatrix = await invoke<MarkovMatrix>('get_steady_state_result', {
    graph_matrix: matrix,
    state_matrix: state,
    max_iterations: 1000
  });
  console.log(result);
} catch (e) {
  console.error(e);
}

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
        <ResizableBox title="chain">
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
            <ResizableBox title="states">
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
            <ResizableBox title="controls">
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
          <ResizableBox title="graph" >
            <GraphView />
          </ResizableBox>
        </div>
      </div>
    </div >
  );
};
