import { useState } from "react";
import emailjs from "@emailjs/browser";

import CommonInput from "../../../components/common/CommonInput";
import CommonTextArea from "../../../components/common/CommonTextArea";

import { CONTACT_INFO } from "../../../constant";

const ContactInformation = () => {
  const [contactInfo, setContactInfo] = useState({
    title: "",
    name: "",
    message: "",
    email: "",
  });

  const handleSetInfo = (value, label) => {
    setContactInfo((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send("service_7d8rioa", "template_eojcwjw", contactInfo, {
        publicKey: "xM9tRAD-J39YMzCMO",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
  };

  return (
    <div className="p-3 max-w-200  mx-auto">
      <div className="flex flex-col items-center justify-center space-y-3 mb-15">
        <div className="font-semibold text-lg">Get In Touch With Us</div>
        <div className="text-[#9F9F9F] text-sm max-w-160">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-6 justify-start">
          {CONTACT_INFO.map(({ name, info, src }) => (
            <div className="flex space-y-3 gap-4">
              <img src={src} className="w-5 h-5" />
              <div className="flex flex-col">
                <div>{name}</div>
                <div>{info}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="space-y-4" onSubmit={sendEmail}>
          <CommonInput
            label="Title"
            type="text"
            value={contactInfo.title}
            onChange={(e) => handleSetInfo(e.target.value, "title")}
          />
          <CommonInput
            label="Name"
            type="text"
            value={contactInfo.name}
            onChange={(e) => handleSetInfo(e.target.value, "name")}
          />
          <CommonTextArea
            type="text"
            value={contactInfo.message}
            onChange={(e) => handleSetInfo(e.target.value, "message")}
          />
          <CommonInput
            label="Email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleSetInfo(e.target.value, "email")}
          />
          <button className="px-5 py-2 rounded-sm border cursor-pointer bg-[#B88E2F] text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInformation;
