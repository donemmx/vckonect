import phone from "../../assets/icons/phone-icon.svg";
import chat from "../../assets/icons/chat-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import editIcon from "../../assets/account/edit-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";
import star from "../../assets/icons/star.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import useUpadateReload from "../../hooks/UpdateRelaod";
import { useNavigate } from "react-router-dom";
import { deleteClinic } from "../../utils/vetApiService";
import { toast } from "react-toastify";
import WarningCard from "../warningCard/WarningCard";
import DirectMessageModal from "../directMessageModal/DirectMessageModal";

export default function ClinicCard({ fullData }) {
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [updateReload] = useUpadateReload();
  const location = useNavigate();

  const editClinic = () => {
    setStore(fullData);
    setAction("edit");
    location("/vet-add-clinic");
  };

  const checker = (route) => {
    if(userData?.id){
      setStore(fullData);
      if (userData?.role === "Veterinarian") {
        location(`/vet-${route}/${fullData?.id}`);
      } else {
        location(`/animal-owner-${route}/${fullData?.id}`);
      }
    }
    else{
      location(`/clinic/${fullData?.id}`);
    }
  };

  const deleteClinicById = () => {
    deleteClinic({ clinic_id: fullData?.clinic_id })
      .then(() => {
        toast.success("Clinic deleted successfully");
        updateReload();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className=" vetCard my-6">
      <div className="group h-full w-full ">
        <div
          className="top h-[65%] w-full relative"
          style={{
            backgroundImage: `url(${fullData?.picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {userData?.id === fullData?.user_id ? (
            <div className="flex items-center gap-4 p-3">
              <img
                src={editIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                onClick={editClinic}
              />
              <WarningCard
                message="Are you Sure you want to delete this Clinic?"
                header="Confirmation"
                acceptFunction={deleteClinicById}
              />
            </div>
          ) : (
            ""
          )}
          <div className="availbility !top-4">
            {fullData?.availability === "1" ? (
              <div className=" flex items-center gap-2 text-[.8rem]">
                <div className="available "></div>
                Open
              </div>
            ) : (
              <div className=" flex items-center gap-2 text-[.8rem]">
                <div className="unavailable "></div>
                Closed
              </div>
            )}
          </div>
          <div className="rating bg-gray-50 left-2 rounded-full text-black px-3 py-2 font-bold absolute bottom-0 text-sm flex items-center gap-2 mb-2">
            <img src={star} alt="" className="h-6" />
            {fullData?.rating ?? 0} of 5
          </div>
        </div>
        <div className="bottom bg-white p-2 rounded-b-[12px]">
      
          <div className="name font-black sm:text-[.85rem] h-[5vh]">
            {fullData?.clinic_name}
          </div>
          <div className="location flex text-xs items-center gap-2 h-[5vh]">
            <img src={location} alt="" className=" h-5" />
            {fullData?.location}
          </div>
          <div className="buttons pt-1 flex justify-between items-center mt-3">
            <div className="group flex items-center gap-3  ">
              <a href={`tel:${fullData?.phone_number}`} rel="noReferrer">
                <img
                  src={phone}
                  className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
                  alt=""
                />
              </a>
              {userData?.id ? <DirectMessageModal fullData={fullData} /> : ""}
              <a href={`mailto:${fullData?.email}`} rel="noReferrer">
                <img
                  src={message}
                  alt=""
                  className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
                />
              </a>
            </div>
            <div className="message">
              <button
                onClick={() => {
                  checker("clinic-details");
                }}
              >
                <img src={openIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
