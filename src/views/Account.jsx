import editIcon from "../assets/account/edit-icon.svg";
import userIcon from "../assets/account/user.png";
import callIcon from "../assets/icons/phone-icon.svg";
import shareIcon from "../assets/icons/share-icon.svg";
import messageIcon from "../assets/icons/message-icon.svg";
import markerIcon from "../assets/icons/location-icon.svg";

export default function Account() {
  return (
    <div className=" bg-white h-[90vh] mb-10  rounded-md border-[1px] border-[#EBEBEB]">
      <div className="top bg-account h-[25vh] p-3 lg:p-10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] bg-white rounded-full"></i>
            Back
          </div>
          <div className=" flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            Edit
            <img
              src={editIcon}
              alt=""
              className="p-1 lg:p-3 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] bg-white rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[-6vh]">
        <img
          src={userIcon}
          alt=""
          className=" rounded-full border-[4px] border-green-400"
        />
      </div>
      <div className="name text-[1.25rem] pt-1 text-center font-bold">
        Dolapo Adaba
      </div>

      <div className=" text-[.85rem] flex items-center gap-7 justify-center mt-3">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={callIcon}
            alt=""
            className=" p-2 mb-2 h-[30px] w-[30px] bg-white rounded-full shadow"
          />
          Call
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={messageIcon}
            alt=""
            className=" p-2 mb-2 h-[30px] w-[30px] bg-white rounded-full shadow"
          />
          Email
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={markerIcon}
            alt=""
            className=" p-2 mb-2 h-[30px] w-[30px] bg-white rounded-full shadow"
          />
          Location
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={shareIcon}
            alt=""
            className=" p-2  mb-2 h-[30px] w-[30px] bg-white rounded-full shadow"
          />
          Share
        </div>
      </div>
    </div>
  );
}
