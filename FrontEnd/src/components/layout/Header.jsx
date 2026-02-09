import { Activity, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import ItemDrawer from "../common/ItemDrawer";
import { ICON_LIST, LIST_ITEM } from "@/constant";

import Logo from "@/assets/logo.svg";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const item = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalCompareItem = useSelector((state) => state.compareItem.item);
  const totalWishlistItem = useSelector((state) => state.wishlist.items);

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (totalAmount === 0) setIsOpen(false);
  }, [totalAmount]);

  const getCountByKey = (key) => {
    if (key === "cart") return item.length;
    if (key === "compare") return totalCompareItem.length;
    if (key === "like") return totalWishlistItem.length;
    return 0;
  };

  return (
    <>
      <div className="relative flex items-center justify-between px-2 sm:px-6 py-3 bg-white z-40">
        <NavLink
          className="flex items-center gap-1"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={Logo} alt="logo" />
          <span className="font-bold text-xl md:text-3xl">Furniro</span>
        </NavLink>

        <div className="hidden md:flex space-x-9">
          {LIST_ITEM.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "font-bold text-[#B88E2F]" : ""
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        <div className="flex gap-3 justify-center items-center">
          <div className="flex gap-4 md:gap-8">
            {ICON_LIST.map(({ isDisplay, key, badgeClass, icon }) => {
              const count = getCountByKey(key);
              return (
                <div key={key} className="relative">
                  <Activity
                    mode={isDisplay && count > 0 ? "visible" : "hidden"}
                  >
                    <button
                      className={`absolute ${badgeClass} h-5 w-5 rounded-full bg-red-400 text-xs text-white leading-4`}
                      onClick={() => {
                        if (key === "cart") setIsOpen(true);
                        if (key === "compare") navigate("/compare");
                        if (key === "like") navigate("/wishlist");
                      }}
                    >
                      {count}
                    </button>
                  </Activity>
                  {icon}
                </div>
              );
            })}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <IoClose /> : <FaBars />}
          </button>
        </div>
      </div>
      <Activity mode={isMenuOpen ? "visible" : "hidden"}>
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute top-16 left-0 w-full bg-white shadow-md">
            <div className="flex flex-col gap-5 p-6">
              {LIST_ITEM.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-bold text-[#B88E2F]" : "text-black"
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </Activity>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <ItemDrawer onClose={() => setIsOpen(false)} />
      </Activity>
    </>
  );
};

export default Header;
