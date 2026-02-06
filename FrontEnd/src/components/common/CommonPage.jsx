import { Activity } from "react";

const CommonPage = ({
  title = "",
  subTitle = "",
  btnText = "",
  handleClick = () => {},
  children,
}) => {
  return (
    <>
      <div className="flex flex-col text-center py-5 md:py-8">
        <span className="font-bold text-[23px] md:text-[32px]">{title}</span>
        <div className="flex justify-end">
          <Activity mode={btnText ? "visible" : "hidden"}>
            <button
              className="text-sm text-gray-500 me-5 hover:text-red-500"
              onClick={handleClick}
            >
              {btnText}
            </button>
          </Activity>
        </div>
        <span className="text-[16px] text-gray-500 md:text-[20px] ">
          {subTitle}
        </span>
      </div>
      {children}
    </>
  );
};

export default CommonPage;
