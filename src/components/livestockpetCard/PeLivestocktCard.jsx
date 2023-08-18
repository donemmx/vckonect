import moment from "moment";
import editIcon from "../../assets/account/edit-icon.svg";
import { useRecoilState } from "recoil";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import { useNavigate } from "react-router-dom";
import WarningCard from "../warningCard/WarningCard";
import { deletePet } from "../../utils/animalOwnerApiService";
import { toast } from "react-toastify";

export default function PeLivestocktCard({
  petImg,
  specie,
  date,
  age,
  breed,
  sex,
  name,
  petId,
  fullData
}) {

  const [petData, setPetData] = useRecoilState(storeData)
  const [action, setAction] = useRecoilState(actionState)
  const location = useNavigate()
  const editPet = () => {
    setPetData(fullData)
    setAction('edit')
    location('/add-pet')
  }

  const deletePetData = () => {
    deletePet(fullData).then(()=> {
      toast.success('pet deleted successfully')
    })
  }

  return (
    <>
      <div className="border rounded-lg p-5">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="pet flex items-center gap-4">
            <img src={petImg} alt=""  className="h-24 w-24 rounded-full" />
            <div className=" flex flex-col font-bold text-2xl">
              {name}
              <small className=" font-light text-sm">{petId}</small>
            </div>
          </div>
          <div className="flex items-center gap-2 w-fit ml-auto">
            <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
              {moment(date).utc().fromNow()}
            </div>
            <img
              src={editIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
              onClick={editPet}
            />
            <WarningCard 
            message={`Are you sure you want to delete ${name}?`}
            header='Confirmation'
            acceptFunction={deletePetData}
            />
           
            {/* <img
              src={expandIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] "
            /> */}
          </div>
        </div>
        <div className="py-4">
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Specie</div>
            <div className="value">{specie}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Breed</div>
            <div className="value">{breed}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Sex</div>
            <div className="value">{sex}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Age</div>
            <div className="value">{age}</div>
          </div>
        </div>
      </div>
    </>
  );
}
