import shareIcon from "../../assets/icons/share-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import expandIcon from "../../assets/icons/expand-icon.svg";

export default function ClientCard({user, name}) {
  return (
    <div className="border rounded-lg p-3 my-4">
    <div className="flex justify-between flex-wrap gap-2">
      <div className="flex items-center gap-4">
        <img src={user} alt="" className="h-[50px]" />
        <div className=" flex flex-col font-bold text-md">
        {name}
        </div>
      </div>
      <div className="flex items-center gap-2 w-fit ml-auto">
        
            <img
              src={shareIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
            <img
              src={deleteIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
            <img
              src={expandIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
            />
          </div>
    </div>
    </div>
  )
}
