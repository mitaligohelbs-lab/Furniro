import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import httpService from "../../../service/httpService";
import Card from "../../../components/common/Card";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [sortValue, setSortValue] = useState("Default");

  const fetchProduct = async () => {
    try {
      const params = {
        _page: currPage,
        _limit: limit,
        _start: currPage,
        _end: currPage + limit,
      };

      if (sortValue !== "Default") {
        params._sort = "name";
        params._order = sortValue;
      }

      const res = await httpService.get("/Product", { params });
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currPage, limit, sortValue]);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase();
    return products.filter(
      ({ name, subTitle, tag }) =>
        name?.toLowerCase().includes(searchText) ||
        subTitle?.toLowerCase().includes(searchText) ||
        tag?.toLowerCase().includes(searchText)
    );
  }, [products, search]);

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
            className="focus:outline-none"
            value={sortValue}
            onChange={(e) => {
              setSortValue(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="Default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 mx-auto place-items-center gap-5 max-w-350 py-4">
        {filteredProducts.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>

      <div className="flex gap-2 justify-center mb-4">
        <button
          disabled={currPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>

        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={clsx("h-10 w-10 cursor-pointer", {
              "bg-[#B88E2F] font-bold": currPage === p,
              "bg-[#F9F1EF]": currPage !== p,
            })}
          >
            {p}
          </button>
        ))}

        <button onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
      </div>
    </>
  );
};

export default ProductList;
