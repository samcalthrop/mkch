import { useSharedData } from "@/components/SharedDataProvider/SharedDataProvider";
import { Arc, ColumnDefinitionType } from "@/types";
import classes from "./StatesView.module.css";
// import Table from "@/components/Table/Table";

export const StatesView = (): JSX.Element => {
  const { currentArcs, setCurrentArcs, currentNodes, setCurrentNodes } = useSharedData();
  // const columns: ColumnDefinitionType<Arc, keyof Arc>[] = [
  //   {
  //     key: 'fromLabel',
  //     header: 'From',
  //   },
  //   {
  //     key: 'toLabel',
  //     header: 'To',
  //   },
  //   {
  //     key: 'weight',
  //     header: 'Weight'
  //   }
  // ]

  currentArcs?.forEach((arc) => {
    console.log(arc);
  });

  const columns = useMemo<ColumnDef<Arc>[]>(
    () => [
      {
        accessorKey: 'fromLabel',
        header: 'from'
      },
      {
        accessorKey: 'toLabel',
        header: 'to',
      },
      {
        accessorKey: 'weight',
        header: 'weight',
      },
    ],
    [],
  )

  const data = useMemo(() => currentArcs ?? [], [currentArcs]);

  const table = useReactTable({
    data: data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setCurrentArcs(old =>
          old
            ? old.map((row, index) =>
              index === rowIndex ? { ...row, [columnId]: value } : row
            )
            : null
        );
        if (columnId == "fromLabel" || columnId == "toLabel") {
          const arc = currentArcs?.[rowIndex];
          if (arc && typeof value == "string") {
            const nodeId = columnId == "fromLabel" ? arc.fromID : arc.toID;
            setCurrentNodes((prev) => {
              if (!prev) return prev;
              return prev.map((n) => n.id == nodeId ? { ...n, label: value } : n);
            });

            setCurrentArcs((old) => {
              if (!old) return old;
              return old.map((row) => {
                const fromMatch = row.fromID === nodeId;
                const toMatch = row.toID === nodeId;
                if (!fromMatch && !toMatch) return row;
                return {
                  ...row,
                  ...(fromMatch && { fromLabel: value }),
                  ...(toMatch && { toLabel: value }),
                };
              });
            });
          }
        }
      },
    },
    debugTable: true,
  })

  return (
    <div className={classes.tableContainer}>
      {/*<Table data={currentArcs ?? []} columns={columns} />*/}
      <table className={classes.table}>
        <thead className={classes.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={classes.outerTableHeader}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className={classes.tableBody}>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className={classes.tableRow}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className={classes.tableData}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};




import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table'
import { createRef, useEffect, useMemo, useState } from "react";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultColumn: Partial<ColumnDef<Arc>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const inputRef = createRef();

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id as keyof Arc, value);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        table.options.meta?.updateData(index, id as keyof Arc, value);
        inputRef.current?.blur();
      }
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={classes.cellDataInput}
      />
    )
  },
}


// const columns: ColumnDef<Arc>[] = [
//   {
//     accessorKey: "fromLabel",
//     header: "from",
//     cell: ({ getValue, row, column, table }) => (
//       <input
//         value={getValue() as string}
//         onChange={(e) =>
//           table.options.meta?.updateData(
//             row.index,
//             column.id,
//             e.target.value
//           )
//         }
//       />
//     ),
//   },
//   {
//     accessorKey: "toLabel",
//     header: "to",
//     cell: ({ getValue, row, column, table }) => (
//       <input
//         value={getValue() as string}
//         onChange={(e) =>
//           table.options.meta?.updateData(
//             row.index,
//             column.id,
//             Number(e.target.value)
//           )
//         }
//       />
//     ),
//   },
//   {
//     accessorKey: "weight",
//     header: "weight",
//     cell: ({ getValue, row, column, table }) => (
//       <input
//         type="number"
//         value={getValue() as number}
//         onChange={(e) =>
//           table.options.meta?.updateData(
//             row.index,
//             column.id,
//             Number(e.target.value)
//           )
//         }
//       />
//     ),
//   },
// ];
