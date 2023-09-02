import React, { useEffect, useState } from "react";
import { getPromotionPlan } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import ReactDOM from "react-dom";
import CurrencyFormatter from "currency-formatter-react";

export default function SubscribeToPlan() {
  const [allPromotion, setAllPromotions] = useState([]);
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
    getPromotionPlan().then((res) => {
      setAllPromotions(res);
      setPlan(res[0].title);
    });
  }, []);
  return (
    <div className="">
      <div className="activity mt-5  lg:p-3  bg-white rounded-lg w-full lg:w-full">
        <div className="group flex flex-col justify-center items-center  flex-wrap gap-2 ">
          <div className="left w-full  lg:w-[100%] p-2 rounded-lg">
            <div className="flex flex-wrap items-center justify-center ">
              {allPromotion.map((res) => (
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
          <div className="right w-full lg:w-[56%] border rounded-lg">
            {allPromotion.map((res) => (
              <div key={res.id}>
                {plan === res.title ? (
                  <div className="p-4 ">
                    <div className="font-black text-[20px] text-center">
                      {res.duration}
                    </div>
                    <div className="text-center py-5">{res.no_of_products}</div>
                    <div className="text-center mt-2">
                      <small className="">Pricing</small>
                      <small> (VAT Inclusive)</small>
                      <h2 className="font-black text-3xl py-5">
                        <CurrencyFormatter
                          value={res.price.slice(3)}
                          thousandSeparator={true}
                          currency={res.price.slice(0, 3)}
                        />
                      </h2>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
            <div
              className="p-6 cursor-pointer bg-green-800 text-center text-white text-sm font-bold rounded-b-lg"
              onClick={PaypalSubmit}
            >
              SELECT PLAN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
