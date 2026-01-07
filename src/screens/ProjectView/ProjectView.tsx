import { MarkovView } from "../MarkovView";
import { Mosaic, MosaicWindow } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import classes from "./ProjectView.module.css";

import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export const ProjectView = (): JSX.Element => {
  return (
    <div className={classes.base}>
      <Mosaic
        className={classes.mosaicDiv}
        renderTile={(id, path) => (
          <MosaicWindow
            className={classes.tile}
            path={path}
            title={getTitleForId(id)}
            draggable
          >
            {ELEMENT_MAP[id as keyof typeof ELEMENT_MAP] || (
              <div>UNKNOWN VIEW: {id}</div>
            )}
          </MosaicWindow>
        )}
        initialValue={{
          direction: "row",
          first: "chain",
          second: {
            direction: "column",
            first: "graph",
            second: "controls",
          },
        }}
      />
    </div>
  );
};

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  chain: <MarkovView />,
  graph: <></>,
  controls: <></>,
};

const getTitleForId = (id: string): string => {
  const titles: { [key: string]: string } = {
    chain: "CHAIN",
    graph: "GRAPH",
    controls: "PARAMETERS",
  };
  return titles[id] || id;
};
