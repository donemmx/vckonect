import phone from "../../assets/icons/phone-icon.svg";
import chat from "../../assets/icons/chat-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import editIcon from "../../assets/account/edit-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";
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

export default function ClinicCard({
  availability,
  image,
  clinicName,
  clinicLocation,
  clinic_id,
  fullData,
}) {

  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [updateReload] = useUpadateReload();
  const location = useNavigate()

  const editClinic = () => {
    setStore(fullData);
    setAction("edit");
    location("/vet-add-clinic")
  };

  const checker = (route) => {
    setStore(fullData);
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  const deleteClinicById = () => {
    deleteClinic({ clinic_id: clinic_id })
      .then(() => {
        toast.success("Clinic deleted successfully");
        updateReload()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className=" vetCard mb-6">
        <div className="group h-full w-full ">
        <div
          className="top h-[65%] w-full"
          style={{
            backgroundImage: `url(${image})`,
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
          <div className="availbility !top-4" >
            {availability === "1" ? (
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
        </div>
        <div className="bottom bg-white p-2 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1.2rem]">
            {clinicName}
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            {clinicLocation}
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
              <DirectMessageModal fullData={fullData} />
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
