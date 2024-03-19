import './index.css'
import { FC } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { SalesRow, useGetProductByIdQuery } from './services/product';

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

function App() {
  const {
    data,
    // error,
    // isLoading,
  } = useGetProductByIdQuery("B007TIE0GQ");
  const { image, title, tags, sales, subtitle } = data?.[0] || { image: '', title: '', tags: [], subtitle: '', sales: [] };

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
          <h1 className="font-bold text-lg mb-4">{title}</h1>
          <ul>
            <li className="mb-4">
              <img
                src={image}
                alt={title}
                className="w-20 h-20 mr-4"
              />
            </li>
            <li>{title}</li>
            <li>{subtitle}</li>
            <li>
              <ul>
                {tags.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-4">
          <section aria-label={`${title} retail sales line graph`}>
            <h2 className="text-2xl mb-2">Retail Sales</h2>
          </section>
          <section aria-label={`${title} retail sales table`}>
            <SalesTable data={sales} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
