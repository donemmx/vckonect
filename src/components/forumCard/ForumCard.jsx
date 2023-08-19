/* eslint-disable no-unused-vars */
import commentsIcon from "../../assets/icons/comments-icon.svg";
import likeIcon from "../../assets/icons/like-icon.svg";
import editIcon from "../../assets/account/edit-icon.svg";

import sendIcon from "../../assets/icons/send-icon.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commentForumChat,
  deleteForumChat,
  likeForumChat,
  shareForumChat,
} from "../../utils/userApiService";
import { user } from "../../atom/userAtom";
import { reloadStore } from "../../atom/reloadAtom";
import { storeData } from "../../atom/storeAtom";
import moment from "moment";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import WarningCard from "../warningCard/WarningCard";
import { toast } from "react-toastify";
import { actionState } from "../../atom/actionAtom";
import { useNavigate } from "react-router-dom";

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
  const [type, setType] = useState(null);
  const location = useNavigate();

  const checker = (route) => {
    if (userData?.role === "Veternarian") {
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

  const shareForum = () => {
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
      toast.success('Post reshare successful')
    });
  };

  const commentForum = () => {
    const payload = {
      forum_chat_id: fullData.id,
      user_id: userData.id,
      user_role: userData.role,
      comment: comment,
    };
    commentForumChat(payload)
      .then(() => {
        toast.success("Comment added successfully");
      })
      .catch((err) => toast.error(err.detail));
  };

  const commentOpen = (commentType) => {
    setType(commentType);
    setVisible(!visible);
  };

  const deleteFormData = () => {
    const { id, ...others } = fullData;
    const payload = {
      forum_chat_id: id,
      user_id: userData?.id,
      user_role: userData?.role,
    };
    deleteForumChat(payload)
      .then(() => {
        toast.success("Post deleted successfully");
      })
      .catch((err) => toast.error(err.detail));
  };

  const editForum = () => {
    setUserStore(fullData);
    setAction("edit");
    checker("add-to-forum");
  };

  const postComment = () => {
    if (type && type == "comment") {
      commentForum();
    } else {
      shareForum();
    }
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
            disabled={comment.length === 0}
            onClick={postComment}
          >
            <i className="pi pi-send"></i>
            {type === "comment" ? " Add Comment " : "Share Post"}
          </button>
        </div>
      </Dialog>

      {fullData.status === "Approved" ? (
        <>
          {fullData.type === "shared" ? (
            <>
              <div className="p-5 my-4">
                <img src={fullData.user_picture} alt="" className="h-[50px]" />
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
                <img src={userImg} alt="" className="h-[50px]" />
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
                <WarningCard
                  message="Are you sure you want to delete this post?"
                  header="Confirmation"
                  acceptFunction={deleteFormData}
                />
                {/* <div className="flex flex-col items-center justify-center">
            <img
              src={share}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
          </div> */}
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={shareForum}
                >
                  <img src={sendIcon} alt="" className=" p-2  mb-2  " />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : fullData.user_id === userData.id &&
        fullData.status === "Not Approved" &&
        fullData.type !== "shared" ? (
        <>
          <div className="border rounded-lg p-5 my-4">
            <div className=" flex justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <img src={userImg} alt="" className="h-[50px]" />
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
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => commentOpen("share")}
                >
                  <img src={sendIcon} alt="" className=" p-2  mb-2  " />
                </div>
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
