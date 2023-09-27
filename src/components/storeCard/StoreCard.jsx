/* eslint-disable no-unused-vars */
import phone from "../../assets/icons/phone-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";
import { addClient, deleteStore } from "../../utils/userApiService";
import { toast } from "react-toastify";
import WarningCard from "../warningCard/WarningCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { storeData } from "../../atom/storeAtom";
import editIcon from "../../assets/account/edit-icon.svg";
import { actionState } from "../../atom/actionAtom";
import { useNavigate } from "react-router-dom";
import useUpadateReload from "../../hooks/UpdateRelaod";
import DirectMessageModal from "../directMessageModal/DirectMessageModal";
import star from "../../assets/icons/star.svg";

export default function StoreCard({
  availability,
  image,
  storeName,
  storeLocation,
  storePhone,
  store_id,
  fullData,
}) {
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [updateReload] = useUpadateReload();
  const location = useNavigate();

  const editStore = () => {
    setStore(fullData);
    setAction("edit");
    checker("add-store");
  };

  const checker = (route) => {
    setStore(fullData);
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };
  const openChecker = (route) => {
    if (userData?.id) {
      setStore(fullData);
      if (userData?.role === "Veterinarian") {
        location(`/vet-${route}/${fullData.id}`);
      } else {
        location(`/animal-owner-${route}/${fullData.id}`);
      }
    } else {
      location(`/store/${fullData.id}`);
    }
  };

  const addClientData = () => {
    if (fullData.user_id !== userData.id) {
      const payload = {
        user_id: fullData.user_id,
        role: fullData.role,
        module_type: "Store",
        client_id: userData?.id,
      };
      console.log(payload);
      addClient(payload).then();
    }
  };

  const getContent = () => {
    setStore(fullData);
  };

  const deleteStoreById = () => {
    deleteStore({ store_id: store_id })
      .then(() => {
        toast.success("Store deleted successfully");
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
                onClick={editStore}
              />
              <WarningCard
                message="Are you Sure you want to delete this store?"
                header="Confirmation"
                acceptFunction={deleteStoreById}
              />
            </div>
          ) : (
            ""
          )}
          <div className="availbility !top-4">
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
          <div className="rating bg-gray-50 left-2 w-[110px] rounded-full text-black px-3 py-2 font-bold absolute bottom-0 text-sm flex items-center gap-2 mb-2">
            <img src={star} alt="" className="h-6" />
            {fullData.rating.toFixed(0)} of 5
          </div>
        </div>

        <div className="bottom bg-white p-2 rounded-b-[12px]">
        
          <div className="name flex items-center font-black sm:text-[.85rem] h-[5vh]">
            {storeName}
          </div>
          <div className="location flex text-xs items-center gap-2 h-[5vh]">
            <img src={location} alt="" className=" h-5" />
            {storeLocation}
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
                  openChecker("store-details"), addClientData();
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
