/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { getSubscriptionPlan } from "../../utils/adminApiService";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState();
  const userData = useRecoilValue(user);

  const getSubscriptions = async () => {
    const payload = {};
    await getSubscriptionPlan(payload).then((res) => {
      setSubscriptions(res);
    });
  };

  useEffect(() => {
    getSubscriptions();
  }, []);
  return (
    <div className="w-full">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <Link
          to="/add-subscription"
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Subscription</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>
        <div className="posts p-3 mt-5 grid gap-2">
          {subscriptions?.map((res) => (
            <AdminDashboardCard
              time={moment(res.date).utc().fromNow()}
              title={res.title}
              name={res.detail}
              key={res.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
