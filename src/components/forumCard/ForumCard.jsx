import commentsIcon from "../../assets/icons/comments-icon.svg";
import likeIcon from "../../assets/icons/like-icon.svg";
import share from "../../assets/icons/share-icon.svg";
import sendIcon from "../../assets/icons/send-icon.svg";
import { useRecoilValue } from "recoil";
import { likeForumChat } from "../../utils/userApiService";
import { user } from "../../atom/userAtom";

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
}) {
  const userData = useRecoilValue(user);
  const likeForum = async () => {
    const payload = {
      user_role: userData.role,
      user_id: userData.id,
      forum_chat_id: forumChatId,
    };
    await likeForumChat(payload).then((res) => {
      console.log(res);
    });
  };
  

  return (
    <div className="border rounded-lg p-5 my-4">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <img src={userImg} alt="" className="h-[50px]" />
          <div className=" flex flex-col font-bold text-md">
            {name}
            <small className=" font-light text-sm">{position}</small>
          </div>
        </div>
        <div className="flex items-center gap-2 w-fit ml-auto">
          <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
            10 mins ago
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
          <div className="flex gap-3 items-center justify-center ">
            <img
              src={commentsIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
            {comments.length}
          </div>
          <div className="flex gap-3 items-center justify-center">
            <img
              src={likeIcon}
              onClick={likeForum}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
           {likes.length}
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={share}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={sendIcon} alt="" className=" p-2  mb-2  " />
          </div>
        </div>
      </div>
    </div>
  );
}
