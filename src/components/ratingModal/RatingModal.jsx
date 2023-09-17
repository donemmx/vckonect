import { useState } from "react";
import { Rating } from "primereact/rating";
import veriiedIcon from "../../assets/icons/create-account/onboard/verified-icon.svg";
import { rate } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { toast } from "react-toastify";

export default function RatingModal({ type, id }) {
  const [value, setValue] = useState(0);
  const userData = useRecoilValue(user);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const getValue = (data) => {
    setValue(data);
  };

  const submitRating = () => {
    setLoading(true);
    const payload = {
      user_id: userData?.id,
      user_role: userData?.role,
      type: type,
      id: id,
      rating: value,
    };
    rate(payload).then((res) => {
      setSubmitted(true);
      setLoading(false);
      toast.success(res.detail)
    });
  };
  return (
    <>
      {!submitted ? (
        <div className="flex w-full flex-col items-center justify-center h-[60vh] ">
          <i className="pi pi-star-fill !text-[3.5rem] !text-yellow-400 "></i>
          <h2 className="py-4 lg:text-[1.3rem] font-black"> {type.split('')[0].toUpperCase() + type.slice(1)}'s Feedback</h2>
          <p className=" w-full subtitle paragraph text-center ">
            We would like you to rate this {type} on a scale of 1 to 5
          </p>
          <Rating
            value={value}
            onChange={(e) => getValue(e.target.value)}
            cancel={false}
            stars={5}
            className="h-20"
          />
          <button className="green__btn" disabled={loading || value === 0} onClick={submitRating}>
            {loading ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Submit {type.split('')[0].toUpperCase() + type.slice(1)} Rating
          </button>
        </div>
      ) : (
        <div className=" flex justify-center items-center h-[40vh]">
          <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
            <div className="flex items-center justify-center pb-4">
              <img
                src={veriiedIcon}
                alt=""
                className=" w-[70px] object-cover"
              />
            </div>
            <h2 className="py-4 lg:text-[1.3rem] text-center font-black">
              Rating Submitted
            </h2>
            <div className="subtitle paragraph text-center">
              Thank you for your feedback and honest response
            </div>
          </div>
        </div>
      )}
    </>
  );
}
