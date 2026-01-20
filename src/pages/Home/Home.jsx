import Browse from "./component/Browse";
import HomePage from "./component/HomePage";
import Product from "./component/Product";
import RoomInspiration from "./component/RoomInspiration";
import ShapeSetup from "./component/ShapeSetup";

const Home = () => {
  return (
    <div>
      <HomePage />
      <Browse />
      <Product />
      <RoomInspiration />
      <ShapeSetup />
    </div>
  );
};

export default Home;
