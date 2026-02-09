import DisplayItem from "@/components/common/DisplayItem";
import { PROVIDED_SERVICE } from "@/constant";

const Service = () => (
  <div className="bg-[#FAF3EA] h-67.5 grid grid-cols-2 md:grid-cols-4 place-items-center ">
    {PROVIDED_SERVICE.map(({ src, title, subTitle }) => (
      <DisplayItem src={src} title={title} subTitle={subTitle} key={src} />
    ))}
  </div>
);
export default Service;
