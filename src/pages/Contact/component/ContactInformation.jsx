import { CONTACT_INFO } from "../../../constant";

const ContactInformation = () => {
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
            <div className="flex space-y-3">
              <img src={src} className="w-5 h-5" />
              <div className="flex flex-col">
                <div>{name}</div>
                <div>{info}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label>Name</label>
            <input className="border border-[#9F9F9F] rounded-sm h-10" />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input className="border border-[#9F9F9F] rounded-sm h-10" />
          </div>
          <div className="flex flex-col">
            <label>Subject</label>
            <textarea className="border border-[#9F9F9F] rounded-sm h-10" />
          </div>
          <div className="flex flex-col">
            <label>Message</label>
            <textarea className="border border-[#9F9F9F] rounded-sm h-20" />
          </div>
          <button className="px-5 py-2 rounded-sm border cursor-pointer bg-[#B88E2F] text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
