import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { ProductCardSkeleton } from "../../../components/Skalaton";
import CommonPage from "../../../components/common/CommonPage";
import Card from "../../../components/common/Card";

import httpService from "../../../service/httpService";

const Product = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await httpService.get("/product", {
          params: {
            _limit: 8,
          },
        });
        setProduct(res.data);
      } catch (error) {
        console.log("Failed to fetch product data", error);
        toast.error("Failed to fetch product data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CommonPage title="Our Products">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto place-items-center space-y-5 max-w-350  gap-1 xl:gap-0">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : product?.map((item, index) => (
              <Card key={index} isLoading={isLoading} {...item} />
            ))}
      </div>
      <div
        className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 mt-2 md:mt-2 text-center mx-auto mb-2 cursor-pointer"
        onClick={() => navigate("/shop")}
      >
        Show More
      </div>
    </CommonPage>
  );
};

export default Product;
