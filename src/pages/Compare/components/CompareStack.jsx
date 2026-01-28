import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

import httpService from "../../../service/httpService";
import { addToCart } from "../../../redux/features/cart/CartSlice";
import {
  addCompareItem,
  removeCompareItem,
} from "../../../redux/features/cart/ComparisionSlice";

import RatingStars from "../../../components/common/RatingStars";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

import { DISPLAY_KEYS } from "../../../constant";
import Vector from "../../../assets/Vector.png";

const CompareStack = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDisplay } = location.state ?? { isDisplay: false };

  const selectedProductId = useSelector((state) => state.compareItem.item);

  const [isOpen, setIsOpen] = useState(false);
  const [removeId, setRemoveId] = useState(false);
  const [allProduct, steAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [addToCartInfo, setAddToCartInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [removeProductData, setRemoveProductData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await httpService.get("/Product", {
        params: {
          id: removeId,
        },
      });
      setRemoveProductData(res.data);
    })();
  }, [removeId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await httpService.get("/Product");
        steAllProduct(res.data);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!allProduct || !selectedProductId?.length) return;

    const selectedProducts = allProduct.filter(({ id }) =>
      selectedProductId?.includes(+id),
    );

    setSelectedProduct(selectedProducts);
  }, [allProduct, selectedProductId]);

  const ImageDisplayCard = ({ name, price, revies, id, src }) => {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src={src} className="h-45 w-70" alt="Product Image" />
        <div className="flex gap-3 justify-center items-center">
          <span className="text-[24px]">{name}</span>
          <img
            src={Vector}
            className="cursor-pointer h-5 w-5"
            alt="remove"
            onClick={() => {
              setRemoveId(id);
              setIsOpen(true);
            }}
          />
        </div>
        <span className="text-[18px]">Rs: {price}</span>
        <div className="flex gap-1">
          <RatingStars rating={revies} />
          <span className="text-[#9F9F9F] text-[13px]">{`| ${revies} Review`}</span>
        </div>
      </div>
    );
  };

  const selectedProductInfo = (id) => {
    const selectedCartProduct = selectedProduct.find((el) => el.id === id);
    setAddToCartInfo(selectedCartProduct);
  };

  const handleConfirm = () => {
    if (removeId) {
      dispatch(removeCompareItem(+removeId));
      setIsOpen(false);
    }
  };

  const handleAddToCart = (productId, id, name, price, src) => {
    selectedProductInfo(productId);
    dispatch(addToCart({ id, name, price, src, quantity: 1 }));
  };

  const handleAddItem = (value, id) => {
    if (value === true) {
      dispatch(addCompareItem(+id));
    } else {
      dispatch(removeCompareItem(+id));
    }
  };

  return (
    <>
      <div className="grid mb-10 place-items-center grid-cols-5">
        <Link className="text-[22px] max-w-50" to={"/shop"}>
          Go to Product page for more Products
          <div className="text-[#727272] text-sm cursor-pointer">View More</div>
        </Link>

        <div
          className={`space-y-3 flex justify-around w-full ${selectedProductId?.length < 5 ? "col-span-3" : "col-span-4"} `}
        >
          {selectedProductId.length
            ? selectedProduct.map((items) => (
                <ImageDisplayCard {...items} key={items.id} />
              ))
            : null}
        </div>

        <div className="flex flex-col">
          {selectedProductId?.length < 5 ? (
            <div className="flex flex-col gap-3 relative w-75">
              <div className="text-[24px] font-semibold">Add a Product</div>
              <button
                onClick={() => setOpen(!open)}
                className="bg-[#B88E2F] text-white px-5 py-2 rounded-xl 
               flex justify-between items-center font-semibold"
              >
                Choose a Product
                <span className="text-2xl">⌄</span>
              </button>

              {open && (
                <div
                  className="absolute top-full mt-2 w-full bg-white 
                    border rounded-xl shadow-lg z-10 max-h-75 overflow-auto"
                >
                  <span className="text-sm text-red-400 p-2">{`You can select maximum ${5 - selectedProductId.length} product`}</span>
                  {allProduct.map(({ name, id }) => (
                    <label
                      key={id}
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProductId?.includes(+id)}
                        onChange={(e) => handleAddItem(e.target.checked, id)}
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <hr className="text-[#E8E8E8]" />
      </div>
      <div className="grid mb-10 grid-cols-5 place-items-center">
        <div className="space-y-3">
          {selectedProduct.length && selectedProductId.length
            ? DISPLAY_KEYS.map(({ name, value }) => (
                <div key={value}>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedProduct?.[0]?.[value] || {})?.map(
                      ([key]) => (
                        <div className="text-sm">{key}</div>
                      ),
                    )}
                  </div>
                </div>
              ))
            : null}
        </div>

        <div
          className={`space-y-3 flex justify-around w-full  ${selectedProductId?.length < 5 ? "col-span-3" : "col-span-4"}`}
        >
          {selectedProductId.length
            ? selectedProduct.map((product, index) => {
                const { name, id, price, src } = addToCartInfo;
                return (
                  <div key={index}>
                    {DISPLAY_KEYS.map(({ value }) => (
                      <div key={value}>
                        <h3 className="leading-8">{"-"}</h3>
                        {Object.values(product?.[value] || {}).map((val, i) => (
                          <div key={i} className="text-sm py-1">
                            {val}
                          </div>
                        ))}
                      </div>
                    ))}
                    {isDisplay ? (
                      <button
                        className="px-5 py-2 rounded-sm border cursor-pointer bg-[#B88E2F] text-white"
                        onClick={() => {
                          handleAddToCart(product.id, id, name, price, src);
                        }}
                      >
                        Add To Cart
                      </button>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {isOpen && (
        <ConfirmationDialog
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          name={removeProductData[0]?.name}
        />
      )}
    </>
  );
};

export default CompareStack;
