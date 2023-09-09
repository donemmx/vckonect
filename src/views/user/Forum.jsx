/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import addIcon from "../../assets/icons/add-icon.svg";
import userIcon from "../../assets/icons/user-1.png";
import ForumCard from "../../components/forumCard/ForumCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import {
  directMessage,
  getDirectMessage,
  getForumChat,
  getForumChatByFilter,
  viewDirectMessage,
} from "../../utils/userApiService";
import { storeData } from "../../atom/storeAtom";
import { reloadStore } from "../../atom/reloadAtom";
import Loading from "../../components/loading/Loading";
import { actionState } from "../../atom/actionAtom";
import emptyMessage from "../../assets/icons/empty-message.svg";
import { toast } from "react-toastify";
import DirectMessageCard from "../../components/directMessageCard/DirectMessageCard";
import { message } from "../../atom/messageAtom";
import moment from "moment";
import { Badge } from "primereact/badge";

export default function Forum() {
  const [tab, setTab] = useState("chat");
  const location = useNavigate();
  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useRecoilState(actionState);
  const [messageData, setMessageData] = useRecoilState(message);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [allmessages, setAllMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useRecoilState(reloadStore);

  const userStore = useRecoilValue(storeData);
  const userData = useRecoilValue(user);

  const [messageStore, setMessageStore] = useState()

  const viewMessage = (data) => {
    viewDirectMessage(data).then(() => {
      setMessages(data)
    });

  }
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

  const accept = () => {
    setLoading(true);
    const payload = {
      type: "message",
      sender_id: userData?.id,
      sender_role: userData?.role,
      receiver_id: messageData?.id,
      receiver_role: messageData?.role,
      content: comment,
    };

    // directMessage(payload).then(() => {
    //   toast.success("Message sent successfully");
    //   setLoading(false);
    //   setComment("");
    // });

    setMessageData()
  };

  const getFile = (e) => {
    const formData = new FormData();
    // setLoading(true);

    setFile(e.target.files[0]);
    const type = e.target.files[0].type.split("/")[0];
    const payload = {
      type: type,
      sender_id: userData?.id,
      sender_role: userData?.role,
      receiver_id: messageData?.id,
      receiver_role: messageData?.role,
      content: e.target.files[0],
    };

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const maxFileSize = 5000 * 1000; // 5Kb
    const myfile = event.target.files[0];
    console.log(myfile.size);
    if (file.size > maxFileSize) {
      toast.error("Failed to attach file. The set limit is 5mb");
    } else {
      directMessage(formData).then(() => {
        toast.success("File uploaded successfully");
        setLoading(false);
      });
    }

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
          <div className="grid md:grid-cols-2 gap-2 relative ">
            <div className="flex flex-col gap-2">
              {allmessages?.map((res) =>
                res.id !== userData.id ? (
                  <div key={res.id}
                  className="flex flex-wrap gap-2  border items-center justify-between p-5 bg-white cursor-pointer hover:border-green-500 hover:border-2 transition-all ease-in-out hover:bg-green-50 rounded"
                  onClick={() => viewMessage(res)}
                >
                  <div className="flex gap-2 ">
                    <div className="h-[40px] w-[40px]">
                      <img
                        src={res?.profile_picture}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="">
                      <div className="name text-sm font-bold">
                        {res?.first_name} {res?.last_name}
                      </div>
                      <small className="font-light text-xs">{res?.role}</small>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="time text-xs p-1 px-3 rounded-full bg-gray-200 w-fit ">
                      {moment(new Date(res?.message[0].date)).format('DD-MM-YYYY').fromNow()}
                    </div>
                    {res.counter > 0 ? <Badge value={res?.counter} severity={"danger"}></Badge> : ''}
                  </div>
                </div>
                ) : (
                  ""
                )

              )}
            </div>
            <div className="fixed !overflow-y-auto h-[50vh] right-[8%]">
              {messages ? (
                <>
                  <div className="">
                    <div className="flex flex-col gap-2">
                      {messages?.message?.map((res) => (
                        <div
                          className="border p-4 bg-white rounded"
                          key={res.id}
                        >
                          <div className="flex gap-2  ">
                            <div className="h-[40px] w-[40px]">
                              {res.sender_id === userData.id ? (
                                <img
                                  src={userData?.profile_picture}
                                  alt=""
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <img
                                  src={messageData?.profile_picture}
                                  alt=""
                                  className="w-full h-full object-cover rounded-full"
                                />
                              )}
                            </div>
                            <div className="">
                              {res.sender_id === userData.id ? (
                                <div className="name text-sm font-bold">
                                  {userData?.first_name} {userData?.last_name}
                                </div>
                              ) : (
                                <div className="name text-sm font-bold">
                                  {messageData?.first_name}{" "}
                                  {messageData?.last_name}
                                </div>
                              )}
                              <small className="font-light text-xs">
                                {messageData?.role}
                              </small>
                            </div>
                          </div>
                          {res.type == "message" ? (
                            <div className="">
                              <p className="text-sm p-2">{res.content}</p>
                            </div>
                          ) : res.type == "video" ? (
                            <div className="w-full aspect-video">
                              <video
                                src={res.content}
                                controls
                                className="w-full h-full object-cover aspect-video"
                              ></video>
                            </div>
                          ) : res.type == "image" ? (
                            <div className=" w-full h-[20vh]">
                              <img
                                src={res.content}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" bg-white mt-4 rounded-md  p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={userData?.profile_picture}
                          alt=""
                          className="h-[40px] w-[40px] rounded-full border-2 border-green-700"
                        />
                        <div className=" flex flex-col ">
                          <div className="text-sm">
                            {userData?.first_name + " " + userData?.last_name}
                          </div>
                          <small className=" font-light text-[11px]">
                            {userData?.role}
                          </small>
                        </div>
                      </div>
                      <div className="p-2 border w-fit rounded-full bg-white ">
                        <label htmlFor="file-input">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 10V15C18 16.5913 17.3679 18.1174 16.2426 19.2426C15.1174 20.3679 13.5913 21 12 21C10.4087 21 8.88258 20.3679 7.75736 19.2426C6.63214 18.1174 6 16.5913 6 15V7C6 5.93913 6.42143 4.92172 7.17157 4.17157C7.92172 3.42143 8.93913 3 10 3V3C11.0609 3 12.0783 3.42143 12.8284 4.17157C13.5786 4.92172 14 5.93913 14 7V15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15V7"
                              stroke="#1D2432"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          accept="audio/*,video/*,image/*"
                          className="hidden"
                          onChange={(e) => getFile(e)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <form className="pt-3">
                        <label htmlFor="username"></label>
                        <textarea
                          name="content"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={5}
                          cols={5}
                          className="!border !h-[160px] !border-gray-200 outline-none"
                        ></textarea>
                      </form>
                      <button
                        className="bg-green-800 p-3 w-full mt-2 rounded text-white flex items-center justify-center gap-4"
                        onClick={accept}
                        disabled={comment.length === 0}
                      >
                        {loading ? (
                          <i className="pi pi-spin pi-spinner"></i>
                        ) : (
                          <i className="pi pi-send"></i>
                        )}
                        Submit
                      </button>
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
