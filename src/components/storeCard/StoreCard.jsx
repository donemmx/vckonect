/* eslint-disable no-unused-vars */
import phone from "../../assets/icons/phone-icon.svg";
import chat from "../../assets/icons/chat-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";
import { deleteStore } from "../../utils/userApiService";
import { toast } from "react-toastify";
import WarningCard from "../warningCard/WarningCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function StoreCard({
  availability,
  image,
  storeName,
  storeLocation,
  storePhone,
  store_id,
  fullData
}) {
  let deleteStoreById = () => {
    deleteStore({ store_id: store_id })
      .then((res) => {
        toast.success("Store deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const userData = useRecoilValue(user)

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
            <WarningCard
              message="Are you Sure you want to delete this store?"
              header="Confirmation"
              acceptFunction={deleteStoreById}
            />
          ) : (
            ""
          )}
          <div className="availbility">
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
          <div className="bottom flex items-center justify-between p-2 absolute bottom-2 w-full ">
            {/* <div className="rating text-white text-sm flex items-center gap-2">
              <img src={star} alt="" />
              4.0 of 5
            </div> */}
            {/* <div className="verfied">
              <img src={verified} alt="" />
            </div> */}
          </div>
        </div>
        <div className="bottom bg-white p-2 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1.2rem]">
            {storeName}
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            {storeLocation}
          </div>
          <div className="buttons pt-1 flex justify-between items-center mt-3">
            <div className="group flex items-center gap-3  ">
              <img
                src={phone}
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
                alt=""
              />
              <img
                src={chat}
                alt=""
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
              />
              <img
                src={message}
                alt=""
                className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
              />
            </div>
            <div className="message">
              <button>
                <img src={openIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
