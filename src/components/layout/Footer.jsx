import { useState } from "react";
import { Link, useNavigate } from "react-router";
import emailjs from "@emailjs/browser";

import { HELP_LINKS, NAV_LINKS } from "../../constant";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    emailjs
      .send(
        "service_7d8rioa",
        "template_ozcrblk",
        {
          name: "Furniro",
          email,
        },
        { publicKey: "xM9tRAD-J39YMzCMO" },
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
    setEmail("");
  };

  return (
    <>
      <hr className="text-[#CCCCCC] mt-2 p-2 h-8" />
      <div className="grid grid-cols-4 w-full gap-6 mx-auto  max-w-7xl ">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <div className="font-bold text-[24px]">Funiro.</div>
          <div className="text-[#9F9F9F]">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </div>
        </div>
        <div>
          <div className="text-[#9F9F9F]">Links</div>
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map(({ name, path }) => (
              <Link to={path} key={path}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[#9F9F9F]">Help</div>
          <div className="flex flex-col gap-6">
            {HELP_LINKS.map(({ name }) => (
              <div key={name} className="cursor-pointer">
                {name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[#9F9F9F]">Newsletter</div>
          <div className="flex">
            <input
              placeholder="Enter your Email Address"
              className="underline focus:outline-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="underline cursor-pointer focus:outline-none"
              onClick={handleClick}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="text-[#CCCCCC] mt-2  p-2 max-w-4xl mx-auto" />
      <div className="max-w-4xl mx-auto text-[16px]">
        2023 furino. All rights reverved{" "}
      </div>
    </>
  );
};

export default Footer;
