import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import ItemDrawer from "../common/ItemDrawer";

import { ICON_LIST, LIST_ITEM } from "../../constant";
import Logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const item = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (totalAmount === 0) {
      setIsOpen(false);
    }
  }, [totalAmount]);

  return (
    <>
      <div className="flex flex-row justify-between items-center px-7 py-2">
        <NavLink className="flex flex-row gap-1 items-center" to={"/"}>
          <img src={Logo} alt="logo" />
          <div className="font-bold text-[34px]">Furniro</div>
        </NavLink>
        <div className="space-x-9">
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
        <div className="flex flex-row gap-8 relative cursor-pointer">
          {ICON_LIST.map(({ src, isDisplay, key }) => (
            <div key={key}>
              {item.length ? (
                <button
                  key={src}
                  className={`absolute ${isDisplay ? "h-5 w-5 rounded-full bg-red-400 -top-3 -right-3 text-center leading-5" : ""}`}
                  onClick={() => setIsOpen(true)}
                >
                  {isDisplay && item.length}
                </button>
              ) : null}
              <img
                key={`${key}_${src}`}
                src={src}
                width={25}
                height={25}
                onClick={() => {
                  if (key === "compare") {
                    navigate("/compare");
                  }
                }}
                alt="Icon Image"
              />
            </div>
          ))}
        </div>
      </div>
      {isOpen && <ItemDrawer onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
