import './index.css'
import data from './assets/B007TIE0GQ';
import React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// http://localhost:5173/api/product/B007TIE0GQ.json

const ProductTags: React.FC<{ items: readonly string[] }> = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

type Sale = {
  weekEnding: string,
  retailSales: number,
  wholesaleSales: number,
  unitsSold: number,
  retailerMargin: number,
}

const columnHelper = createColumnHelper<Sale>()


const SalesTable: React.FC<{ data: Sale[] }> = ({ data }) => {
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

function App() {
  const product = data[0];
  return (
    <div>
      <header className="bg-[#052849] px-[12px] py-[15px]">
        <nav>
          <a href="/">
            <img src="/stackline_logo_small.png" width="50" height="50" />
          </a>
        </nav>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 p-4 order-last md:order-first bg-gray-50">
          <h1 className="font-bold text-lg mb-4">{product.title}</h1>
          <ul>
            <li className="mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 mr-4"
              />
            </li>
            <li>{product.title}</li>
            <li>{product.subtitle}</li>
            <li>
              <ProductTags items={product.tags} />
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-4">
          <section aria-label={`${product.title} retail sales line graph`}>
            <h2 className="text-2xl mb-2">Retail Sales</h2>
          </section>
          <section aria-label={`${product.title} retail sales table`}>
            <SalesTable data={product.sales} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
