/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import {
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
  const [loading, setLoading] = useState(true);
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const location = useNavigate();

  const getSubscriptions = async () => {
    setLoading(true);
    const payload = {};
    await getSubscriptionPlan(payload).then((res) => {
      setSubscriptions(res);
      setLoading(false);
    });
  };

  const deleteSubscription = (data) => {
    setLoading(true);
    const payload = {
      plan_id: data.plan_id,
    };
    deleteSubscriptionPlan(payload).then((res) => {
      toast.success("Subscription plan deleted successfully");
      setLoading(false);
      getSubscriptions()
    });
  };

  const editSubscription = (data) => {
    setStore(data);
    setAction("edit");
    location('/add-subscription')
  };


  useEffect(() => {
    getSubscriptions();
  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-2 mt-5">
        <AdminCard
          number={0}
          text="Total Subscribers"
          icon={totalSubscribers}
        />
        <AdminCard
          number={0}
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
          to="/add-subscription"
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Subscription</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>
        <div className="posts p-3 mt-5 grid gap-2">
          {loading ? (
            <div className="grid gap-2">
              <AdminCardLoading />
              <AdminCardLoading />
              <AdminCardLoading />
            </div>
          ) : (
            <>
              {subscriptions?.map((res) => (
                <AdminDashboardCard
                  key={res.id}
                  time={moment(res.date).utc().fromNow()}
                  title={res.title}
                  name={res.detail}
                  approveFunction={() => deleteSubscription(res)}
                  editFunction={() => editSubscription(res)}
                  message='Are you sure you want to delete this plan?'
                  price={res.price}
                  duration={res.duration}
                  deleteCard={true}
                  edit={true}
                  loading={loading}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
