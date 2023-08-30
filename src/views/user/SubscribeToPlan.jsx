import { useEffect, useState } from "react";
import { getPromotionPlan } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function SubscribeToPlan() {
  const [allPromotion, setAllPromotions] = useState([]);
  const [plan, setPlan] = useState();

  const userData = useRecoilValue(user);
  useEffect(() => {
    getPromotionPlan().then((res) => {
      setAllPromotions(res);
      setPlan(res[0].title);
    });
  }, []);
  return (
    <div className="">
      <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full lg:w-full">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Subscription  Plans
          </h2>
          
        </div>
        <div className="group flex flex-col justify-center items-center  flex-wrap gap-2 mt-10">
        <div className="left w-full lg:w-[56%] border p-4 rounded-lg">
          {/* <div className="text-center text-[1.1rem] font-black">Select a Subscription Plan</div> */}
          <div className="flex items-center justify-center ">
          {allPromotion.map((res) => (
            <div className="mt-3 " key={res.id}>
              <div
                className={
                  plan === res.title
                    ? "bg-gray-100 p-2  border rounded-full text-center font-bold text-[16px] cursor-pointer"
                    : "p-2 rounded-full text-center cursor-pointer text-[16px]"
                }
                onClick={() => setPlan(res.title)}
              >
                {res.title}
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="right w-full lg:w-[56%] border rounded-lg">
          {allPromotion.map((res) => (
            <div key={res.id}>
              {plan === res.title ? (
                <div className="p-4 ">
                  <div className="font-black text-[20px] text-center">{res.duration}</div>
                  <div className="text-center py-5">{res.no_of_products}</div>
                  <div className="text-center mt-2">
                    <small className="">Pricing</small>
                    <small> (VAT Inclusive)</small>
                    <h2 className="font-black text-3xl py-5" >{res.price}</h2>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="p-6 cursor-pointer bg-green-800 text-center text-white text-sm font-bold rounded-b-lg">
            SELECT PLAN
          </div>
        </div>
      </div>
      </div>

      
    </div>
  );
}
