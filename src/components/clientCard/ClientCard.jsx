import expandIcon from "../../assets/icons/expand-icon.svg";
import WarningCard from "../warningCard/WarningCard";

export default function ClientCard({ data }) {
  const deleteClientbyId = () => {

  }
  return (
    <div className="border bg-white rounded-lg p-3 my-4">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <img
            src={data.profile_picture}
            alt=""
            className="h-[50px] w-[50px] object-cover rounded-full"
          />
          <div className=" flex flex-col font-bold text-md">
            {data.first_name + " " + data.last_name}
          </div>
        </div>
        <div className="flex items-center gap-2 w-fit ml-auto">
          <WarningCard
            message="Are you Sure you want to delete this store?"
            header="Confirmation"
            acceptFunction={deleteClientbyId}
          />
          <img
            src={expandIcon}
            alt=""
            className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
          />
        </div>
      </div>
    </div>
  );
}
