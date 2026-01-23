import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { removeItem } from "../../redux/features/cart/CartSlice";
import { addToCompareItem } from "../../redux/features/cart/ComparisionSlice";

import Vector from "../../assets/Vector.png";
import Cancel from "../../assets/Group.png";

const ItemDrawer = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigte = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [selectedCamparision, setSelectedComparision] = useState([]);

  const handleChange = (id, checked) => {
    setSelectedComparision((prev) => {
      if (checked) {
        return [...prev, +id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="ml-auto h-186 w-104 bg-white p-6 shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-[24px]">Shopping Cart</span>
          <button onClick={onClose} className="text-xl cursor-pointer">
            <img src={Cancel} />
          </button>
        </div>
        <hr className="mb-4 border-[#D9D9D9]" />
        <div className="flex flex-col gap-4 overflow-auto max-h-140 p-4">
          {items.map(({ id, name, price, src, quantity }) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <img src={src} className="h-25 w-27 rounded-xl object-cover" />
              <div className="flex flex-col gap-4 max-w-32 flex-1 justify-center">
                <div className="text-[16px] font-medium">{name}</div>
                <div className="text-sm">
                  {quantity} X
                  <span className="text-[#B88E2F] font-semibold">₹{price}</span>
                </div>
              </div>
              <img
                src={Vector}
                className="cursor-pointer"
                alt="remove"
                onClick={() => dispatch(removeItem(id))}
              />
              <input
                type="checkbox"
                checked={selectedCamparision?.includes(+id)}
                value={+id}
                onChange={(e) => handleChange(+id, e.target.checked)}
              />
            </div>
          ))}
        </div>
        <div className="fixed top-165">
          <div>
            <span>Total:</span>
            <span className="text-[#B88E2F]">{totalAmount}</span>
            <hr className="text-[#D9D9D9]" />
            <div className="flex gap-2 mt-3">
              <button className="px-8 py-1.5 border rounded-2xl">Cart</button>
              <button className="px-8 py-1.5 border rounded-2xl">
                Checkout
              </button>
              <button
                className={`px-6 py-1.5 border rounded-2xl ${selectedCamparision?.length < 2 ? "text-gray-400" : ""}`}
                disabled={selectedCamparision?.length < 2}
                onClick={() => {
                  dispatch(addToCompareItem(selectedCamparision));
                  navigte("/compare");
                  onClose();
                }}
              >
                Comparision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDrawer;
