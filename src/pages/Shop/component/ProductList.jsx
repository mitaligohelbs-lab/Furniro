import { useEffect, useState } from "react";
import clsx from "clsx";
import httpService from "../../../service/httpService";
import Card from "../../../components/common/Card";
import { SORTING_LIST, SORTING_TYPE } from "../../../constant";

const PAGE_WINDOW = 3;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [sortingKeyName, setSortingKeyName] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const startPage = Math.floor((currPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
  const endPage = Math.min(startPage + PAGE_WINDOW - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const fetchProduct = async () => {
    try {
      const params = {
        _page: currPage,
        _per_page: limit,
      };

      if (search) {
        params.name = search;
      }
      params._sort =
        sortingKeyName === "price"
          ? sortingValue === "asc"
            ? sortingKeyName
            : `-${sortingKeyName}`
          : sortingKeyName;

      const res = await httpService.get("/Product", { params });
      setTotalPages(Math.ceil(res.data.items / limit));
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currPage, limit, sortingValue, sortingKeyName, search]);

  return (
    <>
      <div className="bg-[#F9F1E7] p-5 flex gap-6">
        <div className="flex gap-2 h-8">
          Search:
          <input
            className="border border-gray-500 rounded-lg px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 h-8">
          Show:
          <input
            type="number"
            min={1}
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-500 rounded-lg px-2"
          />
        </div>

        <div className="flex gap-2 h-8">
          Sort By:
          <select
            className="px-3 border border-gray-500 rounded-lg cursor-pointer focus:outline-none "
            value={sortingKeyName}
            onChange={(e) => {
              setSortingKeyName(e.target.value);
              setSortingValue("asc");
            }}
          >
            <option value="" disabled hidden></option>
            {SORTING_LIST.map(({ name, value }) => (
              <option value={value} key={value}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {sortingKeyName && sortingKeyName !== "name" && (
          <div className="flex gap-2 h-8">
            <select
              className="px-3 border border-gray-500 rounded-lg cursor-pointer focus:outline-none "
              value={sortingValue}
              onChange={(e) => setSortingValue(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {SORTING_TYPE.map(({ name, value }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 mx-auto place-items-center gap-5 max-w-350 py-4">
        {products.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>

      <div className="flex gap-2 justify-center mb-4">
        <button
          className="cursor-pointer"
          disabled={currPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={clsx("h-10 w-10 cursor-pointer", {
              "bg-[#B88E2F] font-bold": currPage === page,
              "bg-[#F9F1EF]": currPage !== page,
            })}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductList;
