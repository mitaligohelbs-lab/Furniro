import { Activity, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";

import httpService from "../../../service/httpService";
import { addToCart } from "../../../redux/features/cart/CartSlice";
import {
  addCompareItem,
  removeAllItems,
  removeCompareItem,
} from "../../../redux/features/cart/ComparisionSlice";

import { CompareStackSkeleton } from "../../../components/Skalaton";
import RatingStars from "../../../components/common/RatingStars";
import ConfirmationDialog from "../../../components/modal/ConfirmationDialog";
import { DISPLAY_KEYS } from "../../../constant";

import Vector from "../../../assets/Vector.png";
import Cancel from "../../../assets/Group.png";

const MAX_COMPARE = 4;

const CompareStack = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedProductId = useSelector((state) => state.compareItem.item);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemIds = cartItems.map(({ id }) => +id);

  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [allSearchProduct, setAllSearchProduct] = useState([]);

  const [isOpenItemList, setIsOpenItemList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [removeId, setRemoveId] = useState(null);
  const [removeProductData, setRemoveProductData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allProduct.length) setAllSearchProduct(allProduct);
  }, [allProduct]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await httpService.get("/product");
        setAllProduct(res.data);
      } catch (e) {
        console.log("Failed to fetch product data:", error);
        toast.error("Failed to fetch product data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!removeId) return;
    (async () => {
      const res = await httpService.get("/product", {
        params: { id: removeId },
      });
      setRemoveProductData(res.data);
    })();
  }, [removeId]);

  useEffect(() => {
    if (!allProduct.length) {
      return;
    }
    const products = allProduct
      .filter((product) => selectedProductId.includes(+product.id))
      .map((product) => ({
        ...product,
        isDisplayCartItem: cartItemIds.includes(+product.id),
      }));
    setSelectedProduct(products);
  }, [allProduct, selectedProductId]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        src: product.src,
        quantity: 1,
      }),
    );
    toast.success("Item added to card");
  };

  const handleAddItem = (checked, id) => {
    checked ? dispatch(addCompareItem(+id)) : dispatch(removeCompareItem(+id));
  };

  const handleConfirmRemove = () => {
    dispatch(removeCompareItem(+removeId));
    setIsOpen(false);
  };

  const handleChange = (value) => {
    setSearchValue(value.trim());
    const filtered = value
      ? allProduct.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase()),
        )
      : allProduct;

    setAllSearchProduct(filtered);
  };

  if (isLoading) return <CompareStackSkeleton />;

  return (
    <>
      <div className="mb-6 flex justify-between mx-5 mt-1">
        <Link to="/shop" className="text-blue-600 text-sm ps-4">
          ← Go to Product page
        </Link>
        <button
          className="text-sm text-gray-500 me-5 hover:text-red-500"
          onClick={() => dispatch(removeAllItems())}
        >
          Clear All
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-300">
          <div className="grid grid-cols-5 border-b border-[#9F9F9F] bg-white">
            <div className="p-4 font-semibold">Compare</div>

            {selectedProduct.map((item) => (
              <div
                key={item.id}
                className="p-4 relative flex flex-col items-center gap-2"
              >
                <img
                  src={Vector}
                  className="absolute top-3 right-3 w-4 cursor-pointer"
                  onClick={() => {
                    setRemoveId(item.id);
                    setIsOpen(true);
                  }}
                />

                <img src={item.src} alt={item.name} className="w-70 h-45" />

                <p className="text-[24px] font-medium text-center line-clamp-2">
                  {item.name}
                </p>

                <p className="font-semibold">Rs. {item.price}</p>

                <div className="flex gap-1">
                  <RatingStars rating={item.revies} />
                  <span className="text-[#9F9F9F] text-[13px]">{`| ${item.revies} Review`}</span>
                </div>
              </div>
            ))}

            {Array.from({ length: MAX_COMPARE - selectedProduct.length }).map(
              (_, i) => (
                <div
                  key={i}
                  className="border-[#9F9F9F] p-4 flex items-center justify-center"
                >
                  <button
                    onClick={() => setIsOpenItemList(true)}
                    className="border border-dashed  border-[#9F9F9F] px-4 py-3 text-sm rounded cursor-pointer"
                  >
                    + Add a product
                  </button>
                </div>
              ),
            )}
          </div>

          {DISPLAY_KEYS.map(({ name, value }) => (
            <div key={value} className="grid grid-cols-5  border-[#9F9F9F]">
              <div className="p-4 text-sm">
                <div key={value}>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <div className="space-y-2 ">
                    {Object.entries(selectedProduct?.[0]?.[value] || {})?.map(
                      ([key]) => (
                        <div className="text-sm py-1">{key}</div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {selectedProduct.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border-l border-[#9F9F9F] text-sm"
                >
                  <div key={product.id}>
                    <h3 className="font-semibold text-lg">{"-"}</h3>
                    <div className="space-y-2 ">
                      {Object.values(product?.[value] || {}).map((val, i) => (
                        <div key={i} className="py-1">
                          {val || "-"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {Array.from({
                length: MAX_COMPARE - selectedProduct.length,
              }).map((_, i) => (
                <div key={i} className="border-l border-[#9F9F9F]" />
              ))}
            </div>
          ))}

          <div className="grid grid-cols-5">
            <div></div>

            {selectedProduct.map((product) => (
              <div key={product.id} className="p-4 border-l border-[#9F9F9F]">
                <Activity
                  mode={
                    !product?.isDisplayCartItem || !!location.state?.isDisplay
                      ? "visible"
                      : "hidden"
                  }
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#B88E2F] text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>
                </Activity>
              </div>
            ))}
            {Array.from({
              length: MAX_COMPARE - selectedProduct.length,
            }).map((_, i) => (
              <div key={i} className="border-l border-[#9F9F9F]" />
            ))}
          </div>
        </div>
      </div>

      <Activity mode={isOpenItemList ? "visible" : "hidden"}>
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-100 max-h-[80vh] overflow-auto relative">
            <button
              onClick={() => setIsOpenItemList(false)}
              className="absolute top-3 right-3 p-2"
            >
              <img src={Cancel} alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <h3 className="font-semibold mb-3">Add Products</h3>

            <input
              className="border px-2 py-1 border-gray-500 rounded-lg w-full mb-2"
              onChange={(e) => handleChange(e.target.value)}
              value={searchValue}
              placeholder="Search product"
            />

            <p className="text-xs text-red-500 mb-2">
              You can select max {MAX_COMPARE - selectedProduct.length} products
            </p>

            {allSearchProduct.map(({ id, name, src }) => (
              <label
                key={id}
                className="flex gap-3 py-2 cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedProductId.includes(+id)}
                  onChange={(e) => handleAddItem(e.target.checked, id)}
                />
                <span>{name}</span>
                <img src={src} className="h-12 w-12" />
              </label>
            ))}

            <button
              onClick={() => setIsOpenItemList(false)}
              className="mt-4 w-full bg-black text-white py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      </Activity>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <ConfirmationDialog
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
          onConfirm={handleConfirmRemove}
          name={removeProductData?.[0]?.name}
        />
      </Activity>
    </>
  );
};

export default CompareStack;
