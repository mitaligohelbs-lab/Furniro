import { createBrowserRouter } from "react-router";

import Checkout from "../pages/Checkout/Checkout";
import Contact from "../pages/Contact/Contact";
import Compare from "../pages/Compare/Compare";
import ItemDetails from "../pages/Shop/component/ItemDetails";
import Layout from "../components/layout/Layout";
import Payment from "../pages/Payment/Payment";
import Privacypolicy from "../pages/PrivacyPolicy/Privacypolicy";
import Return from "../pages/Return/Return";
import Shop from "../pages/Shop/Shop";
import Wishlist from "../pages/Wishlist/Wishlist";
import App from "../App";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
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
        path: "compare",
        element: <Compare />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "privacypolicy",
        element: <Privacypolicy />,
      },
      {
        path: "/return",
        element: <Return />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

export default Route;
