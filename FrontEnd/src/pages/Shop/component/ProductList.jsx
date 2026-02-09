import { Activity, useEffect, useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

import httpService from "@/service/httpService";

import { ProductCardSkeleton } from "@/components/Skalaton";
import Card from "@/components/common/Card";

import { SORTING_LIST, SORTING_TYPE } from "@/constant";

const PAGE_WINDOW = 3;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);/*  */
  const [sortingKeyName, setSortingKeyName] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const startPage = Math.floor((currPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
  const endPage = Math.min(startPage + PAGE_WINDOW - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const params = {
        _page: currPage,
        _limit: limit,
      };

      if (search) {
        params.q = search;
      }

      if (sortingKeyName) {
        params._sort = sortingKeyName;
        params._order = sortingValue;
      }

      const res = await httpService.get("/product", { params });
      const totalCount = res.headers["x-total-count"];
      setTotalPages(Math.ceil(totalCount / limit));
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      toast.error("Failed to fetch product data:");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currPage, limit, sortingValue, sortingKeyName, search]);

  return (
    <>
      <div className="bg-[#F9F1E7] p-5 flex gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex gap-2 h-8">
            Search:
            <input
              className="border px-0.5 md:px-2 border-gray-500 rounded-lg w-35 focus:outline-none"
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
              className="px-2 border border-gray-500 rounded-lg w-20 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex gap-2 h-8">
              Sort By:
              <select
                className="px-0.5 border border-gray-500 rounded-lg cursor-pointer focus:outline-none "
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
            <Activity
              mode={
                sortingKeyName && sortingKeyName !== "name"
                  ? "visible"
                  : "hidden"
              }
            >
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
            </Activity>
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  mx-auto place-items-center max-w-350 py-4 gap-1">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          : products.map((item) => <Card key={item.id} {...item} />)}
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
