import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ShapeImageSkeleton } from "../../../components/Skalaton";
import CommonPage from "../../../components/common/CommonPage";

import httpService from "../../../service/httpService";

const ShapeSetup = () => {
  const [shapeImage, setShapeImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await httpService.get("/shape");
        setShapeImage(res.data);
      } catch (e) {
        console.log("Failed to fetch shape data", e);
        toast.error("Failed to fetch shape data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CommonPage title="#FuniroFurniture" subTitle="Share your setup with">
      <div className="columns-4 gap-6 w-full max-w-6xl mx-auto">
        {isLoading ? (
          <ShapeImageSkeleton />
        ) : (
          shapeImage.map(({ src, id }) => (
            <div key={id} className="mb-6 break-inside-avoid ">
              <img
                src={src}
                className={`w-full block ${
                  id === "1" ? "h-125 object-cover" : "h-auto"
                }`}
                alt="Shape Image"
              />
            </div>
          ))
        )}
      </div>
    </CommonPage>
  );
};

export default ShapeSetup;
