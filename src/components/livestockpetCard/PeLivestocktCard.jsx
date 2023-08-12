import moment from "moment";
import editIcon from "../../assets/account/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import expandIcon from "../../assets/icons/expand-icon.svg";

export default function PeLivestocktCard({
  petImg,
  specie,
  date,
  age,
  breed,
  sex,
  name,
  petId
}) {
  return (
    <>
      <div className="border rounded-lg p-5">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="pet flex items-center gap-4">
            <img src={petImg} alt="" className="h-full" />
            <div className=" flex flex-col font-bold text-xl">
              {name}
              <small className=" font-light text-sm">{petId}</small>
            </div>
          </div>
          <div className="flex items-center gap-2 w-fit ml-auto">
            <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
              {moment(date).fromNow()}
            </div>
            <img
              src={editIcon}
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
        <div className="py-4">
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Specie</div>
            <div className="value">{specie}</div>
          </div>
          <div className="grouped-pets px-4 py-1 flex items-center justify-between">
            <div className="title font-bold">Breed</div>
            <div className="value">{breed}</div>
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
