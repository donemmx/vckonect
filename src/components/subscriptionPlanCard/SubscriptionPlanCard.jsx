import moment from "moment";
import { useEffect, useState } from "react";
import SubscriptionCard from "../subscriptionCard/SubscriptionCard";
import { getSubscriptionPlan } from "../../utils/userApiService";

export default function SubscriptionPlanCard({ subscription }) {
  const [visible, setVisible] = useState(false);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [plan, setPlan] = useState();

  const showPlans = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getSubscriptionPlan().then(({ data }) => {
      setAllSubscriptions(data);
      setPlan(data[0].title);
    });
  }, []);

  return (
    <>
      <div className=" border  h-full lg:h-[10vh] rounded-md bg-gray-100  my-5">
        <div className="flex flex-wrap   items-center justify-between h-full">
          <div className=" flex items-center  justify-between flex-wrap lg:flex-nowrap gap-5 p-5 w-full lg:w-[60%] rounded-md bg-green-900 h-full text-white">
            <div className="flex items-center gap-5">
              <i className=" pi pi-cog  pi-spin !text-xl"></i>
              <div className="">
                <h3 className="font-black text-lg ">
                  {subscription?.subscription_title}
                </h3>
                <p className="">
                  {subscription?.no_of_products === "1"
                    ? `${subscription?.no_of_products} Product`
                    : ` ${subscription?.no_of_products} Products`}{" "}
                </p>
              </div>
            </div>
            {subscription?.subscription_title !== "Yearly" ? (
              <button
                className="p-3 border bg-[var(--primary)] text-white rounded-full"
                onClick={showPlans}
              >
                Upgrade Plan
              </button>
            ) : (
              <button
                className="p-3 border bg-[var(--primary)] text-white rounded-full"
                onClick={showPlans}
              >
                Downgrade Plan
              </button>
            )}
          </div>
          <div className=" flex items-center gap-4 p-5">
            <div className=" bg-green-100 p-2 rounded text-sm text-green-600">
              {subscription?.subscription_id}
            </div>

            <p className="p-2 bg-gray-50 text-xs rounded-full">
              {moment(subscription?.date).fromNow()}
            </p>
          </div>
          {visible ? (
            <div className="">
              <h2 className="font-black text-center text-4xl mt-10 ">
                Subscribe to a plan
              </h2>
              <div className="subtitle paragraph text-center">
                Select a plan to continue
              </div>
              <div className="left w-full lg:w-[100%] p-2 rounded-lg">
                <div className="flex bg-white w-fit flex-wrap mx-auto p-3 shadow rounded-2xl items-center justify-center ">
                  {allSubscriptions?.map((res) => (
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
                {allSubscriptions?.map((res) => (
                  <SubscriptionCard
                    data={res}
                    selectedPlan={plan}
                    key={res.id}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
