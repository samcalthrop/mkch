import { Button } from "@/components/ui/button";
import { Controls, ControlsModuleProps, MarkovMatrix } from "@/types";
import classes from "./ControlsView.module.css";
import { Slider } from "@/components/ui/slider";

export const ControlsView = (): JSX.Element => {
  const MAX_ITERATIONS = 1000;
  const MIN_ITERATIONS = 10;
  const MAX_TOLERANCE = 1e-2;
  const MIN_TOLERANCE = 1e-10;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.controlsContainer}>
        <ControlModule settingName="max. iterations" description="hi." />

        <ControlModule settingName="tolerance" description="hello." />

        <div className={classes.runButtonContainer}>
          <div className={classes.runButtonContent}>
            <Button variant={"default"} className={classes.runButton}>
              {"|> run"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ControlModule = ({ settingName, description }: ControlsModuleProps): JSX.Element => {
  return (
    <div className={classes.controlModuleContainer}>
      <div className={classes.controlModule}>
        <h2>{settingName}</h2>
        <span>{description}</span>
        <Slider className={classes.controlSlider} />
      </div>
    </div>
  );
}

const handleClick = (matrix: MarkovMatrix, controls: Controls) => { }
