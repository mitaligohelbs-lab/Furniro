import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import httpService from "../../../service/httpService";

import { BrowseSkeleton } from "../../../components/Skalaton";
import CommonPage from "../../../components/common/CommonPage";

const Browse = () => {
  const [browseData, setBrowseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await httpService.get("/browse");
        setBrowseData(res.data);
      } catch (error) {
        console.error("Failed to fetch browse data:", error);
        toast.error("Failed to fetch browse data:");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CommonPage
      title="Browse The Range"
      subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="flex  flex-col md:flex-row gap-4 px-4 md:px-0 justify-center items-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <BrowseSkeleton key={index} />
            ))
          : browseData.map(({ url, name, id }) => (
              <div key={id}>
                <img src={url} alt="Browse Image" className="h-70" />
                <span className="font-semibold text-[24px] flex justify-center pt-1">
                  {name}
                </span>
              </div>
            ))}
      </div>
    </CommonPage>
  );
};

export default Browse;
