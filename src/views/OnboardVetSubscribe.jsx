import SubscriptionCard from "../components/subscriptionCard/SubscriptionCard";
import React, { useEffect, useState } from "react";
import { getSubscriptionPlan } from "../utils/userApiService";


export default function OnboardVetSubscribe() {
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [plan, setPlan] = useState();


  
  useEffect(() => {
    getSubscriptionPlan().then((res) => {
      setAllSubscriptions(res);
      setPlan(res[0].title);
    });
  }, []);
  return (
    <div className="login pt-[15vh]">
      <h2 className="font-black text-center text-4xl mt-10 ">Subscribe to a plan</h2>
      <div className="subtitle paragraph text-center">
        Select a plan to continue
      </div>
      <div className="left w-full lg:w-[100%] p-2 rounded-lg">
        <div className="flex bg-white w-fit flex-wrap mx-auto p-3 shadow rounded-2xl items-center justify-center ">
          {allSubscriptions.map((res) => (
            <div className="mt-1 " key={res.id}>
              <div
                className={
                  plan === res.title
                    ? "bg-gray-100 p-2  border rounded-full text-center font-bold text-[14px] cursor-pointer"
                    : "p-2 rounded-full text-center cursor-pointer text-[14px]"
                }
                onClick={() => setPlan(res.title)}
              >
                {res.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center w-[100%] gap-3 flex-wrap py-10 mx-auto">
        {allSubscriptions.map((res) => (
          <SubscriptionCard data={res} selectedPlan={plan} key={res.id} />
        ))}
      </div>
    </div>
  );
}
