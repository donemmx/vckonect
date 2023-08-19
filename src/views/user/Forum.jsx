/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import addIcon from "../../assets/icons/add-icon.svg";
import userIcon from "../../assets/icons/user-1.png";
import ForumCard from "../../components/forumCard/ForumCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { getForumChat } from "../../utils/userApiService";
import { storeData } from "../../atom/storeAtom";
import { reloadStore } from "../../atom/reloadAtom";
import Loading from "../../components/loading/Loading";
import { actionState } from "../../atom/actionAtom";


export default function Forum() {
  const [tab, setTab] = useState("chat");
  const location = useNavigate();
  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useRecoilState(actionState);

  const userStore = useRecoilValue(storeData);
  const reload = useRecoilValue(reloadStore);
  const userData = useRecoilValue(user);

  const activeTab = (type) => {
    setTab(type);
  };
  const checker = (route) => {
    setAction("add")
    if (userData?.role === "Veternarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  useEffect(() => {
    getForumChat().then((res) => {
      setLoading(false)
      setForumData(res)});
  }, [userStore?.like, reload]);

  return (
    <div>
      <button
        onClick={() => checker("add-to-forum")}
        className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5 w-full"
      >
        <p className="font-bold px-2">Add to Forum Chat</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </button>

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
        <div className=" flex items-center flex-wrap gap-1 w-full lg:w-[70%] mt-3">
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
      <div className=" flex flex-wrap gap-4 w-full mb-10">
        {loading
          ? [1, 2].map((data) => (
              <div className="w-full mt-10" key={data}>
                <Loading />
              </div>
            ))
          : ""}
      </div>
    
      {forumData?.map((res) => (
        <div className="" key={res.id}>
          <ForumCard
            user={userIcon}
            name={res.user_name}
            position={res.user_role}
            content={res.content}
            forumImg={res.picture}
            title={res.title}
            comments={res.comments}
            likes={res.likes}
            forumChatId={res.id}
            date={res.date}
            fullData={res}
          />
        </div>
      ))}
    </div>
  );
}
