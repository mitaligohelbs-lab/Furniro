import { Activity } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { removeItem } from "../../redux/features/cart/CartSlice";
import {
  addCompareItem,
  removeCompareItem,
} from "../../redux/features/cart/ComparisionSlice";

import QuantityControl from "./QuantityControl";
import { CART_HEADER } from "../../constant";

import Vector from "../../assets/Vector.png";
import Cancel from "../../assets/Group.png";

const ItemDrawer = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const selectedProductId = useSelector((state) => state.compareItem.item);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    if (selectedProductId?.includes(id)) {
      dispatch(removeCompareItem(+id));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };
  const handleChange = (checked, id) => {
    checked ? dispatch(addCompareItem(id)) : dispatch(removeCompareItem(id));
  };

  const handleComparision = () => {
    navigate("/compare", { state: { isDisplay: false } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-200 w-full sm:w-150 bg-white shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-4">
          <span className="font-semibold text-xl">Shopping Cart</span>
          <button onClick={onClose}>
            <img src={Cancel} alt="close" />
          </button>
        </div>

        <div className="block max-[500px]:hidden overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#F9F1E7]">
              <tr>
                {CART_HEADER.map(({ name }) => (
                  <th key={name} className="p-2 text-left">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map(({ id, name, price, src, quantity }) => (
                <tr key={id} className="border-b">
                  <td className="p-2">
                    <img
                      src={src}
                      alt={name}
                      className="h-14 w-14 rounded object-cover"
                    />
                  </td>
                  <td>{name}</td>
                  <td>₹{price}</td>
                  <td>
                    <QuantityControl
                      id={id}
                      name={name}
                      price={price}
                      src={src}
                      isDisplay={false}
                    />
                  </td>
                  <td className="font-semibold text-[#B88E2F]">
                    ₹{price * quantity}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProductId.includes(+id)}
                      onChange={(e) => handleChange(e.target.checked, +id)}
                    />
                  </td>
                  <td>
                    <img
                      key={id}
                      src={Vector}
                      alt="remove"
                      className="cursor-pointer"
                      onClick={() => handleRemoveItem(id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="hidden max-[500px]:block overflow-auto flex-1 p-4 space-y-4">
          {items.map(({ id, name, price, src, quantity }) => (
            <div
              key={id}
              className="border border-[#9F9F9F] rounded-lg p-3 flex flex-col gap-3"
            >
              <div className="flex gap-3">
                <img
                  src={src}
                  alt={name}
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between font-medium">
                    <span>{name}</span>
                    <img
                      src={Vector}
                      alt="remove"
                      className="cursor-pointer w-5 h-5"
                      onClick={() => handleRemoveItem(id)}
                    />
                  </div>
                  <span className="text-sm">₹{price}</span>
                  <QuantityControl
                    id={id}
                    name={name}
                    price={price}
                    src={src}
                    isDisplay={false}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-[#B88E2F]">
                      ₹{price * quantity}
                    </span>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedProductId.includes(+id)}
                        onChange={(e) => handleChange(e.target.checked, +id)}
                      />
                      Compare
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Activity mode={selectedProductId.length > 4 ? "visible" : "hidden"}>
          <div className="text-red-400 text-sm px-4">
            You can select maximum 4 items for comparison
          </div>
        </Activity>
        <div className="p-4 border-t">
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-[#B88E2F] font-bold">₹{totalAmount}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 px-6 py-2 border rounded-2xl"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className={`flex-1 px-6 py-2 border rounded-2xl ${
                selectedProductId.length > 4
                  ? "text-gray-400 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedProductId.length > 4}
              onClick={handleComparision}
            >
              Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDrawer;
