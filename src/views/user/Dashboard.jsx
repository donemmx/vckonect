import searchIcon from "../../assets/sidebar/search-dash.svg";
import storeIcon from "../../assets/sidebar/stores.svg";
import livestockIcon from "../../assets/sidebar/livestock.svg";
import adsIcon from "../../assets/sidebar/ads.svg";
import arrow from "../../assets/sidebar/gray-arrow.svg";
import AccountCard from "../../components/accountCard/AccountCard";
import { useState } from "react";
import DashboardCard from "../../components/dashboardCard/DashboardCard";

export default function Dashboard() {
  const [tab, setTab] = useState('activity');

  const activeTab = (type) => {
    setTab(type)
  };

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
          link={"/"}
        />
        <AccountCard
          image={livestockIcon}
          icon={arrow}
          title="Manage Your Pet & Livestock Farm"
          subtitle="Manage your pet and livestock farm on our platform to access high quality vet care"
          link={"/"}
        />
        <AccountCard
          image={adsIcon}
          icon={arrow}
          title="Manage Your Promotions"
          subtitle="Promote your products by activating promotion subscription plan"
          link={"/"}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className={` text-[1rem] lg:text-[1.3rem] cursor-pointer ${tab === 'activity' ? 'font-black' : '' } `} onClick={()=> activeTab('activity')}>
            Recent Activities
          </h2>
          <h4 className={`text-[1rem] lg:text-[1.3rem] cursor-pointer ${tab === 'forum' ? 'font-black' : ''} `}  onClick={() => activeTab('forum')}>
            Forum Trending Topics
          </h4>
        </div>

        {tab == 'activity' ? (
          <div className="posts p-3 mt-5 grid gap-2">
            <DashboardCard
              time={"10"}
              title={"Deleted Vendor From Client List"}
              name={"Topic"}
            />
            <DashboardCard
              time={"10"}
              title={"Liked a Forum Chat"}
              name={"Topic"}
            />
            <DashboardCard
              time={"10"}
              title={"Case Title - Case ID"}
              name={"Topic"}
            />
            <DashboardCard
              time={"10"}
              title={"Sent a Direct Message"}
              name={"Message first paragraph"}
            />
            <DashboardCard
              time={"10"}
              title={" Replied a Direct Message"}
              name={"Message first paragraph"}
            />
          </div>
        ) : (
          ""
        )}
        {tab == 'forum' ? (
          <div className="posts p-3 mt-5 grid gap-2">
            <DashboardCard
              time={"10"}
              title={"How to care for your pet"}
              name={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
            />
            <DashboardCard
              time={"10"}
              title={"Pet Owners Hacks"}
              name={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
            />
            <DashboardCard
              time={"10"}
              title={"Seasonal Pet SIckness"}
              name={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
            />
            <DashboardCard
              time={"10"}
              title={"Livestock Farmer Should Avoid This Three Things During Winter"}
              name={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
            />
            <DashboardCard
              time={"10"}
              title={" Common Foot Sickness for Dogs"}
              name={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
