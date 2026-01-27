import NewArrival from "./NewArrival";
import LandingImage from "../../../assets/Home.svg";

const HomePage = () => {
  return (
    <div className="mt-1 relative ">
      <img src={LandingImage} alt="Home Page Image" className="w-full"/>
      <NewArrival />
    </div>
  );
};

export default HomePage;
