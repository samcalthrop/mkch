import { MarkovView } from "../MarkovView";
import classes from "./ProjectView.module.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BoxViewProps } from "@/types";
import { StatesView } from "../StatesView";

const BoxView = ({ title, children }: BoxViewProps): JSX.Element => {
  return (
    <>
      <div className={classes.boxTitlebar}>
        {title}
      </div>
      <div className={classes.boxContent}>
        {children}
      </div>
    </>
  )
}

export const ProjectView = (): JSX.Element => {
  return (
    <div className={classes.primaryContainer}>
      <div className={classes.chainBox}>
        <BoxView title="Chain">
          <MarkovView />
        </BoxView>
      </div>
      <div className={classes.secondaryContainer}>
        <div className={classes.tertiaryContainer}>
          <div className={classes.statesBox}>
            <BoxView title="States">
              <StatesView />
            </BoxView>
          </div>
          <div className={classes.controlsBox}>
            <BoxView title="Controls"><></></BoxView>
          </div>
        </div>
        <div className={classes.graphBox}>
          <BoxView title="Graph"><></></BoxView>
        </div>
      </div>
    </div >
  );
};
