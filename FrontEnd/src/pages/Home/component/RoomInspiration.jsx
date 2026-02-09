import BedRoom from "@/assets/BedRoom.png";
import Living from "@/assets/Living.png";

const RoomInspiration = () => {
  return (
    <div className="bg-[#FCF8F3] flex flex-col md:flex-row w-full justify-around">
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

      <div className="flex gap-3 overflow-x-auto md:overflow-hidden scrollbar-hide ">
        {[BedRoom, Living].map((img, idx) => (
          <div key={idx} className="min-w-full md:min-w-[50%]">
            <img
              src={img}
              alt="Room Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex pt-3 gap-2 justify-center">
        {[0, 1, 2, 3].map((_, idx) => (
          <span key={idx} className="h-3 w-3 rounded-full bg-[#d8d8d8]" />
        ))}
      </div>
    </div>
  );
};

export default RoomInspiration;
