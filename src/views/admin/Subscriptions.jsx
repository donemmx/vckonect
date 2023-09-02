/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import {
  adminGetSubscription,
  adminGetSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionPlan,
} from "../../utils/adminApiService";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import AdminCard from "../../components/adminCard/AdminCard";
import totalSubscribers from "../../assets/sidebar/total-subscribers.svg";
import activeSubscriber from "../../assets/sidebar/active-subscription.svg";
import expiredSubscribers from "../../assets/sidebar/active-subscription.svg";
import { toast } from "react-toastify";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState();
  const [userSubscription, setUserSubscription] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useRecoilValue(user);
  const [tab, setTab] = useState("all");
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const location = useNavigate();

  const getSubscriptions = async () => {
    setLoading(true);
    const payload = {};
    await adminGetSubscriptionPlan(payload).then((res) => {
      setSubscriptions(res);
      setLoading(false);
    });
  };

  const getmySubscriptions = () => {
    adminGetSubscription({ name: null }).then((res) => {
      setUserSubscription(res);
    });
  };

  const deleteMySubscription = async (payload) => {
    setLoading(true);
    await deleteSubscriptionPlan(payload).then((res) => {
      toast.success("Subscription plan deleted successfully");
      setLoading(false);
      getSubscriptions();
    });
  };

  const editSubscription = (data) => {
    setStore(data);
    setAction("edit");
    location("/add-subscription");
  };

  const addSubscription = () => {
    setAction("add");
    location("/add-subscription");
  };

  useEffect(() => {
    getSubscriptions();
    getmySubscriptions();
  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-2 mt-5">
        <AdminCard
          number={userSubscription?.Freenium?.length}
          text="Total Subscribers"
          icon={totalSubscribers}
        />
        <AdminCard
          number={userSubscription?.Freenium?.length}
          text="Active Subscription"
          icon={activeSubscriber}
        />

        <AdminCard
          number={0}
          text="Expired Subscription"
          icon={expiredSubscribers}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <Link
          onClick={addSubscription}
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Subscription</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>
        <div className="posts p-3 mt-5 grid gap-2">
          <div className="flex  items-center gap-6">
            <h2
              className={` text-[1rem] lg:text-[1rem] cursor-pointer ${
                tab === "all" ? "font-black" : ""
              } `}
              onClick={() => setTab("all")}
            >
              Subscribers
            </h2>
            <h2
              className={` text-[1rem] lg:text-[1rem] cursor-pointer ${
                tab === "subscription" ? "font-black" : ""
              } `}
              onClick={() => setTab("subscription")}
            >
              Subscription
            </h2>
          </div>
          {loading ? (
            <div className="grid gap-2">
              <AdminCardLoading />
              <AdminCardLoading />
              <AdminCardLoading />
            </div>
          ) : (
            <>
              {tab === "all" ? (
                 <>
                 {userSubscription?.Freenium?.map((res) => (
                   <AdminDashboardCard
                   key={res.id}
                   time={moment(res.date).utc().fromNow()}
                   title={res.first_name + res.last_name}
                   name={res.role}
                   image={res.profile_picture}
                   loading={loading}
                   freeText={res.plan}
                 />
                 ))}
               </>
              ) : (
                <>
                  {subscriptions?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.subscription_title}
                      name={res.detail}
                      message="Are you sure you want to delete this plan?"
                      price={res.currency + res.price}
                      duration={`${res.subscription_title} (${res.duration} ${res.date_option})`}
                      deleteCard={true}
                      edit={true}
                      loading={loading}
                      approveFunction={() =>
                        deleteMySubscription({
                          plan_id: res.subscription_id,
                        })
                      }
                      editFunction={() => editSubscription(res)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
