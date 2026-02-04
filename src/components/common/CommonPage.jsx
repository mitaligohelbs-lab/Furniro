const CommonPage = ({ title = "", subTitle = "", children }) => {
  return (
    <>
      <div className="flex flex-col text-center py-5 md:py-8">
        <span className="font-bold text-[23px] md:text-[32px]">{title}</span>
        <span className="text-[16px] text-gray-500 md:text-[20px] ">
          {subTitle}
        </span>
      </div>
      {children}
    </>
  );
};

export default CommonPage;
