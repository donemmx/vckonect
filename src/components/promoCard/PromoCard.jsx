import shareIcon from "../../assets/icons/share-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import expandIcon from "../../assets/icons/expand-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function PromoCard({ data }) {
  return (
    <div className="adsCard mb-6">
      <Carousel showThumbs={false} swipeable={true} showStatus={false} showArrows={ false} autoPlay className=" absolute w-full">
        {data?.images.map((res) => (
          <div key={res} className=" h-full w-full"> 
            <img src={res} />
          </div>
        ))}
      </Carousel>
    
      <div className="group h-full w-full">
        <div className="top adsUser h-[65%] w-[200px]">
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
            <div className="text-white font-black text-2xl pr-4">
              $ {data?.price}
            </div>
          </div>
        </div>

        <div className="bottom absolute w-full z-50 bg-white p-5 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1rem]">
            {data?.title}
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            {data?.location}
          </div>
          <div className="flex items-center justify-center gap-2 text-[.8rem] bg-gray-100  rounded p-3 mt-4 ">
            <div
              className={data?.availability == 1 ? "available" : "unavailable"}
            ></div>
            {data?.available_units > 0
              ? `Available - ${data?.available_units}`
              : "Sold Out"}
          </div>
        </div>
      </div>
    </div>
  );
}
