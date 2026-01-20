import DisplayItem from "../../../components/common/DisplayItem";
import { PROVIDED_SERVICE } from "../../../constant";

const Service = () => {
  return (
    <div className="bg-[#FAF3EA] flex justify-around h-67.5 items-center">
      {PROVIDED_SERVICE.map(({ src, title, subTitle }) => (
        <DisplayItem src={src} title={title} subTitle={subTitle} />
      ))}
    </div>
  );
};

export default Service;
