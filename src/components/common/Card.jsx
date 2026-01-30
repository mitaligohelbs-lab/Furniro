import { useState } from "react";
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
        className="group relative cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={src}
            className="h-72 w-full object-cover"
            alt="Card Image"
          />
          {tag && (
            <span
              className={clsx(
                "absolute top-2.5 right-2.5 h-12 w-12 rounded-full flex items-center justify-center text-white",
                {
                  "bg-[#2EC1AC]": tag === "New",
                  "bg-[#E97171]": tag !== "New",
                },
              )}
            >
              {tag}
            </span>
          )}

          <div
            className="
        absolute inset-0
        bg-black/60
        opacity-0 group-hover:opacity-100
        transition duration-300
        flex flex-col items-center justify-center gap-4
      "
          >
            <button
              className="px-5 py-2 bg-white text-[#B88E2F] font-semibold 
              disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ id, name, price, src, quantity: 1 }));
              }}
              disabled={itemAlreadyAddedInCart}
            >
              Add To Cart
            </button>

            <div className="flex gap-4 text-white">
              {/* <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleShare}
              >
                <img src="https://res.cloudinary.com/dbfad05pd/image/upload/v1769571567/gridicons_share_nvm11w.svg" />
                <span>Share</span>
              </button> */}
              <button
                className="flex gap-1 items-center disabled:cursor-not-allowed disabled:text-gray-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addCompareItem([id]));
                }}
                disabled={itemLareadyAddedInComparisionList}
              >
                <img src="https://res.cloudinary.com/dbfad05pd/image/upload/v1769571586/Group_pf6z04.svg" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F5F7] p-2">
          <div className="font-semibold text-[24px]">{name}</div>
          <div className="text-[#898989]">{subTitle}</div>
          <div className="flex justify-between">
            <span className="text-[#3A3A3A]">Rs {price}</span>
            {originalPrice && (
              <span className="text-[#B0B0B0] line-through">
                Rs {originalPrice}
              </span>
            )}
          </div>
        </div>
      </button>
      {openShareModal && (
        <ShareModal
          isOpen={openShareModal}
          isClose={() => setShareModal(false)}
          name={name}
          id={id}
        />
      )}
    </>
  );
};

export default Card;
