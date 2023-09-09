/* eslint-disable no-unused-vars */
import moment from "moment";
import editIcon from "../../assets/account/edit-icon.svg";
import shareIcon from "../../assets/icons/share-icon.svg";
import { useRecoilState } from "recoil";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import { toast } from "react-toastify";
import WarningCard from "../warningCard/WarningCard";
import { deleteFarm } from "../../utils/animalOwnerApiService";
import { useNavigate } from "react-router-dom";
import useUpadateReload from "../../hooks/UpdateRelaod";

export default function FarmCard({
  petImg,
  location,
  livestockType,
  age,
  livestockNumber,
  sex,
  name,
  farmId,
  date,
  fullData,
}) {
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [updateReload] = useUpadateReload();
  const navigate = useNavigate();

  const editFarm = () => {
    setStore(fullData);
    setAction("edit");
    navigate("/add-farm");
  };

  const deleteFarmData = () => {
    deleteFarm(fullData)
      .then(() => {
        toast.success("Farm deleted successfully");
        updateReload();
      })
      .catch((err) => toast.error(err.detail));
  };

  return (
    <>
      <div className="border rounded-lg p-5">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="pet flex items-center gap-4">
            <img src={petImg} alt="" className="h-24 w-24 rounded-full" />
            <div className=" flex flex-col font-bold text-2xl">
              {name}
              <small className=" font-light text-sm">{farmId}</small>
            </div>
          </div>
          <div className="flex items-center gap-2 w-fit ml-auto">
            <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
              {moment(date).fromNow()}
            </div>
            <img
              src={editIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
              onClick={editFarm}
            />
            <WarningCard
              message={`Are you sure you want to delete ${name}?`}
              header="Confirmation"
              acceptFunction={deleteFarmData}
            />
            <img
              src={shareIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB]hover:border-green-400 hover:bg-green-100 transition-all ease-in-out  cursor-pointer"
            />
          </div>
        </div>
        <div className="py-4">
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Location</div>
            <div className="value">{location}</div>
          </div>
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Tivestock type</div>
            <div className="value">{livestockType}</div>
          </div>
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">No. of Livestock</div>
            <div className="value">{livestockNumber}</div>
          </div>
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Sex</div>
            <div className="value">{sex}</div>
          </div>
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Age</div>
            <div className="value">{age}</div>
          </div>
        </div>
      </div>
    </>
  );
}
