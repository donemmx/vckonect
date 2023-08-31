/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import addIcon from "../../assets/icons/add-icon.svg";
import userIcon from "../../assets/icons/user-1.png";
import ForumCard from "../../components/forumCard/ForumCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import {
  getDirectMessage,
  getForumChat,
  getForumChatByFilter,
} from "../../utils/userApiService";
import { storeData } from "../../atom/storeAtom";
import { reloadStore } from "../../atom/reloadAtom";
import Loading from "../../components/loading/Loading";
import { actionState } from "../../atom/actionAtom";
import emptyMessage from "../../assets/icons/empty-message.svg";
import { toast } from "react-toastify";
import DirectMessageCard from "../../components/directMessageCard/DirectMessageCard";
import { message } from "../../atom/messageAtom";

export default function Forum() {
  const [tab, setTab] = useState("chat");
  const location = useNavigate();
  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useRecoilState(actionState);
  const messageData = useRecoilState(message);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [allmessages, setAllMessages] = useState([]);

  const userStore = useRecoilValue(storeData);
  const reload = useRecoilValue(reloadStore);
  const userData = useRecoilValue(user);

  const activeTab = (type) => {
    setTab(type);
  };
  const checker = (route) => {
    setAction("add");
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  const getAllMessages = () => {
    getDirectMessage({ id: userData?.id, role: userData?.role }).then((res) => {
      setAllMessages(res);
    });
  };

  const searchData = async () => {
    await getForumChatByFilter({ name: search }).then((res) => {
      setForumData(res);
    });
  };

  useEffect(() => {
    getForumChat().then((res) => {
      setLoading(false);
      setForumData(res);
      getAllMessages();
    });
  }, [userStore?.like, reload]);

  useEffect(() => {
    if (
      userData?.subscription === null ||
      userData?.subscription === "Expired"
    ) {
      location("/vet-subscription");
     
    }
  }, []);

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
        {tab === "chat" ? (
          <div className="search pt-5">
            <div className="form__group flex items-center justify-between p-2 bg-white  rounded-full">
              <input
                type="text"
                placeholder="Type in your keyword here"
                className=" outline-none p-1 w-full border h-[45px] border-[#EBEBEB] rounded-l-full px-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="search__btn bg-[#0b6614] h-[45px] w-[40%] text-sm  lg:text-md lg:w-[15%] flex items-center gap-2 text-white justify-center rounded-r-full"
                onClick={searchData}
                disabled={search.length < 3}
              >
                <i className="pi pi-search"></i> Search
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
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
      {tab === "chat" ? (
        <>
          {forumData?.map((res) => (
            <div className="" key={res.id}>
              <ForumCard
                user={userIcon}
                name={res.user_name}
                userImg={res.user_picture}
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
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {allmessages?.map((res) => (
                <DirectMessageCard data={res} key={res.id} />
              ))}
            </div>
            <div className="">
              {messageData[0] ? (
                <>
                    <div className="border p-5" >
                      <div className="">
                        <div className="flex gap-2 ">
                          <div className="h-[40px] w-[40px]">
                            <img
                              src={messageData[0]?.profile_picture}  
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div className="">
                            <div className="name text-sm font-bold">
                              {messageData[0]?.first_name} {messageData[0]?.last_name}
                            </div>
                            <small className="font-light text-xs">
                              {messageData[0]?.role}
                            </small>
                          </div>
                        </div>
                        {messageData[0]?.message?.map((res)=> (
                        <div className="" key={res.id}>
                          {res.type == "message" ? (
                            <div className="">
                              <p className="text-sm p-4">{res.content}</p>
                            </div>
                          ) : res.type == "video" ? (
                            <div className="w-full h-[20vh]">
                              <video src={res.content} className="w-full h-full object-cover"></video>
                            </div>
                          ) : res.type == "image" ? (
                            <div className=" w-full h-[20vh]">
                              <img src={res.content} alt="" className="w-full h-full object-cover"/>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        ))
}
                      </div>
                    </div>
                </>
              ) : (
                <>
                  <div className="border p-5 h-full flex flex-col items-center gap-3 justify-center">
                    <img src={emptyMessage} alt="" />
                    <div className="font-bold">No Details</div>
                    <small className="w-[50%] text-center">
                      Click on any of the messages displayed at your left side
                      to view message details.
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
