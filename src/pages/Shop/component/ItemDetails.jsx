import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import httpService from "../../../service/httpService";

import RatingStars from "../../../components/common/RatingStars";
import CommonPage from "../../../components/common/CommonPage";
import Card from "../../../components/common/Card";
import QuantityControl from "../../../components/common/QuantityControl";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [showAllDetails, setShowAllDetails] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await httpService.get("/Product");
        setAllProduct(res.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await httpService.get("/Product", {
          params: { id },
        });
        setProductDetail(res.data[0]);
      } catch (error) {}
    })();
  }, [id]);

  const {
    name = "",
    revies = "",
    src = "",
    additionalInformation = "",
    price = "",
    detailImage = [],
    extraImages = [],
    SKU = "",
    category = "",
    tags = "",
    description = "",
  } = productDetail;

  const relatedProduct = allProduct.filter(
    (product) => product.category === category,
  );

  const finalData = useMemo(
    () => (showAllDetails ? relatedProduct : relatedProduct.slice(0, 4)),
    [showAllDetails, relatedProduct],
  );

  return (
    <>
      <div className={`h-20 bg-[#F9F1E7] flex items-center ps-15 text-[16px]`}>
        <button
          className="text-gray-600 mr-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home &gt;
        </button>
        <button
          className="text-gray-600 mr-2 cursor-pointer"
          onClick={() => navigate("/shop")}
        >
          Shop &gt;
        </button>
        <span>{id}</span>
        {productDetail && <span className="ml-2 mr-2">| {name}</span>}
      </div>
      <div className="grid grid-cols-2 my-3">
        <div className="flex gap-4 justify-center mr-5">
          <div className="flex flex-col justify-around h-100 ">
            {extraImages &&
              extraImages.map((el) => (
                <img
                  src={el}
                  className="h-20 object-fill bg-[#F9F1E7] rounded-xl"
                  alt="Product Image"
                />
              ))}
          </div>
          <img src={src} className="rounded-xl h-100" alt="Product Main Image"/>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-[42px]">{name}</span>
          <span className="text-[#9F9F9F] font-bold">Rs: {price}</span>
          <div className="flex gap-3">
            <div className="flex items-center">
              <RatingStars rating={revies} />
            </div>
            <span className="text-[#9F9F9F] text-[13px]">{`${revies} Star Review`}</span>
          </div>
          <div className="text-[13px] max-w-100">{description}</div>

          <div className="flex gap-1 mb-10">
            <QuantityControl id={id} name={name} price={price} src={src} />
          </div>

          <hr className="text-[#D9D9D9]" />
          <div className="text-[#9F9F9F]">
            <span>SKU</span> : <span>{SKU}</span>
          </div>
          <div className="text-[#9F9F9F]">
            <span>Category</span> : <span>{category}</span>
          </div>
          <div className="text-[#9F9F9F]">
            <span>Tags</span> : <span>{tags}</span>
          </div>
        </div>
      </div>
      <hr className="text-[#D9D9D9]" />
      <div className="space-y-3 flex flex-col items-center p-5 justify-center">
        <div className="flex gap-13">
          <span className="text-[24px]">Description</span>
          <span className="text-[#9F9F9F] text-[24px]">
            Additional Information
          </span>
          <span className="flex items-center text-[#9F9F9F] text-[24px]">
            Reviews [{`${revies}`}]
          </span>
        </div>
        <div className="text-[#9F9F9F] max-w-5xl">{additionalInformation}</div>
        <div className="flex max-w-5xl  gap-3 items-center">
          {detailImage &&
            detailImage.map((el) => <img src={el} className="w-150" alt="Product Dettail Image"/>)}
        </div>
      </div>

      <CommonPage title="Related Products">
        <div className="grid grid-cols-4 mx-auto place-items-center space-y-5 max-w-350">
          {finalData?.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
        {relatedProduct.length > 4 ? (
          showAllDetails ? (
            <div
              className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 text-center mx-auto mb-2 cursor-pointer"
              onClick={() => setShowAllDetails(false)}
            >
              Show Less
            </div>
          ) : (
            <div
              className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 text-center mx-auto mb-2 cursor-pointer"
              onClick={() => setShowAllDetails(true)}
            >
              Show More
            </div>
          )
        ) : (
          ""
        )}
      </CommonPage>
    </>
  );
};
export default ItemDetails;
