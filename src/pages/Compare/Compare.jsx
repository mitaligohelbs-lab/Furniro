import comparisionImage from "../../assets/Comparision.png";
import HeaderImage from "../../components/common/HeaderImage";
import Service from "../Shop/component/Service";
import CompareStack from "./components/CompareStack";

const Compare = () => (
  <>
    <HeaderImage src={comparisionImage} />
    <CompareStack />
    <Service />
  </>
);

export default Compare;
