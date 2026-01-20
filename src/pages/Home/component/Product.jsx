import { useEffect, useState } from "react";
import CommonPage from "../../../components/common/CommonPage";
import httpService from "../../../service/httpService";
import Card from "../../../components/common/Card";

const Product = () => {
  const [product, setProduct] = useState([]);

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
    </CommonPage>
  );
};

export default Product;
