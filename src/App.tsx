import SalesTable from './SalesTable';
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
      <header className="bg-[#052849] px-[15px] pb-[14px] pt-[23px]">
        <nav>
          <a href="/">
            <img src="/product-page-assessment/stackline_logo_small.png" width="50" height="50" />
          </a>
        </nav>
      </header>

      <div className="flex flex-col space-x-5 bg-[#F6F8FA] px-5 py-[80px] md:flex-row">
        <aside className="order-last max-w-[376px] bg-white py-5 text-center shadow-lg md:order-first">
          <img
            src={image}
            alt={title}
            width="180"
            height="180"
            className="inline-block pb-5"
          />
          <h2 className="max-w-200 text-[1.4em] font-bold">{title}</h2>
          <p className="m-auto max-w-[280px] p-1 text-[1em] text-gray-400">
            {subtitle}
          </p>
          <ul className="my-4 border-y border-gray-100 px-5 py-2 text-start text-gray-500">
            {tags.map((item, index) => (
              <li
                key={index}
                className="text-md m-1 inline-block rounded-md border border-gray-200 px-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 space-y-[78px]">
          {/* <section
            aria-label={`${title} retail sales line chart`}
            className="h-[695px] bg-white shadow-lg"
          ></section> */}
          <section
            aria-label={`${title} retail sales table`}
            className="bg-white shadow-lg"
          >
            <SalesTable data={sales} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
