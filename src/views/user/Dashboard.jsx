/* eslint-disable no-unused-vars */
import searchIcon from "../../assets/sidebar/search-dash.svg";
import storeIcon from "../../assets/sidebar/stores.svg";
import livestockIcon from "../../assets/sidebar/livestock.svg";
import cases from "../../assets/sidebar/cases.svg";
import adsIcon from "../../assets/sidebar/promotionIcon.svg";
import arrow from "../../assets/sidebar/gray-arrow.svg";
import AccountCard from "../../components/accountCard/AccountCard";
import { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboardCard/DashboardCard";
import { getForumChat } from "../../utils/userApiService";
import { getAnimalOwnerActivity } from "../../utils/animalOwnerApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import moment from "moment";
import useRouteChecker from "../../hooks/RouteChecker";
import AdminHeader from "../../components/header/AdminHeader";
import { getVeterinarianActivity } from "../../utils/vetApiService";
import { useNavigate } from "react-router-dom";
import AdminCardLoading from "../../components/loading/AdminCardLoading";

export default function Dashboard() {
  const [tab, setTab] = useState("activity");
  const userData = useRecoilValue(user);

  const [forumData, setForumData] = useState([]);
  const [routeChecker] = useRouteChecker();
  const [loading, setLoading] = useState(true);
  const [allActivities, setAllActivities] = useState([]);
  const location = useNavigate();
  const activeTab = (type) => {
    setTab(type);
  };
  useEffect(() => {
    getForumChat().then((res) => setForumData(res));
  }, []);

  const getRoute = (route) => {
    const myRoute = routeChecker(route);

    console.log(myRoute);
  };

  useEffect(() => {
    let payload = {
      id: userData.id,
      role: userData.role,
    };
    if (userData.role === "Animal Owner") {
      setLoading(true);
      getAnimalOwnerActivity(payload).then((res) => {
        setAllActivities(res);
        setLoading(false);
      });
    } else {
      setLoading(true);
      getVeterinarianActivity(payload).then((res) => {
        setAllActivities(res);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (
      userData?.subscription === null ||
      userData?.subscription === "Expired"
    ) {
      location("/vet-subscription");
    }
  }, []);
  return (
    <div className="">
      <div className="form grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
        <AccountCard
          image={searchIcon}
          icon={arrow}
          title="Search for what you need"
          subtitle="Browse our platform to discover vets, vet clinics, and vendors around you"
          link={"/"}
        />
        <AccountCard
          image={storeIcon}
          icon={arrow}
          title="Manage your store"
          subtitle="Join the poor of vendors on our platform to earn from sales."
          onClick={() => getRoute("stores")}
        />
        {userData?.role === "Animal Owner" ? (
          <AccountCard
            image={livestockIcon}
            icon={arrow}
            title="Manage Your Pet & Livestock Farm"
            subtitle="Manage your pet and livestock farm on our platform to access high quality vet care"
            link={"/livestock"}
          />
        ) : (
          <AccountCard
            image={cases}
            icon={arrow}
            title="Manage Your Cases"
            subtitle="Manage your cases on our platform to access high quality vet care"
            link={"/vet-cases"}
          />
        )}
        <AccountCard
          image={adsIcon}
          icon={arrow}
          title="Manage Your Promotions"
          subtitle="Promote your products by activating promotion subscription plan"
          onClick={() => getRoute("promotion")}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2
            className={` text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "activity" ? "font-black" : ""
            } `}
            onClick={() => activeTab("activity")}
          >
            Recent Activities
          </h2>
          <h4
            className={`text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "forum" ? "font-black" : ""
            } `}
            onClick={() => activeTab("forum")}
          >
            Forum Trending Topics
          </h4>
        </div>
        {loading ? (
          <div className="grid gap-2">
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
          </div>
        ) : (
          ""
        )}
        {tab == "activity" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {allActivities?.map((res) => (
              <DashboardCard
                time={moment(res.date).fromNow()}
                title={res.title}
                name={res.detail}
                key={res.id}
              />
            ))}
          </div>
        ) : (
          ""
        )}
        {tab == "forum" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {forumData?.map((res) => (
              <DashboardCard
                time={moment(res.date).fromNow()}
                title={res.title}
                name={res.user_name}
                key={res.id}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
