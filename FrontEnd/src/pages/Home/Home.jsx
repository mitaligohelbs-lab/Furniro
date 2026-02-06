import { Activity } from "react";
import { useSelector } from "react-redux";

import Browse from "./component/Browse";
import HomePage from "./component/HomePage";
import Product from "./component/Product";
import RecentlyView from "./component/RecentlyView";
import RoomInspiration from "./component/RoomInspiration";
import ShapeSetup from "./component/ShapeSetup";

const Home = () => {
  const items = useSelector((state) => state.recentlyView.items);
  return (
    <div>
      <HomePage />
      <Activity mode={items.length ? "visible" : "hidden"}>
        <RecentlyView items={items} />
      </Activity>
      <Browse />
      <Product />
      <RoomInspiration />
      <ShapeSetup />
    </div>
  );
};

export default Home;
