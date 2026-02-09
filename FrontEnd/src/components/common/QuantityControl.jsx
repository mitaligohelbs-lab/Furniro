import { Activity, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseQuantity,
  increseQuantity,
} from "../../redux/features/cart/CartSlice";

import { FaShoppingCart } from "react-icons/fa";

const QuantityControl = ({ id, name, price, src, isDisplay = true }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cart.items);
  const currItem = item?.find((item) => item?.id === id);
  const [quantity, setQuantity] = useState(currItem?.quantity || 1);

  useEffect(() => {
    if (currItem) {
      setQuantity(currItem.quantity);
    }
  }, [currItem]);

  const decreaseProductQuantity = () => {
    if (currItem) {
      dispatch(decreaseQuantity(id));
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseProductQuantity = () => {
    if (currItem) {
      dispatch(increseQuantity(id));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex gap-1 ">
      <div className="border px-3 py-1 md:py-2 flex w-30 justify-around rounded-md border-[#9F9F9F] h-10 md:h-auto ">
        <button
          onClick={decreaseProductQuantity}
          disabled={quantity < 1}
          className={`cursor-pointer ${quantity < 1 ? "text-gray-400" : ""}`}
        >
          -
        </button>
        <button>{quantity}</button>
        <button onClick={increaseProductQuantity} className="cursor-pointer">
          +
        </button>
      </div>
      <Activity mode={isDisplay ? "visible" : "hidden"}>
        <button
          className="px-3 py-2 rounded-md border cursor-pointer h-10 md:h-auto"
          onClick={() => {
            dispatch(addToCart({ id, name, price, src, quantity }));
            toast.success("Item added to compare list");
          }}
        >
          <span className="hidden md:block">Add To Cart</span>
          <span className="block md:hidden">
            <FaShoppingCart />
          </span>
        </button>
      </Activity>
    </div>
  );
};

export default QuantityControl;
