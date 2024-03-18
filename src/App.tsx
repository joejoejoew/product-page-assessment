import './index.css'
import data from './assets/B007TIE0GQ';
import React from 'react';
// http://localhost:5173/api/product/B007TIE0GQ.json

const ProductTags: React.FC<{ items: readonly string[] }> = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

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
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
