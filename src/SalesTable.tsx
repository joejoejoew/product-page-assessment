import './index.css'
import { FC, useState } from 'react';
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { SalesRow } from './services/product';

const columnHelper = createColumnHelper<SalesRow>();

const toUSD = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // Do not show any digits after the decimal point
    maximumFractionDigits: 0, // Do not show any digits after the decimal point
  }).format(amount);

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year?.slice(2)}`;
};

const SalesTable: FC<{ data: SalesRow[] }> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("weekEnding", {
      header: "Week Ending",
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("retailSales", {
      header: "Retail Sales",
      cell: (info) => toUSD(info.getValue()),
    }),
    columnHelper.accessor("wholesaleSales", {
      header: "Wholesale Sales",
      cell: (info) => toUSD(info.getValue()),
    }),
    columnHelper.accessor("unitsSold", {
      header: "Units Sold",
    }),
    columnHelper.accessor("retailerMargin", {
      header: "Retailer Margin",
      cell: (info) => toUSD(info.getValue()),
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    debugTable: true,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 1000)
          .map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SalesTable;
