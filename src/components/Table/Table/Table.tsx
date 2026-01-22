import { TableProps } from "@/types";
import TableHeader from "../TableHeader/TableHeader";
import TableRows from "../TableRows/TableRows";
import classes from "./Table.module.css";

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
  return (
    <table className={classes.table}>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        columns={columns}
      />
    </table>
  );
};

export default Table;
