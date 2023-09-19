import moment from "moment";
import { useState } from "react";
import SubscribeToPlan from "../../views/user/SubscribeToPlan";

export default function PromotionSubscriptionCard({ promotion }) {
  const [visible, setVisible] = useState(false);

  const showPlans = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className=" border  h-full lg:h-[10vh] rounded-md bg-gray-100  my-5">
        <div className="flex flex-wrap  items-center justify-between h-full">
          <div className=" flex items-center  justify-between flex-wrap lg:flex-nowrap gap-5 p-5 w-full lg:w-[60%] rounded-md bg-green-900 h-full text-white">
            <div className="flex items-center gap-5">
              <i className=" pi pi-cog  pi-spin !text-xl"></i>
              <div className="">
                <h3 className="font-black text-lg ">
                  {promotion?.promotion_title}
                </h3>
                <p className="">{promotion?.no_of_products} Products</p>
              </div>
            </div>
            {promotion?.plan !== "Yearly" ? (
              <button
                className="p-3 border bg-[var(--primary)] text-white rounded-full"
                onClick={showPlans}
              >
                Upgrade Plan
              </button>
            ) : (
              <button className="p-3 border bg-[var(--primary)] text-white rounded-full"   onClick={showPlans}>
                Downgrade Plan
              </button>
            )}
          </div>
          <div className=" flex items-center gap-4 p-5">
            {promotion?.subscription === "Active" ? (
              <div className=" bg-green-100 p-2 rounded text-sm text-green-600">
                {promotion?.subscription}
              </div>
            ) : (
              <div className="bg-red-100 p-2 rounded text-sm text-red-600">
                {promotion?.subscription}
              </div>
            )}

            <p className="p-2 bg-gray-50 text-xs rounded-full">
              {moment(promotion?.date).fromNow()}
            </p>
          </div>
        </div>
      </div>
      {visible ? <SubscribeToPlan /> : ""}
    </>
  );
}
