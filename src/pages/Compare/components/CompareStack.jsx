import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import httpService from "../../../service/httpService";
import { addToCart } from "../../../redux/features/cart/CartSlice";

import RatingStars from "../../../components/common/RatingStars";

const CompareStack = () => {
  const dispatch = useDispatch();
  const [allProduct, steAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [addToCartInfo, setAddToCartInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (name, id) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      }
      if (prev.length === 2) return prev;
      return [...prev, { name, id }];
    });
  };

  const DISPLAY_KEYS = [
    {
      name: "General",
      value: "general",
    },
    {
      name: "Product",
      value: "productSpecs",
    },
    {
      name: "Dimensions",
      value: "dimensions",
    },
    {
      name: "Warranty",
      value: "warranty",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await httpService.get("/Product");
        steAllProduct(res.data);
      } catch (error) {}
    })();
  }, []);

  const selectedProductId = useSelector((state) => state.compareItem.item);

  useEffect(() => {
    if (!allProduct || !selectedProductId?.length) return;

    const selectedProducts = allProduct.filter((data) =>
      selectedProductId[0]?.includes(+data.id),
    );

    setSelectedProduct(selectedProducts);
  }, [allProduct, selectedProductId]);

  const ImageDisplayCard = ({ name, price, revies }) => {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src={selectedProduct[0]?.src} className="h-45 w-70" />
        <span className="text-[24px]">{name}</span>
        <span className="text-[18px]">Rs: {price}</span>
        <div className="flex gap-1">
          <RatingStars rating={revies} />
          <span className="text-[#9F9F9F] text-[13px]">{`| ${revies} Review`}</span>
        </div>
      </div>
    );
  };

  const selectedProductInfo = (id) => {
    const selectedProduct1 = selectedProduct.find((el) => el.id === id);
    setAddToCartInfo(selectedProduct1);
  };

  return (
    <>
      <div className="grid mb-10 place-items-center grid-cols-4">
        <Link className="text-[22px] max-w-56" to={"/shop"}>
          Go to Product page for more Products{" "}
          <div className="text-[#727272] text-sm cursor-pointer">View More</div>
        </Link>

        <div className="col-span-2 flex justify-between gap-4">
          {selectedProduct.map((items) => (
            <ImageDisplayCard {...items} key={items.id} />
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-3 relative w-75">
            <div className="text-[24px] font-semibold">Add a Product</div>
            <button
              onClick={() => setOpen(!open)}
              className="bg-[#B88E2F] text-white px-5 py-2 rounded-xl 
               flex justify-between items-center font-semibold"
            >
              {selected.length
                ? selected.map(({ name }) => name)?.join(",")
                : "Choose a Product"}
              <span className="text-2xl">⌄</span>
            </button>

            {open && (
              <div
                className="absolute top-full mt-2 w-full bg-white 
                    border rounded-xl shadow-lg z-10 max-h-75 overflow-auto"
              >
                {allProduct.map(({ name, id }) => (
                  <label
                    key={id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selected.some((item) => item.id === id)}
                      onChange={() => toggleSelect(name, id)}
                      disabled={
                        selected.length === 2 &&
                        !selected.some((item) => item.id === id)
                      }
                    />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <hr className="text-[#E8E8E8]" />
      </div>
      <div className="grid mb-10 grid-cols-4 place-items-center">
        <div className="space-y-3">
          {selectedProduct.length
            ? DISPLAY_KEYS.map(({ name, value }) => (
                <div key={value}>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedProduct?.[0]?.[value] || {})?.map(
                      ([key]) => (
                        <div className="text-sm">{key}</div>
                      ),
                    )}
                  </div>
                </div>
              ))
            : null}
        </div>

        <div className="space-y-3 flex justify-around w-full col-span-2 ">
          {selectedProduct.map((product, index) => {
            const { name, id, price, src } = addToCartInfo;
            return (
              <div key={index}>
                {DISPLAY_KEYS.map(({ value }) => (
                  <div key={value}>
                    <h3 className="leading-8">{"-"}</h3>
                    {Object.values(product?.[value] || {}).map((val, i) => (
                      <div key={i} className="text-sm py-1">
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  className="px-5 py-2 rounded-sm border cursor-pointer bg-[#B88E2F] text-white"
                  onClick={() => {
                    selectedProductInfo(product.id);
                    dispatch(addToCart({ id, name, price, src, quantity: 1 }));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CompareStack;
