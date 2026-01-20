import { useEffect, useState } from "react";
import clsx from "clsx";
import CommonPage from "../../../components/common/CommonPage";
import httpService from "../../../service/httpService";

const Product = () => {
  const [product, setProduct] = useState([]);

  const fetchProductData = async () => {
    const res = await httpService.get("/Product");
    setProduct(res.data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <CommonPage title="Our Products">
      <div className="grid grid-cols-4 mx-auto place-items-center space-y-5 max-w-310">
        {product.map(({ src, name, subTitle, price, originalPrice, tag }) => (
          <div>
            <div className="relative">
              <img src={src} />
              <span
                className={clsx(
                  "absolute",
                  "text-white",
                  "top-2.5 right-2.5",
                  "rounded-full",
                  "flex items-center justify-center",
                  {
                    "bg-[#2EC1AC]": tag === "New",
                    "bg-[#E97171]": tag !== "New",
                  },
                  {
                    "h-12 w-12": tag,
                  }
                )}
              >
                {tag}
              </span>
            </div>
            <div className="bg-[#F4F5F7] p-2">
              <div className="font-semibold text-[24px]">{name}</div>
              <div className="text-[#898989]">{subTitle}</div>
              <div className="flex justify-between">
                <span className="text-[#3A3A3A]">{`Rs ${price}`}</span>
                {originalPrice && (
                  <span className="text-[#B0B0B0] line-through">{`Rs ${originalPrice}`}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CommonPage>
  );
};

export default Product;
