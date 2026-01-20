const CommonPage = ({ title = "", subTitle = "", children }) => {
  return (
    <>
      <div className="flex flex-col text-center py-8">
        <span className="font-bold text-[32px]">{title}</span>
        <span className="text-[20px] text-gray-500 ">{subTitle}</span>
      </div>
      {children}
    </>
  );
};

export default CommonPage;
