import { useState } from "react";
import { Rating } from "primereact/rating";

export default function RatingModal() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const getValue = (data) => {
    console.log(data);
    setValue(data);
  };
  return (
    <div className="flex flex-col items-center justify-center  mt-[10vh]">
      <i className="pi pi-star-fill !text-[3rem] !text-yellow-400 "></i>
      <h2 className="py-4 lg:text-[1.3rem] font-black">User's Feedback</h2>
      <p className=" w-[60%] lg:w-[15%] text-sm text-center mx-auto ">We would like you to rate this user on a scale of 1 to 5</p>
      <Rating
          value={value}
          onChange={(e) => getValue(e.target.value)}
          cancel={false}
          stars={5}
          className="h-20"
        />
        <button
              className="green__btn"
              disabled={loading}
            >
              {loading ? (
                <i className="pi pi-spin pi-spinner !text-[20px]"></i>
              ) : (
                ""
              )}
              Submit Rating
            </button>
    </div>
  );
}
