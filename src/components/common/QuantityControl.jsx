import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increseQuantity,
} from "../../redux/features/cart/CartSlice";

const QuantityControl = ({ id, name, price, src, isDisplay = true }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cart.items);
  const currItem = item?.find((item) => item?.id === id);
  const [quantity, setQuantity] = useState(currItem?.quantity || 1);

  useEffect(() => {
    if (currItem) {
      setQuantity(currItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [currItem]);
  return (
    <div className="flex gap-1 ">
      <div className="border px-3 py-2 flex w-30 justify-around rounded-md border-[#9F9F9F] ">
        <button
          onClick={() => {
            if (currItem) {
              dispatch(decreaseQuantity(id));
            } else {
              setQuantity((prev) => prev - 1);
            }
          }}
          disabled={quantity < 1}
          className={`cursor-pointer ${quantity < 1 ? "text-gray-400" : ""}`}
        >
          -
        </button>
        <button>{quantity}</button>
        <button
          onClick={() => {
            if (currItem) {
              dispatch(increseQuantity(id));
            } else {
              setQuantity((prev) => prev + 1);
            }
          }}
          className="cursor-pointer"
        >
          +
        </button>
      </div>
      {isDisplay && (
        <button
          className="px-3 py-2 rounded-md border cursor-pointer"
          onClick={() =>
            dispatch(addToCart({ id, name, price, src, quantity }))
          }
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default QuantityControl;
