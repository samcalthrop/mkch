import { Button } from "@/components/ui/button";
import { Controls, MarkovMatrix } from "@/types";
import classes from "./ControlsView.module.css";

export const ControlsView = (): JSX.Element => {

  return (
    <div className={classes.controlsContainer}>
      <Button variant={"default"} className={classes.runButton}>
        {"|> run"}
      </Button>
    </div>
  );
}

const handleClick = (matrix: MarkovMatrix, controls: Controls) => {

}
