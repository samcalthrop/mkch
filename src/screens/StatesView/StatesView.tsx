import { useSharedData } from "@/components/SharedDataProvider/SharedDataProvider";
import Table from "@/components/Table/Table/Table";
import { Arc, ColumnDefinitionType } from "@/types";
import classes from "./StatesView.module.css";

export const StatesView = (): JSX.Element => {
  const { currentArcs } = useSharedData();
  const columns: ColumnDefinitionType<Arc, keyof Arc>[] = [
    {
      key: 'fromLabel',
      header: 'From',
    },
    {
      key: 'toLabel',
      header: 'To',
    },
    {
      key: 'weight',
      header: 'Weight'
    }
  ]

  return (
    <div className={classes.tableContainer}>
      <Table data={currentArcs ?? []} columns={columns} />
    </div>
  )
};
