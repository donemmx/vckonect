import shareIcon from "../../assets/icons/share-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import expandIcon from "../../assets/icons/expand-icon.svg";
import location from "../../assets/icons/marker-icon.svg";

export default function PromoCard({available}) {
  return (
    <div className="adsCard mb-6">
      <div className="group h-full w-full">
        <div className="top adsUser h-[65%] w-[250px]">
          <div className="pt-4 pr-4">
            <div className="flex items-center gap-2 w-fit ml-auto">
              <img
                src={shareIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
              <img
                src={deleteIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
              <img
                src={expandIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
            </div>
          </div>
          <div className="bottom flex items-center justify-between p-2 absolute bottom-2 w-full ">
            <div className="rating text-white text-sm flex items-center gap-2"></div>
            <div className="text-white font-black text-2xl pr-4">$9.99</div>
          </div>
        </div>

        <div className="bottom bg-white p-5 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1rem]">
            Dog Mouth Guard and Belt
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            Lagos, Nigeria
          </div>
          <div className="flex items-center justify-center gap-2 text-[.8rem] bg-gray-100  rounded p-3 mt-4 ">
            <div className={available ? 'available' : 'unavailable' } ></div>
            {available ? 'Available - (20 Units)' : 'Sold Out'}
          </div>
        </div>
      </div>
    </div>
  );
}
