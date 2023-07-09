import { useState } from "react";
import addIcon from "../assets/icons/add-icon.svg";

export default function Forum() {
  const [tab, setTab] = useState("chat");

  const activeTab = (type) => {
    setTab(type);
  };
  return (
    <div>
      <div className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5">
        <p className="font-bold px-2">Add to Forum Chat</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </div>

      <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2
            className={` text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "chat" ? "font-black" : ""
            } `}
            onClick={() => activeTab("chat")}
          >
            Forum Chat
          </h2>
          <h4
            className={`text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "messaging" ? "font-black" : ""
            } `}
            onClick={() => activeTab("messaging")}
          >
            Direct Messaging
          </h4>
        </div>
        <div className="search pt-5">
          <div className="form__group flex items-center justify-between p-2 bg-white  rounded-full">
            <input
              type="text"
              placeholder="Type in your keyword here"
              className=" outline-none p-1 w-full border h-[45px] border-[#EBEBEB] rounded-l-full px-5"
            />
            <div className="search__btn bg-[#0b6614] h-[45px] w-[40%] text-sm  lg:text-md lg:w-[15%] flex items-center gap-2 text-white justify-center rounded-r-full">
              <i className="pi pi-search"></i> Search
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-1 w-[70%] mt-3">

        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Dogs
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Poultry
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Vet Clinics
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Vet Store
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Vaccination
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[120px] p-2 border rounded-full">
          Dog Treatment
        </div>
        <div className="text-[11px] bg-white flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
          Fish Feeding
        </div>
        </div>
      </div>
    </div>
  );
}
