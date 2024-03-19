import SalesTable from './SalesTable';
import './index.css'
import { useGetProductByIdQuery } from './services/product';

function App() {
  const {
    data,
    // error, TODO
    // isLoading, TODO
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
