import { Outlet } from "react-router";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="mr-4">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
