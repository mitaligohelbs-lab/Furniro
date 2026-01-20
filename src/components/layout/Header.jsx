import { Link } from "react-router";

import AccountAlert from "../../assets/account-alert.svg";
import Cart from "../../assets/cart.svg";
import Like from "../../assets/like.svg";
import Logo from "../../assets/logo.svg";
import Serach from "../../assets/search.svg";

const LIST_ITEM = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const ICON_LIST = [
  { link: AccountAlert },
  { link: Serach },
  { link: Like },
  { link: Cart },
];

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-7 py-2">
      <div className="flex flex-row gap-1 items-center">
        <img src={Logo} alt="logo" />
        <div className="font-bold text-[34px]">Furniro</div>
      </div>
      <div className="space-x-9">
        {LIST_ITEM.map(({ name, path }) => (
          <Link to={path}>{name}</Link>
        ))}
      </div>
      <div className="flex flex-row gap-8">
        {ICON_LIST.map(({ link }) => (
          <img src={link} width={25} height={25} />
        ))}
      </div>
    </div>
  );
};

export default Header;
