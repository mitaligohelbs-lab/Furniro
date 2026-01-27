import { useEffect, useState } from "react";
import httpService from "../../../service/httpService";

import CommonPage from "../../../components/common/CommonPage";

const Browse = () => {
  const [browseData, setBrowseData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await httpService.get("/Browse");
      setBrowseData(res.data);
    })();
  }, []);

  return (
    <CommonPage
      title="Browse The Range"
      subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="flex gap-4 justify-center">
        {browseData.map(({ url, name, id }) => (
          <div key={id}>
            <img src={url} alt="Browse Image"/>
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
