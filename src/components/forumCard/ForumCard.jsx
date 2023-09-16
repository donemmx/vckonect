/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import commentsIcon from "../../assets/icons/comments-icon.svg";
import likeIcon from "../../assets/icons/like-icon.svg";
import editIcon from "../../assets/account/edit-icon.svg";

import sendIcon from "../../assets/icons/send-icon.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commentForumChat,
  deleteForumChat,
  deleteForumChatComment,
  deleteresponseForumChat,
  getForumChat,
  likeForumChat,
  shareForumChat,
} from "../../utils/userApiService";
import { user } from "../../atom/userAtom";
import { loadingState } from "../../atom/loadingAtom";
import { storeData } from "../../atom/storeAtom";
import moment from "moment";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import WarningCard from "../warningCard/WarningCard";
import { toast } from "react-toastify";
import { actionState } from "../../atom/actionAtom";
import { useNavigate } from "react-router-dom";
import useUpadateReload from "../../hooks/UpdateRelaod";
import ReplyCommentModal from "../replyCommentModal/ReplyCommentModal";

export default function ForumCard({
  userImg,
  forumImg,
  name,
  content,
  position,
  comments,
  likes,
  title,
  forumChatId,
  date,
  fullData,
}) {
  const userData = useRecoilValue(user);
  const [userStore, setUserStore] = useRecoilState(storeData);
  const [comment, setComment] = useState([]);
  const [action, setAction] = useRecoilState(actionState);
  const [visible, setVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const location = useNavigate();
  const [updateReload] = useUpadateReload();
  const [globalLoading, setGlobalLoading] = useRecoilState(loadingState);

  const checker = (route) => {
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  const likeForum = async () => {
    const payload = {
      user_role: userData.role,
      user_id: userData.id,
      forum_chat_id: forumChatId,
    };
    await likeForumChat(payload).then(() => {
      const count = Math.random(userData.id).toFixed(2);
      setUserStore({ like: count });
    });
  };

  const toggleCommentShow = () => {
    setShowComments(!showComments);
  };

  const shareForum = () => {
    setLoading(true);
    const { picture, content, title, user_id, user_role, id, ...others } =
      fullData;
    const payload = {
      user_id: userData.id,
      user_role: userData.role,
      owner_user_id: user_id,
      owner_user_role: user_role,
      comment: comment,
      title: title,
      content: content,
      shared_chat_id: id,
      picture: picture,
    };
    shareForumChat(payload).then((res) => {
      toast.success("Post reshare successful");
      updateReload();
      setLoading(false);
    });
  };

  const commentForum = () => {
    setLoading(true);
    const payload = {
      forum_chat_id: fullData.id,
      user_id: userData.id,
      user_role: userData.role,
      comment: comment,
    };
    commentForumChat(payload)
      .then(() => {
        toast.success("Comment added successfully");
        updateReload();
        setComment('')
        setLoading(false);
      })
      .catch((err) => toast.error(err.detail));
  };

  const commentOpen = (commentType) => {
    setType(commentType);
    setVisible(!visible);
  };

  const deleteForumCommentData = (data) => {
    const payload = {
      forum_chat_id: data.forum_chat_id,
      user_id: userData?.id,
      user_role: userData?.role,
      comment_id: data.id,
    };
    deleteForumChatComment(payload).then((res) => {
      toast.success("Comment deleted successfully");
      updateReload();
    });
  };

  const deleteForumResponseData = (data) => {
    const payload = {
      user_id: userData?.id,
      user_role: userData?.role,
      comment_id: data.forum_chat_comment_id,
      response_id: data.id,
    };
    deleteresponseForumChat(payload).then((res) => {
      toast.success("Response deleted successfully");
      updateReload();
    });
  };

  const deleteFormData = () => {
    setGlobalLoading(!globalLoading)
    const { id, ...others } = fullData;
    const payload = {
      forum_chat_id: id,
      user_id: userData?.id,
      user_role: userData?.role,
    };
    deleteForumChat(payload)
      .then(() => {
        toast.success("Post deleted successfully");
        updateReload();
      })
      .catch((err) => toast.error(err.detail));
  };

  const editForum = () => {
    setUserStore(fullData);
    setAction("edit");
    checker("add-to-forum");
  };

  const postComment = () => {
    commentForum();
  };
  const share = () => {
    shareForum();
    setVisible(false);
  };

  return (
    <div className="">
      <Dialog
        visible={visible}
        className=" w-[95%] md:w-[70%] lg:w-[50%]"
        onHide={() => setVisible(false)}
      >
        <div className="">
          <form className="pt-3">
            <label htmlFor="username"></label>
            <textarea
              name="content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={10}
              cols={10}
              className="!border !border-gray-200 outline-none"
            ></textarea>
          </form>
          <button
            className="green__btn mt-2"
            disabled={comment.length === 0 || loading}
            onClick={share}
          >
            {loading ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              <i className="pi pi-send !text-sm"></i>
            )}
            Share Post
          </button>
        </div>
      </Dialog>

      {fullData.status === "Approved" ? (
        <>
          {fullData.type === "shared" ? (
            <>
              <div className="p-5 my-4">
                <img
                  src={fullData.user_picture}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div className=" flex flex-col text-green-700 font-bold text-md">
                  {fullData.user_name}
                  <small className=" font-light text-[12px] italic">
                    {fullData.user_role}
                  </small>
                  <div className="font-light text-black">
                    {fullData.shared_comment}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="border rounded-lg p-5 my-4">
            <div className=" flex justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={userImg}
                  alt=""
                  className="h-[50px] w-[50px] object-cover rounded-full"
                />
                <div className=" flex flex-col font-bold text-md">
                  {name}
                  <small className=" font-light text-sm">{position}</small>
                </div>
              </div>
            </div>
            {forumImg.length > 64 ? (
              <div className=" h-[240px]">
                <img
                  src={forumImg}
                  alt=""
                  className=" object-cover w-full my-4 h-full"
                />
              </div>
            ) : (
              ""
            )}
            <div className="title font-bold text-lg pt-2">{title}</div>
            <div className=" font-thin">{content}</div>
            <div className="">
              <div className=" text-[.82rem] flex items-center flex-wrap gap-7 justify-end mt-2">
                {userData.id === fullData.user_id ? (
                  <img
                    src={editIcon}
                    alt=""
                    className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                    onClick={editForum}
                  />
                ) : (
                  ""
                )}

                <div
                  className="flex gap-3 items-center justify-center cursor-pointer "
                  onClick={() => commentOpen("comment")}
                >
                  <img
                    src={commentsIcon}
                    alt=""
                    className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                  />
                  {comments.length}
                </div>
                <div className="flex gap-3 items-center justify-center cursor-pointer">
                  <img
                    src={likeIcon}
                    onClick={likeForum}
                    alt=""
                    className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] 
                hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                  />
                  {likes.length}
                </div>

                {userData.id === fullData.user_id ? (
                  <WarningCard
                    message="Are you sure you want to delete this post?"
                    header="Confirmation"
                    acceptFunction={deleteFormData}
                  />
                ) : (
                  ""
                )}

             
                <div className="flex items-center gap-2 w-fit ml-auto">
                  <button
                    className={
                      showComments
                        ? "p-2 rounded cursor-pointer bg-green-100 text-green-500 transition-all ease-in-out"
                        : " p-2 bg-gray-100 rounded cursor-pointer"
                    }
                    onClick={toggleCommentShow}
                  >
                    {showComments ? "close comments" : "view comments"}
                    <i
                      className={
                        showComments
                          ? "pi pi-window-maximize p-2 rounded cursor-pointer bg-green-100 text-green-500 transition-all ease-in-out"
                          : "pi pi-window-maximize p-2 bg-gray-100 rounded cursor-pointer"
                      }
                    ></i>
                  </button>
                  <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
                    {moment(new Date(date)).fromNow()}
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => commentOpen("share")}
                >
                  <img src={sendIcon} alt="" className=" p-2  mb-2  " />
                </div>
              </div>
              {showComments ? (
                <div className="flex flex-col gap-2">
                  <div className="mb-5">
                    <form className="pt-3">
                      <label htmlFor="username"></label>
                      <textarea
                        name="content"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={10}
                        cols={10}
                        className="!border !border-gray-200 outline-none"
                      ></textarea>
                    </form>
                    <button
                      className="p-3.5 rounded-md text-white bg-green-800 text-sm mt-2 flex items-center gap-2"
                      disabled={comment.length === 0 || loading}
                      onClick={commentForum}
                    >
                      {loading ? (
                        <i className="pi pi-spin pi-spinner"></i>
                      ) : (
                        <i className="pi pi-send !text-sm"></i>
                      )}
                      Add Comment
                    </button>
                  </div>
                  {comments.map((res) => (
                    <>
                      <div key={res.id} className="bg-gray-100 p-3 rounded">
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex flex-wrap items-center gap-3">
                            <img
                              src={res.user_picture}
                              alt=""
                              className="w-[30px] h-[30px] rounded-full"
                            />
                            <p className="text-sm font-bold">
                              {" "}
                              {res.user_name}
                            </p>
                            <small className="bg-green-100 p-1 text-[10px] text-green-600">
                              {res.user_role}
                            </small>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            {userData.id === res.user_id ? (
                              <WarningCard
                                message="Are you sure you want to delete this comment?"
                                header="Confirmation"
                                acceptFunction={() =>
                                  deleteForumCommentData(res)
                                }
                              />
                            ) : (
                              <ReplyCommentModal fulldata={res} />
                            )}
                            <p className="text-xs p-1 bg-gray-100 rounded-full">
                              {moment(res.date).utc().fromNow()}
                            </p>
                          </div>
                        </div>
                        <div className="p-2 text-sm ">{res.comment}</div>
                        <div className=""></div>
                      </div>
                      {res.response.map((response) => (
                        <div
                          key={response.id}
                          className="bg-gray-100 p-3 ml-10 rounded"
                        >
                          <div className="flex flex-wrap items-center justify-between">
                            <div className="flex flex-wrap items-center gap-3">
                              <img
                                src={response.profile_picture}
                                alt=""
                                className="w-[30px] h-[30px] rounded-full"
                              />
                              <p className="text-sm font-bold">
                                {" "}
                                {response.first_name + " " + response.last_name}
                              </p>
                              <small className="bg-green-100 p-1 text-[10px] text-green-600">
                                {response.user_role}
                              </small>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              {userData.id === response.user_id ? (
                                <WarningCard
                                  message="Are you sure you want to delete this comment?"
                                  header="Confirmation"
                                  acceptFunction={() =>
                                    deleteForumResponseData(response)
                                  }
                                />
                              ) : (
                                <></>
                              )}
                              <p className="text-xs p-1 bg-gray-100 rounded-full">
                                {moment(response.date).utc().fromNow()}
                              </p>
                            </div>
                          </div>
                          <div className="p-2 text-sm ">
                            {response.response}
                          </div>
                          <div className=""></div>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : fullData.user_id === userData.id &&
        fullData.status === "Not Approved" &&
        fullData.type !== "shared" ? (
        <>
          <div className="border rounded-lg p-5 my-4">
            <div className=" flex items-center gap-2 text-[.8rem] bg-red-200 p-3 rounded-full mb-2 w-fit px-8 ml-auto">
              <div className="unavailable "></div>
              Pending Approval
            </div>
            <div className=" flex justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <img
                  src={userImg}
                  alt=""
                  className="h-[50px] w-[50px] object-cover rounded-full"
                />
                <div className=" flex flex-col font-bold text-md">
                  {name}
                  <small className=" font-light text-sm">{position}</small>
                </div>
              </div>
              <div className="flex items-center gap-2 w-fit ml-auto">
                <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
                  {moment(date).fromNow()}
                </div>
              </div>
            </div>
            {forumImg.length > 64 ? (
              <div className=" h-[240px]">
                <img
                  src={forumImg}
                  alt=""
                  className=" object-cover w-full my-4 h-full"
                />
              </div>
            ) : (
              ""
            )}
            <div className="title font-bold text-lg pt-2">{title}</div>
            <div className=" font-thin">{content}</div>
            <div className="">
              <div className=" text-[.82rem] flex items-center flex-wrap gap-7 justify-end mt-2">
                {userData.id === fullData.user_id ? (
                  <img
                    src={editIcon}
                    alt=""
                    className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                    onClick={editForum}
                  />
                ) : (
                  ""
                )}

                <WarningCard
                  message="Are you sure you want to delete this post?"
                  header="Confirmation"
                  acceptFunction={deleteFormData}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
