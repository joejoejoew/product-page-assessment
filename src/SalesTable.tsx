import './index.css'
import { FC } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { SalesRow } from './services/product';

const columnHelper = createColumnHelper<SalesRow>()

const SalesTable: FC<{ data: SalesRow[] }> = ({ data }) => {
  const toUSD = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Do not show any digits after the decimal point
    maximumFractionDigits: 0, // Do not show any digits after the decimal point
  }).format(amount)
  
  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year?.slice(2)}`;
  }
  
  const columns = [
    columnHelper.accessor('weekEnding', {
      header: "Week Ending",
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.accessor('retailSales', {
      header: "Retail Sales",
      cell: info => toUSD(info.getValue()),
    }),
    columnHelper.accessor('wholesaleSales', {
      header: "Wholesale Sales",
      cell: info => toUSD(info.getValue()),
    }),
    columnHelper.accessor('unitsSold', {
      header: "Units Sold",
    }),
    columnHelper.accessor('retailerMargin', {
      header: "Retailer Margin",
      cell: info => toUSD(info.getValue()),
    }),
  ];
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SalesTable
