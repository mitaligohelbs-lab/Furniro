import clsx from "clsx";
import BedRoom from "../../../assets/BedRoom.png";
import Living from "../../../assets/Living.png";

const RoomInspiration = () => {
  return (
    <div className="bg-[#FCF8F3] flex w-full justify-around">
      <div className="flex flex-col justify-center p-10 space-y-2">
        <div className="font-bold text-[40px]">
          50+ Beautiful rooms inspiration
        </div>
        <div className="text-[16px]">
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </div>
        <div>
          <button className="bg-[#B88E2F] px-3 py-1 text-white">
            Explore More
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <img src={BedRoom} />
        <div className="flex flex-col">
          <img src={Living} className="h-121.5" />
          <div className="flex pt-3 gap-1">
            {[0, 1, 2, 3].map((_, idx) => (
              <span
                className={clsx("h-3 w-3 rounded-full bg-[#d8d8d8]")}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInspiration;
