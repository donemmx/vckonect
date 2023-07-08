import editIcon from "../assets/account/edit-icon.svg";
import userIcon from "../assets/account/user.png";
import callIcon from "../assets/icons/phone-icon.svg";
import shareIcon from "../assets/icons/share-icon.svg";
import messageIcon from "../assets/icons/message-icon.svg";
import markerIcon from "../assets/icons/location-icon.svg";
import handIcon from "../assets/account/hand-icon.svg";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className=" bg-white h-[110vh] mb-10  rounded-md border-[1px] border-[#EBEBEB]">
      <div className="top bg-account h-[25vh] p-3 lg:p-10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
            Back
          </div>
          <Link to='/account-details' className=" flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            Edit
            <img
              src={editIcon}
              alt=""
              className="p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"
            />
          </Link>
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

      <div className=" text-[.82rem] flex items-center gap-7 justify-center mt-2">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={callIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          Call
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={messageIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          Email
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={markerIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          Location
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={shareIcon}
            alt=""
            className=" p-2  mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          Share
        </div>
      </div>

      <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[15vh]">
        <img src={handIcon} alt="" className=" w-[30px]"/>
        <h4 className=" font-bold pt-3">Hey! Users</h4>
        <p className="text-sm text-center text-[#666666]">Kindly click any of your choice from the icon button above to connect with this user</p>
      </div>
    </div>
  );
}
