import { NavLink } from "react-router";
import Logo from "../../assets/logo.svg";
import { ICON_LIST, LIST_ITEM } from "../../constant";
import { useSelector } from "react-redux";
import { useState } from "react";
import ItemDrawer from "../common/ItemDrawer";

const Header = () => {
  const item = useSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);
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
              to={path}
              className={({ isActive }) =>
                isActive ? "font-bold text-[#B88E2F]" : ""
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-row gap-8 relative">
          {ICON_LIST.map(({ src, isDisplay }) => (
            <>
              {item.length ? (
                <button
                  key={src}
                  className={`absolute ${isDisplay ? "h-5 w-5 rounded-full bg-red-400 -top-3 -right-3 text-center leading-5" : ""}`}
                  onClick={() => setIsOpen(true)}
                >
                  {isDisplay && item.length}
                </button>
              ) : null}
              <img src={src} width={25} height={25} />
            </>
          ))}
        </div>
      </div>
      {isOpen && <ItemDrawer onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
