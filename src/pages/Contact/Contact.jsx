import HeaderImage from "../../components/common/HeaderImage";
import ContactInformation from "./component/ContactInformation";
import Service from "../Shop/component/Service";

import ContactImage from "../../assets/contact.png";

const Contact = () => (
  <div>
    <HeaderImage src={ContactImage} />
    <ContactInformation />
    <Service />
  </div>
);

export default Contact;
