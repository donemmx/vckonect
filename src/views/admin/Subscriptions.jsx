/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { getSubscriptionPlan } from "../../utils/adminApiService";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import AdminCardLoading from "../../components/loading/AdminCardLoading";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState();
  const [loading, setLoading] = useState(true);
  const userData = useRecoilValue(user);

  const getSubscriptions = async () => {
    setLoading(true);
    const payload = {};
    await getSubscriptionPlan(payload).then((res) => {
      setSubscriptions(res);
      setLoading(false);
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
                  // time={moment(res.date).utc().fromNow()}
                  title={res.title}
                  approveButtonText='Activate'
                  rejcetButtonText='Deactivate'
                  name={res.detail}
                  price={res.price}
                  duration={res.duration}
                  
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
