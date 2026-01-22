import { TableRowsProps } from "@/types";
import classes from "./TableRows.module.css";

const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} className={classes.tableRow}>
        {columns.map((column, index2) => {
          const cellValue = row[column.key];
          return (
            <td key={`cell-${index2}`} className={classes.tableData}>
              {typeof cellValue === 'object' && cellValue !== null
                ? JSON.stringify(cellValue)
                : cellValue as React.ReactNode}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <tbody className={classes.tableBody}>
      {rows}
    </tbody>
  );
};

export default TableRows;
