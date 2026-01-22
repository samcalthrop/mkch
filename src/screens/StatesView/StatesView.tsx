import { useSharedData } from "@/components/SharedDataProvider/SharedDataProvider";
import Table from "@/components/Table/Table/Table";
import { ColumnDefinitionType, MarkovNode } from "@/types";
import classes from "./StatesView.module.css";

export const StatesView = (): JSX.Element => {
  const { currentNodes } = useSharedData();
  const columns: ColumnDefinitionType<MarkovNode, keyof MarkovNode>[] = [
    {
      key: 'label',
      header: 'State',
      width: 150
    },
    {
      key: 'position',
      header: 'Position',
    },
    {
      key: 'id',
      header: 'id'
    }
  ]

  return (
    <div className={classes.tableContainer}>
      <Table data={currentNodes ?? []} columns={columns} />
    </div>
  )
};
