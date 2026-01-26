import HeaderImage from "../../components/common/HeaderImage";
import Service from "../Shop/component/Service";

import CheckoutImage from "../../assets/checkout.png";
import BillingInformation from "./components/BillingInformation";

const Checkout = () => {
  return (
    <div>
      <HeaderImage src={CheckoutImage} />
      <BillingInformation />
      <Service />
    </div>
  );
};

export default Checkout;
