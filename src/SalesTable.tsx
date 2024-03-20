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

const ChevronPath: FC<{ isSorted: string | boolean }> = ({ isSorted }) => {
  if (isSorted == "asc") {
    return (
      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
    );
  }
  if (isSorted == "desc") {
    return (
      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
    );
  }
  return null;
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
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="text-[0.9em] font-light uppercase text-gray-600 first:pl-9 last:pr-7"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className="flex cursor-pointer select-none items-center py-8"
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
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mx-3 inline-block h-3 w-3 align-[-0.125em]"
                    >
                      <ChevronPath isSorted={header.column.getIsSorted()} />
                    </svg>
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="text-2 text-gray-300">
        {table
          .getRowModel()
          .rows.slice(0, 100) // TODO pagination
          .map((row) => (
            <tr key={row.id} className="border-t border-gray-100">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="py-4 first:pl-9 [&:not(:first-child)]:pr-8"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SalesTable;