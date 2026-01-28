import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

import CommonInput from "../../../components/common/CommonInput";
import CommonTextArea from "../../../components/common/CommonTextArea";

import { CONTACT_INFO } from "../../../constant";

const ContactInformation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const sendEmail = (data, e) => {
    e.preventDefault();
    emailjs
      .send("service_7d8rioa", "template_eojcwjw", data, {
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
    reset();
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
              <img
                src={src}
                className="w-5 h-5"
                alt="Contact Information Image"
              />
              <div className="flex flex-col">
                <div>{name}</div>
                <div>{info}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(sendEmail)}>
          <CommonInput
            label="Title"
            name="title"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title?.message}
          />
          <CommonInput
            label="Name"
            name="name"
            placeholder="ABC"
            {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
          />
          <CommonTextArea
            title="Message"
            name="message"
            placeholder="Hi! i’d like to ask about"
            {...register("message", {
              required: "Message is required",
            })}
            error={errors.message?.message}
          />
          <CommonInput
            label="Email"
            type="email"
            name="emial"
            placeholder="Abc@def.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
            error={errors.email?.message}
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
