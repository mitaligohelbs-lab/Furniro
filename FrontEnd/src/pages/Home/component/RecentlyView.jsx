import { useDispatch } from "react-redux";

import { deleteRecentlyViewCard } from "../../../redux/features/RecentlyView/RecentlyViewSlice";

import Card from "../../../components/common/Card";
import CommonPage from "../../../components/common/CommonPage";

const RecentlyView = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <CommonPage
      title="Recently Viewed"
      btnText="Clear all"
      handleClick={() => dispatch(deleteRecentlyViewCard())}
    >
      <div className="relative mx-auto max-w-300 overflow-hidden">
        <div className="flex w-max gap-4 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...items, ...items].map((item) => (
            <div key={item.id} className="min-w-55 sm:min-w-60 md:min-w-65">
              <Card {...item} />
            </div>
          ))}
        </div>

        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
    </CommonPage>
  );
};

export default RecentlyView;
