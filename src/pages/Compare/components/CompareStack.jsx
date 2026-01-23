import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import httpService from "../../../service/httpService";
import RatingStars from "../../../components/common/RatingStars";
import { useSelector } from "react-redux";

const CompareStack = () => {
  const navigate = useNavigate();
  const [allProduct, steAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

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

  return (
    <>
      <div className="grid mb-10 place-items-center grid-cols-4">
        <div className="text-[28px] max-w-56">
          Go to Product page for more Products{" "}
          <div
            onClick={() => navigate("/shop")}
            className="text-[#727272] text-[20px]"
          >
            View More
          </div>
        </div>

        {selectedProduct.map((items) => (
          <ImageDisplayCard {...items} />
        ))}

        <div className="flex flex-col">
          <div className="text-[24px]">Add a product</div>
          <label className="bg-[#B88E2F] text-center font-semibold text-[14px]">
            Select Product
            <select className="focus:outline-none">
              {allProduct.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <hr className="text-[#E8E8E8]" />
      </div>
      <div className="grid mb-10 grid-cols-4 place-items-center">
        <div className="space-y-3">
          {DISPLAY_KEYS.map(({ name, value }) => (
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
          ))}
        </div>

        <div className="space-y-3 flex justify-around w-full col-span-2 ">
          {selectedProduct.map((product, index) => (
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompareStack;
