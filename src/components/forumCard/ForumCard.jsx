/* eslint-disable no-unused-vars */
import commentsIcon from "../../assets/icons/comments-icon.svg";
import likeIcon from "../../assets/icons/like-icon.svg";
import sendIcon from "../../assets/icons/send-icon.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteForumChat, likeForumChat, shareForumChat } from "../../utils/userApiService";
import { user } from "../../atom/userAtom";
import { reloadStore } from "../../atom/reloadAtom";
import { storeData } from "../../atom/storeAtom";
import moment from "moment";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import WarningCard from "../warningCard/WarningCard";
import { toast } from "react-toastify";

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
  const [visible, setVisible] = useState(false);

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
      comment: "i am different",
      title: title,
      content: content,
      shared_chat_id: id,
      picture: picture,
    };
    shareForumChat(payload).then((res) => {
      console.log(res);
    });

    console.log(payload);
  };

  const commentOpen = () => {
    setVisible(!visible);
  };

  const deleteFormData = () => {
    deleteForumChat(fullData).then(()=> {
      toast.success('Post deleted successfully')
    })
  }

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
          <button className="green__btn mt-2"> <i className="pi pi-send"></i>Submit</button>
        </div>
      </Dialog>

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
            <div
              className="flex gap-3 items-center justify-center cursor-pointer "
              onClick={commentOpen}
            >
              <img
                src={commentsIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
              {comments.length}
            </div>
            <div className="flex gap-3 items-center justify-center cursor-pointer">
              <img
                src={likeIcon}
                onClick={likeForum}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
              {likes.length}
            </div>
            <WarningCard 
              message='Are you sure you want to delete this post?'
              header='Confirmation'
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
    </div>
  );
}
