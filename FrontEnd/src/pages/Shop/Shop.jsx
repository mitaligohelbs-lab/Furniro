import { Outlet, useParams } from "react-router";
import ProductList from "./component/ProductList";
import Service from "./component/Service";
import HeaderImage from "../../components/common/HeaderImage";

import ShopImage from "../../assets/Shop.png";

const Shop = () => {
  const { id } = useParams();
  return (
    <>
      {id ? (
        <Outlet />
      ) : (
        <>
          <HeaderImage src={ShopImage} />
          <ProductList />
          <Service />
        </>
      )}
    </>
  );
};

export default Shop;
