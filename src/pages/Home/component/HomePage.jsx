import NewArrival from "./NewArrival";
import LandingImage from "../../../assets/Home.svg";

const HomePage = () => {
  return (
    <div className="mt-1 relative ">
      <img src={LandingImage} alt="home page" className="w-full" />
      <NewArrival />
    </div>
  );
};

export default HomePage;
