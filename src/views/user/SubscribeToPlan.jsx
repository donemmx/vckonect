import React, { useEffect, useState } from "react";
import { getPromotionPlan } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import ReactDOM from "react-dom";
import CurrencyFormatter from "currency-formatter-react";
import { Dialog } from "primereact/dialog";
// import PayButton from '../../utils/paystackConfig'
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function SubscribeToPlan() {
  const [allPromotion, setAllPromotions] = useState([]);
  const [plan, setPlan] = useState(null);
  const [paymentChannel, setPaymentChannel] = useState();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [visible, setVisible] = useState(false);

  const userData = useRecoilValue(user);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: selectedPlan.price.slice(3),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    setVisible(!visible)
    getPromotionPlan().then((res) => {
      setAllPromotions(res);
      setPlan(res[0].title);
    });
    return actions.order.capture();
  };

  function PaypalSubmit() {
    return (
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    );
  }

  const openModal = (data) => {
    setVisible(!visible);
    setSelectedPlan(data);
  };

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
                    <div
                      className="p-6 cursor-pointer bg-green-800 text-center text-white text-sm font-bold rounded-b-lg"
                      onClick={() => openModal(res)}
                    >
                      SELECT PLAN
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog
        visible={visible}
        className=" w-[95%] md:w-[70%] lg:w-[40%]"
        onHide={() => {setVisible(false), setPaymentChannel(null)}}
      >
        <div className="flex flex-col gap-10 items-center justify-between w-fit mx-auto ">
          <h2 className=" text-center font-bold">Select A Payment Channel</h2>
          {paymentChannel == null ? (
            <div className="flex items-center gap-10">
              <div className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white  " onClick={()=> setPaymentChannel('paypal')}>
                Paypal
              </div>
              <div className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white" onClick={()=> setPaymentChannel('paystack')}>
                Paystack
              </div>
            </div>
          ) : paymentChannel === "paypal" ? (
            <PaypalSubmit />
          ) : paymentChannel === "paystack" ? (
            " "
          ) : (
            ""
          )}
        </div>
      </Dialog>
    </div>
  );
}
