import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Browse from "./components/Main/Home/Browse";
import HomePage from "./pages/Home/component/HomePage";
import Product from "./pages/Home/component/Product";
import RoomInspiration from "./pages/Home/component/RoomInspiration";
import ShapeSetup from "./components/Main/Home/ShapeSetup";

function App() {
  return (
    <div className="mr-4">
      <Header />
      <HomePage />
      <Browse />
      <Product />
      <RoomInspiration />
      <ShapeSetup />
      <Footer />
    </div>
  );
}

export default App;
