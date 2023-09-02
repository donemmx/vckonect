import SubscriptionCard from "../components/subscriptionCard/SubscriptionCard";
import React, { useEffect, useState } from "react";
import {  getSubscriptionPlan } from "../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";
import ReactDOM from "react-dom";

export default function OnboardVetSubscribe() {
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [plan, setPlan] = useState();
  const [selectedPlan, setSelectedPlan] = useState("");
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  const userData = useRecoilValue(user);

  const createOrder = (data, actions) => {
    let amount = 0;

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  function PaypalSubmit() {
    if (selectedPlan) {
      return (
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      );
    } else {
      return (
        <button
          className="p-6 cursor-pointer bg-green-800 text-center text-white text-sm font-bold rounded-b-lg disabled"
          type="submit"
          disabled
        >
          Pay with Paypal
        </button>
      );
    }
  }

  useEffect(() => {
    getSubscriptionPlan().then((res) => {
      setAllSubscriptions(res);
      setPlan(res[0].title);
    });
  }, []);
  return (
    <div className="login pt-[15vh]">
        <h2 className="font-black text-center text-4xl my-10 ">Subscribe to a plan</h2>
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
            <SubscriptionCard data={res} selectedPlan={plan} key={res.id}/>
        ))}
      </div>
    </div>
  );
}
