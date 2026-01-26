import { createBrowserRouter } from "react-router";

import About from "../pages/About/About";
import Checkout from "../pages/Checkout/Checkout";
import Contact from "../pages/Contact/Contact";
import Compare from "../pages/Compare/Compare";
import Home from "../pages/Home/Home";
import ItemDetails from "../pages/Shop/component/ItemDetails";
import Layout from "../components/layout/Layout";
import Shop from "../pages/Shop/Shop";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
        children: [
          {
            path: ":id",
            element: <ItemDetails />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "compare",
        element: <Compare />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default Route;
