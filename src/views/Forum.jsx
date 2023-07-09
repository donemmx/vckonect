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
      </div>
    </div>
  );
}
