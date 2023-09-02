import cancelled from "../../assets/sidebar/cancel.svg";
import approved from "../../assets/sidebar/verified.svg";
import CurrencyFormatter from "currency-formatter-react";
import { useRecoilState } from "recoil";
import ReactDOM from "react-dom";
import { user } from "../../atom/userAtom";
import React, { useEffect, useState } from "react";
import { vetPlan } from "../../utils/vetApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../utils/userApiService";
import { Dialog } from "primereact/dialog";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function SubscriptionCard({ data, selectedPlan }) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState();
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(user);

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
    getUserData();
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

  const openModal = () => {
    setVisible(!visible);
  };

  const getUserData = async () => {
    await getUserById({ id: userData.id, role: userData.role }).then(
      (response) => {
        setUserData(response);
      }
    );
  };

  const subscribeUserToPlan = async (data) => {
    const payload = {
      id: userData?.id,
      role: userData?.role,
      title: data.title,
      subscription_id: data.subscription_id,
      price: data.price,
      no_of_products: data.no_of_products,
      store: data.store,
      case: data.case,
      plan_id: data.id,
    };

    await vetPlan(payload)
      .then(() => {
        toast.success("Subscription successful");
        setLoading(false);
        setSuccess(true);
        getUserData();

        navigate("/vet-dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectPlan = (data) => {
    setSelected(data);
    if (Number(data.price.slice(3)) === 0) {
      setLoading(true);
      subscribeUserToPlan(data);
    } else {
      openModal()
    }
  };

  useEffect(() => {
    if (userData.subscription === "Active") {
      navigate("/vet-dashboard");
    }
  }, [success]);

  return (
    <>
      {selectedPlan === data.title ? (
        <div className="p-8 bg-white relative shadow-lg w-[90%] md:w-[300px] mx-auto flex items-center justify-center rounded-2xl">
          <div className="w-full">
            <div className="title text-[24px] font-black mb-10">
              {data.title}
            </div>
            <div className="">{data.title.split(" ")[0]} Price</div>
            <div className="price text-[35px] font-black">
              <div className=" text-[26px] font-black">
                <CurrencyFormatter
                  value={data.price.slice(3)}
                  thousandSeparator={true}
                  currency={data.price.slice(0, 3)}
                />
              </div>
            </div>
            <div className=" border-t  flex flex-col gap-4">
              <div className="flex pt-4 items-center gap-2">
                {data.vat !== "0%" ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">VAT</h4>
                  <p className=" text-[12px]">{data?.vat}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {data?.case?.includes("No") ? (
                  <img src={cancelled} alt="" />
                ) : (
                  <img src={approved} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Case Record</h4>
                  <p className=" text-[12px]">{data?.case}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Duration</h4>
                  <p className=" text-[12px]">{data?.duration} </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Products</h4>
                  <p className=" text-[12px]">{data?.no_of_products}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Feed Calculator</h4>
                  <p className=" text-[12px]">{data?.feed_calculator}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Disease Predictor</h4>
                  <p className=" text-[12px]">{data?.disease_predictor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {approved ? (
                  <img src={approved} alt="" />
                ) : (
                  <img src={cancelled} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Store</h4>
                  <p className=" text-[12px]">{data?.store}</p>
                </div>
              </div>
              <div className="flex items-center mb-14 gap-2">
                {data?.customer_support?.includes("No") ? (
                  <img src={cancelled} alt="" />
                ) : (
                  <img src={approved} alt="" />
                )}
                <div className="">
                  <h4 className=" text-[16px] font-bold">Customer Support</h4>
                  <p className=" text-[12px]">{data?.customer_support}</p>
                </div>
              </div>
              <button
                className="p-6 cursor-pointer absolute bottom-0 w-full left-0 bg-green-800 text-center text-white text-sm font-bold rounded-b-lg flex items-center justify-center gap-4"
                disabled={loading}
                onClick={() => {selectPlan(data)}}
              >
                {loading ? <i className="pi pi-spinner pi-spin"></i> : ""}
                SELECT PLAN
              </button>
            </div>
            <Dialog
              visible={visible}
              className=" w-[95%] md:w-[70%] lg:w-[40%]"
              onHide={() => {
                setVisible(false), setPaymentChannel(null);
              }}
            >
              <div className="flex flex-col gap-10 items-center justify-between w-fit mx-auto ">
                <h2 className=" text-center font-bold">
                  Select A Payment Channel
                </h2>
                {paymentChannel == null ? (
                  <div className="flex items-center gap-10">
                    <div
                      className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white  "
                      onClick={() => setPaymentChannel("paypal")}
                    >
                      Paypal
                    </div>
                    <div
                      className="p-12 rounded-lg border cursor-pointer hover:bg-[var(--primary)] hover:text-white"
                      onClick={() => setPaymentChannel("paystack")}
                    >
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}
