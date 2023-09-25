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
import { Paginator } from "primereact/paginator";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState();
  const [activeSub, setActiveSub] = useState([]);
  const [expiredSub, setExpiredSub] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [quarterly, setQuarterly] = useState([]);
  const [freemium, setFreemium] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useRecoilValue(user);
  const [tab, setTab] = useState("all");
  const [subscribers, setSubscribers] = useState("freemium");
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const location = useNavigate();

  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);
  const [currentData, setCurrentData] = useState();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    const myData = currentData?.slice(event.first, event.rows + event.first);
    setCurrentPage(myData);
    setTotalRecords(currentData?.length);
  };

  const formatNumber = (number) => {
    if (number > 999) {
      return `${(number / 1000).toFixed(2)}k`;
    }
    return number;
  };

  const getSubscriptions = async () => {
    setLoading(true);
    const payload = {};
    await adminGetSubscriptionPlan(payload).then(({data}) => {
      setSubscriptions(data);
      setLoading(false);
    });
  };


  const getActiveTabData = (type) => {
    setSubscribers(type)
    switch(type){
      case 'freemium':
        setCurrentData(freemium);
        break;
      case 'monthly':
        setCurrentData(monthly);
        break;
      case 'quarterly':
        setCurrentData(quarterly);
        break;
      case 'yearly':
        setCurrentData(yearly);
        break;
      default:
      break;
    }
  }

  const getmySubscriptions = () => {
    adminGetSubscription({ name: null }).then(({data}) => {
      setUserSubscription(data);
      const filteredActiveSub = data.filter(
        (data) => data.subscription === "Active"
      );
      const filteredExpiredSub = data.filter(
        (data) => data.subscription === "Expired"
      );
      const freemiumSub = data.filter((data) => data.plan === "Freenium");
      const monthlySub = data.filter((data) => data.plan === "Monthly");
      const quarterlySub = data.filter((data) => data.plan === "Quarterly");
      const yearlySub = data.filter((data) => data.plan === "Yearly");
    
      setFreemium(freemiumSub);
      setMonthly(monthlySub);
      setQuarterly(quarterlySub);
      setYearly(yearlySub);
      setActiveSub(filteredActiveSub);
      setExpiredSub(filteredExpiredSub);
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

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-2 mt-5">
        <AdminCard
          number={formatNumber(userSubscription?.length)}
          text="Total Subscribers"
          icon={totalSubscribers}
        />
        <AdminCard
          number={formatNumber(activeSub?.length)}
          text="Active Subscription"
          icon={activeSubscriber}
        />

        <AdminCard
           number={formatNumber(expiredSub?.length)}
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
              className={` text-[.85rem] lg:text-[1rem] cursor-pointer ${
                tab === "all" ? "font-black" : ""
              } `}
              onClick={() => setTab("all")}
            >
              Subscribers
            </h2>
            <h2
              className={` text-[.85rem] lg:text-[1rem] cursor-pointer ${
                tab === "subscription" ? "font-black" : ""
              } `}
              onClick={() => setTab("subscription")}
            >
              Subscription
            </h2>
          </div>
          {tab === "all" ? (
            <div className="flex  items-center gap-6">
              <h2
                className={` text-[.75rem] lg:text-[1rem] cursor-pointer ${
                  subscribers === "freemium" ? "font-black" : ""
                } `}
                onClick={() => getActiveTabData("freemium")}
              >
                Freemium
              </h2>
              <h2
                className={` text-[.75rem] lg:text-[1rem] cursor-pointer ${
                  subscribers === "monthly" ? "font-black" : ""
                } `}
                onClick={() =>  getActiveTabData("monthly")}
              >
                Monthly
              </h2>
              <h2
                className={` text-[.75rem] lg:text-[1rem] cursor-pointer ${
                  subscribers === "quarterly" ? "font-black" : ""
                } `}
                onClick={() => getActiveTabData("quarterly")}
              >
                Quarterly
              </h2>
              <h2
                className={` text-[.75rem] lg:text-[1rem] cursor-pointer ${
                  subscribers === "yearly" ? "font-black" : ""
                } `}
                onClick={() => getActiveTabData("yearly")}
              >
                Yearly
              </h2>
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <div className="grid gap-2">
              <AdminCardLoading />
              <AdminCardLoading />
              <AdminCardLoading />
            </div>
          ) : (
            <>
              {tab === "all" ? (
               subscribers === 'freemium' ?
                <>
                  {currentPage?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      status={res.subscription}
                      image={res.profile_picture}
                      loading={loading}
                    />
                  ))}
                </>
                :
                subscribers === 'monthly' ?
                <>
                  {currentPage?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      status={res.subscription}
                      image={res.profile_picture}
                      loading={loading}
                    />
                  ))}
                </> :
                 subscribers === 'quarterly' ?
                <>
                  {currentPage?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      status={res.subscription}
                      image={res.profile_picture}
                      loading={loading}
                    />
                  ))}
                </> :
                  subscribers === 'yearly' ?
                <>
                  {currentPage?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      status={res.subscription}
                      image={res.profile_picture}
                      loading={loading}
                    />
                  ))}
                </>

                : ''
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
      <Paginator
        className="mt-10"
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[8, 16, 24, 32]}
        onPageChange={onPageChange}
      />
    </div>
  );
}
