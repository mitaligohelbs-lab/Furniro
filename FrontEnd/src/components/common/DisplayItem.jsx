const DisplayItem = ({ src, title, subTitle }) => (
  <div className="flex gap-1 px-2 items-center">
    <img src={src} className="h-9 md:h-15" alt="Item Image" />
    <div className="flex flex-col">
      <div className="font-semibold text-[15px] md:text-[25px]">{title}</div>
      <div className="text-[13px] md:text-[20px] text-[#898989]">
        {subTitle}
      </div>
    </div>
  </div>
);

export default DisplayItem;
