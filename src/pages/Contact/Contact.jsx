import HeaderImage from "../../components/common/HeaderImage";
import ContactInformation from "./component/ContactInformation";
import Service from "../Shop/component/Service";

import ContactImage from "../../assets/contact.png";

const Contact = () => {
  return (
    <>
      <HeaderImage src={ContactImage} />
      <ContactInformation />
      <Service />
    </>
  );
};

export default Contact;
