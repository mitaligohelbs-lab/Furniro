import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import httpService from "../../../service/httpService";
import CommonPage from "../../../components/common/CommonPage";
import Card from "../../../components/common/Card";
const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await httpService.get("/Product", {
        params: {
          _limit: 8,
        },
      });
      setProduct(res.data);
    })();
  }, []);

  return (
    <CommonPage title="Our Products">
      <div className="grid grid-cols-4 mx-auto place-items-center space-y-5 max-w-350">
        {product?.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <div
        className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 text-center mx-auto mb-2 cursor-pointer"
        onClick={() => navigate("/shop")}
      >
        Show More
      </div>
    </CommonPage>
  );
};

export default Product;
