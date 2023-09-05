import React, { useEffect, useState } from "react";
import {
  getMyPromotionPlan,
  getPromotionPlan,
  subscribePromotionPlan,
} from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import ReactDOM from "react-dom";
import CurrencyFormatter from "currency-formatter-react";
import { Dialog } from "primereact/dialog";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import useUpadateReload from "../../hooks/UpdateRelaod";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function SubscribeToPlan() {
  const [allPromotion, setAllPromotions] = useState([]);
  const [plan, setPlan] = useState(null);
  const [paymentChannel, setPaymentChannel] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);
  const publicKey = "pk_test_b151276bd6786f5c094f1c35d7ee0008f073fb2d";
  const userData = useRecoilValue(user);
  const [amount, setAmount] = useState(0);
  const [updateReload] = useUpadateReload();


  const addSubscription = (data) => {
    const {title,price, id, ...others} = data
    const payload = {
      id: userData?.id,
      promotion_title: title,
      promotion_price: price.slice(3),
      role: userData?.role,
      ...others
    };

    subscribePromotionPlan(payload).then((res) => {
      toast.success(res.detail);
      updateReload()
      getPromotionPlan().then((res) => {
        setAllPromotions(res);
        setPlan(res[0].title);
      });
    });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: selected.price.slice(3),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    setVisible(!visible);
    addSubscription();
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

  const selectPlan = (data) => {
    setSelected(data);
    if (Number(data.price.slice(3)) === 0) {
      setLoading(true);
      addSubscription(data);
    } else {
      setAmount(Number(data?.price?.slice(3)) * 780*100);
      openModal();
    }
  };

  const componentProps = {
    email: userData?.email,
    amount: amount,
    metadata: {
      name: `${userData?.first_name} ${userData?.last_name}`,
      phone: `${userData?.phone_number}`,
    },
    publicKey,
    text: "Paystack",
    onSuccess: () => {
      setVisible(!visible);
      addSubscription(selected);
    },
    onClose: () => {
      setLoading(false);
    },
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
                      onClick={() => selectPlan(res)}
                    >
                      {loading ? <i className="pi pi-spinner pi-spin"></i>: ''}
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
        onHide={() => {
          setVisible(false), setPaymentChannel(null);
        }}
      >
        <div className="flex flex-col gap-10 items-center justify-between w-fit mx-auto ">
          <h2 className=" text-center font-bold">Select A Payment Channel</h2>
          {paymentChannel == null ? (
            <div className="flex items-center gap-10">
              <div
                className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white  "
                onClick={() => setPaymentChannel("paypal")}
              >
                Paypal
              </div>
              <PaystackButton
                className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white"
                {...componentProps}
              />
            </div>
          ) : paymentChannel === "paypal" ? (
            <PaypalSubmit />
          ) : (
            ""
          )}
        </div>
      </Dialog>
    </div>
  );
}
