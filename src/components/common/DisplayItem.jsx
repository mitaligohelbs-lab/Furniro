const DisplayItem = ({ src, title, subTitle }) => {
  return (
    <div className="flex gap-1">
      <img src={src} className="h-15" />
      <div className="flex flex-col">
        <div className="font-semibold text-[25px]">{title}</div>
        <div className="text-[20px] text-[#898989]">{subTitle}</div>
      </div>
    </div>
  );
};

export default DisplayItem;
