import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { removeItem } from "../../redux/features/cart/CartSlice";

import QuantityControl from "./QuantityControl";

import { CART_HEADER } from "../../constant";
import Vector from "../../assets/Vector.png";
import Cancel from "../../assets/Group.png";
import {
  addCompareItem,
  removeCompareItem,
} from "../../redux/features/cart/ComparisionSlice";

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

  const handleChange = (value, id) => {
    if (value === true) {
      dispatch(addCompareItem(id));
    } else {
      dispatch(removeCompareItem(id));
    }
  };

  const handleComparision = () => {
    navigate("/compare", { state: { isDisplay: false } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="ml-auto h-200 w-150 bg-white p-4 shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-[24px]">Shopping Cart</span>
          <button onClick={onClose} className="text-xl cursor-pointer">
            <img src={Cancel} alt="Cancel Image" />
          </button>
        </div>
        <hr className="mb-4 border-[#D9D9D9]" />
        <div className="overflow-auto max-h-140">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="text-left bg-[#F9F1E7]">
                {CART_HEADER.map(({ name }) => (
                  <th className="p-2" key={name}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {items.map(({ id, name, price, src, quantity }) => (
                <tr key={id} className="last:border-b-0">
                  <td className="p-2">
                    <img
                      key={id}
                      src={src}
                      alt={name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-2 font-medium">{name}</td>
                  <td className="p-2">₹{price}</td>
                  <td className="p-2">
                    <QuantityControl
                      isDisplay={false}
                      id={id}
                      name={name}
                      price={price}
                      src={src}
                    />
                  </td>
                  <td className="p-2 font-semibold text-[#B88E2F]">
                    ₹{price * quantity}
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProductId?.includes(+id)}
                      onChange={(e) => handleChange(e.target.checked, +id)}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <img
                      key={id}
                      src={Vector}
                      alt="remove"
                      className="mx-auto cursor-pointer"
                      onClick={() => handleRemoveItem(id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fixed top-170">
          {selectedProductId.length > 5 && (
            <div className="text-red-400 text-sm">
              {`You can maximum 5 items for comparision`}
            </div>
          )}
          <div>
            <span>Total Amount:</span>
            <span className="text-[#B88E2F]  font-bold">{totalAmount}</span>
            <div className="flex gap-2 mt-3 justify-between w-full">
              <button
                className="px-8 py-1.5 border rounded-2xl"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className={`px-6 py-1.5 border rounded-2xl ${selectedProductId.length > 5 ? "text-gray-400" : ""}`}
                disabled={selectedProductId.length > 5}
                onClick={handleComparision}
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
