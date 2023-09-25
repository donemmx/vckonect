import phone from "../../assets/icons/phone-icon.svg";
import message from "../../assets/icons/message-icon.svg";
import openIcon from "../../assets/bg/card-next-bg.svg";
import verified from "../../assets/vetcard/verified-icon.svg";
import unverified from "../../assets/sidebar/cancel.svg";
import star from "../../assets/icons/star.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { actionState } from "../../atom/actionAtom";
import DirectMessageModal from "../directMessageModal/DirectMessageModal";
import { useNavigate } from "react-router-dom";

export default function Vetcard({ fullData }) {
  const userData = useRecoilValue(user);
  const [action, setAction] = useRecoilState(actionState);
  const location = useNavigate();

  const checker = (route) => {
    if (userData?.id) {
      if (userData?.role === "Veterinarian") {
        location(`/${route}/${fullData?.id}`);
      } else {
        location(`/animal-owner-${route}/${fullData?.id}`);
      }
    } else {
      location(`/veterinarian/${fullData?.id}`);
    }
  };


  return (
    <div className=" vetCard my-6">
      <div className="group h-full w-full ">
        <div
          className="top h-[65%] w-full relative"
          style={{
            backgroundImage: `url(${fullData?.profile_picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="availbility">
            {fullData?.availability === "1" ? (
              <div className=" flex items-center gap-2 text-[.8rem]">
                <div className="available "></div>
                Available
              </div>
            ) : (
              <div className=" flex items-center gap-2 text-[.8rem]">
                <div className="unavailable "></div>
                Unvailable
              </div>
            )}
          </div>

          <div className="bottom flex items-center justify-between p-2 absolute bottom-2 w-full ">
            <div className="rating bg-gray-50 left-2 rounded-full text-black px-3 py-2 font-bold bottom-0 text-sm flex items-center gap-2 mb-2">
              <img src={star} alt="" className="h-6" />
              {fullData?.rating ?? 0} of 5
            </div>
            <div className="verfied">
              {fullData?.vet_number_status === "Verified" ? (
                <img src={verified} alt="" />
              ) : (
                <img src={unverified} />
              )}
            </div>
          </div>
        </div>
        <div className="bottom bg-white p-2 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1.1rem] h-[5vh]">
            {`${fullData?.first_name} ${fullData?.last_name}`}
          </div>
          <div className="location flex text-xs items-center gap-2  h-[5vh]">
            <img src={location} alt="" className=" h-5" />
            {`${fullData?.state}, ${fullData?.address}`}
          </div>
          {fullData?.subscription_title !== "Freenium Plan" ? (
            <div className="buttons pt-1 flex justify-between items-center mt-3">
              {userData?.id ? (
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
              ) : (
                ""
              )}
              <div className="message">
                <button
                  onClick={() => {
                    checker("vet-details");
                  }}
                >
                  <img src={openIcon} alt="" />
                </button>
              </div>
            </div>
          ) : (
            <div className=" h-[11.5vh]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
