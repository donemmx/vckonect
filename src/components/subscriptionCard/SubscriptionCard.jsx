import React from "react";
import cancelled from "../../assets/sidebar/cancel.svg";
import approved from "../../assets/sidebar/verified.svg";

export default function SubscriptionCard({
  title,
  price,
  contact,
  calculator,
  predictor,
  store,
  support,
  message,
  caseRecord,
}) {
  return (
    <div className="p-4">
      <div className="title text-[20px] font-black">Freemium</div>
      <div className="">Freemium Price</div>
      <div className="price text-[35px] font-black">$0.00</div>
      <div className=" border-t">
        <div className="flex items-center gap-2">
          {approved ? <img src={approved} alt="" /> : <img src={cancelled} alt="" />}
          <div className="">
            <h4 className=" text-[16px] font-bold">Profile Approval</h4>
            <p className=" text-[12px]">No Approved Badge</p>
          </div>
        </div>
      </div>
    </div>
  );
}
