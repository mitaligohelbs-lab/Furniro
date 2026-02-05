import { Activity, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import clsx from "clsx";

import { addToCard } from "../../redux/features/card/CardSlice";
import { addToCart } from "../../redux/features/cart/CartSlice";
import { addCompareItem } from "../../redux/features/cart/ComparisionSlice";

import ShareModal from "../modal/ShareModal";

const Card = ({ src, name, subTitle, price, originalPrice, tag, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const comparisionList = useSelector((state) => state.compareItem.item);

  const itemAlreadyAddedInCart = items.find((product) => product.id === id);
  const itemLareadyAddedInComparisionList = comparisionList.find(
    (el) => el === id,
  );

  const [openShareModal, setShareModal] = useState(false);

  const handleCardClick = () => {
    dispatch(addToCard(id));
    navigate(`/shop/${id}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShareModal(true);
  };

  return (
    <>
      <button
        className="group relative cursor-pointer w-full md:w-auto px-2 md:px-0"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={src}
            className="h-35 md:h-72 w-full object-cover"
            alt="Card Image"
          />
          <Activity mode={tag ? "visible" : "hidden"}>
            <span
              className={clsx(
                "absolute top-2.5 right-2.5 h-9 md:h-10 w-9 md:w-10 rounded-full flex items-center justify-center text-white",
                {
                  "bg-[#2EC1AC]": tag === "New",
                  "bg-[#E97171]": tag !== "New",
                },
              )}
            >
              {tag}
            </span>
          </Activity>

          <div
            className="
        absolute inset-0
        bg-black/60
        opacity-0 group-hover:opacity-100
        transition duration-300
        flex flex-col items-center justify-center gap-4 
      "
          >
            <div
              className="px-5 py-2 bg-white text-[#B88E2F] font-semibold 
              disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ id, name, price, src, quantity: 1 }));
              }}
              disabled={itemAlreadyAddedInCart}
            >
              Add To Cart
            </div>

            <div className="flex gap-4 text-white">
              <div
                className="flex gap-1 items-center disabled:cursor-not-allowed disabled:text-gray-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addCompareItem([id]));
                }}
                disabled={itemLareadyAddedInComparisionList}
              >
                <img src="https://res.cloudinary.com/dbfad05pd/image/upload/v1769571586/Group_pf6z04.svg" />
                <span>Compare</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F5F7] p-2">
          <div className="font-semibold text-[18px] md:text-[24px]">{name}</div>
          <div className="text-[#898989] text-sm  md:text-lg">{subTitle}</div>
          <div className="flex justify-between">
            <span className="text-[#3A3A3A]">Rs {price}</span>
            <Activity mode={originalPrice ? "visible" : "hidden"}>
              <span className="text-[#B0B0B0] line-through text-sm md:text-lg">
                Rs {originalPrice}
              </span>
            </Activity>
          </div>
        </div>
      </button>
      <Activity mode={openShareModal ? "visible" : "hidden"}>
        <ShareModal
          isOpen={openShareModal}
          isClose={() => setShareModal(false)}
          name={name}
          id={id}
        />
      </Activity>
    </>
  );
};

export default Card;
