import { TableHeaderProps } from "@/types";
import classes from "./TableHeader.module.css";

const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        className={classes.tableHeader}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead className={classes.tHead}>
      <tr className={classes.outerTableHeader}>{headers}</tr>
    </thead>
  );
};

export default TableHeader;
