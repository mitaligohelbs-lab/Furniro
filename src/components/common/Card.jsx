import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { addToCard } from "../../redux/features/card/CardSlice";

const Card = ({ src, name, subTitle, price, originalPrice, tag, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        dispatch(addToCard(id));
        navigate(`/shop/${id}`);
      }}
    >
      <div className="relative">
        <img src={src} className="h-72" alt="Card Image" />
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
            },
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
    </button>
  );
};

export default Card;
