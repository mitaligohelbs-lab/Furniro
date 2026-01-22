import { Outlet, useParams } from "react-router";
import Header from "./component/Header";
import ProductList from "./component/ProductList";
import Service from "./component/Service";

const Shop = () => {
  const { id } = useParams();
  return (
    <>
      {id ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <ProductList />
          <Service />
        </>
      )}
    </>
  );
};

export default Shop;
