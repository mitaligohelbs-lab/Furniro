import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

import { removeFromWhistList } from "@/redux/features/wishlist/WishlistSlice";
import { addToCart } from "@/redux/features/cart/CartSlice";

import QuantityControl from "@/components/common/QuantityControl";

import { wishListColumn } from "@/constant";
import { BiSolidCartAdd } from "react-icons/bi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (id, name, price, src) => {
    dispatch(addToCart({ id, name, price, src, quantity: 1 }));
    toast.success("Item added to card");
  };

  const isItemInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromWhistList(id));
    toast.success("Item removed from wishlist");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

      <div className="block max-[500px]:hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9F1E7]">
            <tr>
              {wishListColumn.map(({ name }) => (
                <th
                  key={name}
                  className="p-4 text-left text-sm font-semibold text-gray-700"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {wishListItems.map(({ id, name, src, price }) => (
              <tr
                key={id}
                className="border-b border-[#E5E5E5] hover:bg-gray-50 transition"
              >
                <td className="p-4 text-red-500 cursor-pointer hover:scale-110 transition">
                  <MdDelete size={20} onClick={() => handleRemoveItem(id)} />
                </td>
                <td className="p-4">
                  <img
                    src={src}
                    alt={name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{name}</td>
                <td className="p-4 font-semibold text-gray-700">₹{price}</td>
                <td className="p-4">
                  <QuantityControl
                    id={id}
                    name={name}
                    price={price}
                    src={src}
                    isDisplay={false}
                  />
                </td>
                <td>
                  <td>
                    <BiSolidCartAdd
                      size={26}
                      className={`${
                        isItemInCart(id)
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black cursor-pointer hover:scale-110"
                      } transition`}
                      onClick={() => {
                        if (isItemInCart(id)) return;
                        handleAddToCart(id, name, price, src);
                      }}
                    />
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hidden max-[500px]:block space-y-4">
        {wishListItems.map(({ id, name, src, price }) => (
          <div key={id} className="rounded-lg p-4 flex gap-4 shadow-sm">
            <img
              src={src}
              alt={name}
              className="h-20 w-20 rounded-md object-cover"
            />

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-gray-800">{name}</h2>
                <MdDelete size={20} className="text-red-500 cursor-pointer" />
              </div>

              <p className="font-semibold text-gray-700">₹{price}</p>

              <div className="flex items-center justify-between">
                <QuantityControl
                  id={id}
                  name={name}
                  price={price}
                  src={src}
                  isDisplay={false}
                />
                <BiSolidCartAdd
                  size={26}
                  className={`${
                    isItemInCart(id)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black cursor-pointer hover:scale-110"
                  } transition`}
                  onClick={() => {
                    if (isItemInCart(id)) return;
                    handleAddToCart(id, name, price, src);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
