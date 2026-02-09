import { Activity, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IoMdShareAlt } from "react-icons/io";

import httpService from "@/service/httpService";

import { addToRecentlyViewCard } from "@/redux/features/RecentlyView/RecentlyViewSlice";
import {
  addToWhistListItem,
  removeFromWhistList,
} from "../../../redux/features/wishlist/WishlistSlice";

import { ItemDetailsSkeleton } from "@/components/Skalaton";
import RatingStars from "@/components/common/RatingStars";
import CommonPage from "@/components/common/CommonPage";
import Card from "@/components/common/Card";
import QuantityControl from "@/components/common/QuantityControl";
import ShareModal from "@/components/modal/ShareModal";

import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isWishListCheck, setIsWishListClick] = useState(false);

  const wishListItems = useSelector((state) => state.wishlist.items);
  const wishListitemFound = wishListItems.find(
    ({ id: itemId }) => itemId === id,
  );

  useEffect(() => {
    if (wishListitemFound) {
      setIsWishListClick(true);
    } else {
      setIsWishListClick(false);
    }
  }, [wishListitemFound]);

  useEffect(() => {
    (async () => {
      try {
        const res = await httpService.get("/product");
        setAllProduct(res.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await httpService.get("/product", {
          params: { id },
        });
        dispatch(addToRecentlyViewCard(res.data[0]));
        setProductDetail(res.data[0]);
      } catch (error) {
        console.log("Failed to fetch product detail data", error);
        toast.error("Failed to fetch product detail data");
      } finally {
        setIsLoading(false);
      }
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

  useEffect(() => {
    setImage(src);
  }, [src]);

  const relatedProduct = allProduct.filter(
    (product) => product.category === category,
  );

  const finalData = useMemo(
    () => (showAllDetails ? relatedProduct : relatedProduct.slice(1, 5)),
    [showAllDetails, relatedProduct],
  );

  const handleWishListClick = () => {
    setIsWishListClick(!isWishListCheck);
    if (wishListitemFound) {
      dispatch(removeFromWhistList(id));
    } else {
      dispatch(addToWhistListItem({ id, name, src, price }));
    }
  };

  if (isLoading) return <ItemDetailsSkeleton />;

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
        <Activity mode={productDetail ? "visible" : "hidden"}>
          <span className="ml-2 mr-2">| {name}</span>
        </Activity>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-3">
        <div className="flex flex-col md:flex-row gap-4 justify-center px-3 md:px-0 md:mr-5">
          <div className="flex md:flex-col gap-1 flex-row flex-wrap md:flex-nowrap justify-around md:h-100">
            <Activity mode={extraImages ? "visible" : "hidden"}>
              {[...extraImages, src].map((el) => (
                <img
                  src={el}
                  className={`w-20 h-20 object-cover cursor-pointer border bg-[#F9F1E7] rounded-xl  ${image === el ? "border-black" : "border-gray-300"}`}
                  alt="Product Image"
                  onClick={() => setImage(el)}
                />
              ))}
            </Activity>
          </div>
          <img
            src={image}
            className="rounded-xl h-100"
            alt="Product Main Image"
          />
        </div>
        <div className="flex flex-col space-y-1 md:space-y-2 px-3 md:px-0">
          <div className="flex w-full items-center justify-between">
            <div className="text-[30px] md:text-[42px]">{name}</div>
            <div className="flex gap-2">
              <span
                className="text-gray-400 hover:text-blue-500 flex gap-1 pe-5 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <IoMdShareAlt size={26} /> Share
              </span>
              <span
                className="text-gray-400 flex gap-1 pe-5 cursor-pointer"
                onClick={handleWishListClick}
              >
                {isWishListCheck ? (
                  <FaHeart size={26} color="red" />
                ) : (
                  <IoMdHeartEmpty size={26} />
                )}
              </span>
            </div>
          </div>
          <span className="text-[#9F9F9F] font-bold">Rs: {price}</span>
          <div className="flex gap-3">
            <div className="flex items-center">
              <RatingStars rating={revies} />
            </div>
            <span className="text-[#9F9F9F] text-[13px]">{`${revies} Star Review`}</span>
          </div>
          <div className="text-[13px] max-w-100">{description}</div>

          <div className="flex gap-1 mb-2 md:mb-10">
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
      <div className="space-y-3 flex flex-col items-center p-2 md:p-5 justify-center">
        <div className="flex gap-3 md:text-13">
          <span className="text-[15px] md:text-[24px]">Description</span>
          <span className="text-[#9F9F9F] text-[15px] md:text-[24px]">
            Additional Information
          </span>
          <span className="flex items-center text-[#9F9F9F] text-[15px] md:text-[24px]">
            Reviews [{`${revies}`}]
          </span>
        </div>
        <div className="text-[#9F9F9F] max-w-5xl">{additionalInformation}</div>
        <div className="flex flex-col md:flex-row max-w-5xl gap-3 items-center">
          <Activity mode={detailImage ? "visible" : "hidden"}>
            {detailImage.map((image) => (
              <img src={image} className="w-150" alt="Product Dettail Image" />
            ))}
          </Activity>
        </div>
      </div>

      <CommonPage title="Related Products">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto place-items-center space-y-5 max-w-350 gap-1 xl:gap-0">
          {finalData?.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
        {relatedProduct.length > 4 ? (
          showAllDetails ? (
            <div
              className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 text-center mx-auto mb-2 cursor-pointer mt-2 md:mt-0"
              onClick={() => setShowAllDetails(false)}
            >
              Show Less
            </div>
          ) : (
            <div
              className="text-[#B88E2F] border border-[1px solid #B88E2F] p-2 w-50 text-center mx-auto mb-2 cursor-pointer mt-2 md:mt-0"
              onClick={() => setShowAllDetails(true)}
            >
              Show More
            </div>
          )
        ) : (
          ""
        )}
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <ShareModal
            isOpen={isOpen}
            isClose={() => setIsOpen(false)}
            name={name}
            id={id}
          />
        </Activity>
      </CommonPage>
    </>
  );
};
export default ItemDetails;
