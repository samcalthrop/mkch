import { BoxViewProps } from "@/types";
import classes from "./ResizableBox.module.css";

export const ResizableBox = ({ title, children }: BoxViewProps): JSX.Element => {
  return (
    <div className={classes.boxContainer}>
      <div className={classes.boxTitlebar}>
        <p className={classes.titleText}>{title}</p>
      </div>
      <div className={classes.boxContent}>
        {children}
      </div>
    </div>
  );
}
