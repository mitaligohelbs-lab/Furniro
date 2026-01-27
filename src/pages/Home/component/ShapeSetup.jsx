import { useEffect, useState } from "react";
import CommonPage from "../../../components/common/CommonPage";
import httpService from "../../../service/httpService";

const ShapeSetup = () => {
  const [shapeImage, setShapeImage] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await httpService.get("/Shape");
      setShapeImage(res.data);
    })();
  }, []);

  return (
    <CommonPage title="#FuniroFurniture" subTitle="Share your setup with">
      <div className="columns-4 gap-6 w-full max-w-6xl mx-auto">
        {shapeImage.map(({ src, id }) => (
          <div key={id} className="mb-6 break-inside-avoid ">
            <img
              src={src}
              className={`w-full block ${
                id === "1" ? "h-125 object-cover" : "h-auto"
              }`}
              alt="Shape Image"
            />
          </div>
        ))}
      </div>
    </CommonPage>
  );
};

export default ShapeSetup;
