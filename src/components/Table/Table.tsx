import { Arc, TableHeaderProps, TableProps, TableRowsProps } from "@/types";
import classes from "./Table.module.css";
import React from "react";

const Table = <T, K extends keyof T>({ data, columns, onCellChange }: TableProps<T, K>): JSX.Element => {
  return (
    <table className={classes.table}>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        columns={columns}
        onCellChange={onCellChange}
      />
    </table>
  );
};

const TableRows = <T, K extends keyof T>({ data, columns, onCellChange }: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`} className={classes.tableRow}>
        {columns.map((column, colIndex) => {
          const cellValue = row[column.key];

          return (
            <td key={`cell-${colIndex}`} className={classes.tableData}>
              {/*<div contentEditable className={classes.textbox}>*/}
              <input
                className={classes.textbox}
                value={String(cellValue ?? "")}
                onChange={(e) => onCellChange?.({ rowIndex, columnKey: column.key, value: e.target.value })} />
              {
                typeof cellValue === 'object' && cellValue !== null
                  ? JSON.stringify(cellValue)
                  : cellValue as React.ReactNode
              }
              {/*</div>*/}
            </td>
          );
        })
        }
      </tr >
    );
  });

  return (
    <tbody className={classes.tableBody}>
      {rows}
    </tbody>
  );
};

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

export default Table;
