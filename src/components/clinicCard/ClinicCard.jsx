import phone from "../../assets/icons/phone-icon.svg";
import chat from "../../assets/icons/chat-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";

export default function ClinicCard() {
  return (
    <div className=" adsCard mb-6">
      <div className="group h-full w-full ">
        <div className="top clinicUser h-[65%] w-[250px]">
          <div className="availbility">
            <div className=" flex items-center gap-2 text-[.8rem]">
              <div className="available "></div>
              Open
            </div>
          </div>
        </div>
        <div className="bottom bg-white p-3 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1.2rem]">
            Sumace Clinic
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            Lagos, Nigeria
          </div>
          <div className="buttons pt-1 flex justify-between items-center mt-2">
            <div className="group flex items-center gap-3  ">
              <img
                src={phone}
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
                alt=""
              />
              <img
                src={chat}
                alt=""
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
              />
              <img
                src={message}
                alt=""
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
              />
            </div>
            <div className="message">
              <button>
                <img src={openIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
