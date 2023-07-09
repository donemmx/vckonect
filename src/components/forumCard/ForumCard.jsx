import commentsIcon from "../../assets/icons/comments-icon.svg";
import likeIcon from "../../assets/icons/like-icon.svg";
import share from "../../assets/icons/share-icon.svg";
import sendIcon from "../../assets/icons/send-icon.svg";

export default function ForumCard({user,forumImg, name, position , title}) {
  return (
    <div className="border rounded-lg p-5 my-4">
    <div className="flex justify-between flex-wrap gap-2">
      <div className="flex items-center gap-4">
        <img src={user} alt="" className="h-[50px]" />
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
    <img src={forumImg} alt="" className="w-full my-4" />
    <div className="title font-bold text-lg pt-2">
     {title}
    </div>
    <div className=" font-thin">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat...see more
    </div>
    <div className="">
      <div className=" text-[.82rem] flex items-center flex-wrap gap-7 justify-end mt-2">
        <div className="flex gap-3 items-center justify-center ">
          <img
            src={commentsIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          5 Comments
        </div>
        <div className="flex gap-3 items-center justify-center">
          <img
            src={likeIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
          20 Likes
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
  )
}
