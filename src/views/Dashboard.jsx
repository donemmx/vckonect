import searchIcon from "../assets/sidebar/search-dash.svg";
import storeIcon from "../assets/sidebar/stores.svg";
import livestockIcon from "../assets/sidebar/livestock.svg";
import adsIcon from "../assets/sidebar/ads.svg";
import arrow from "../assets/sidebar/gray-arrow.svg";
import AccountCard from "../components/accountCard/AccountCard";

export default function Dashboard() {
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
          <h2 className=" text-[1rem] lg:text-[1.3rem] font-black ">Recent Activities</h2>
          <h4 className=" text-[1rem] lg:text-[1.3rem]">Forum Trending Topics</h4>
        </div>

        <div className="posts p-3 mt-5 grid gap-2">
          <div className=" bg-white  flex items-center justify-between p-6 border rounded-lg">
            <div className="">
              <div className="font-bold text-sm">
                Deleted Vendor From Client List
              </div>
              <div className=" text-[11px]">Vendor Name</div>
            </div>
            <div className="text-[11px] bg-gray-100 p-2 border rounded-full">10 mins ago</div>
          </div>
          <div className=" bg-white  flex items-center justify-between p-6 border rounded-lg">
            <div className="">
              <div className="font-bold text-sm">
                Deleted Vendor From Client List
              </div>
              <div className=" text-[11px]">Vendor Name</div>
            </div>
            <div className="text-[11px] bg-gray-100 p-2 border rounded-full">10 mins ago</div>
          </div>
          <div className=" bg-white  flex items-center justify-between p-6 border rounded-lg">
            <div className="">
              <div className="font-bold text-sm">
                Deleted Vendor From Client List
              </div>
              <div className=" text-[11px]">Vendor Name</div>
            </div>
            <div className="text-[11px] bg-gray-100 p-2 border rounded-full">10 mins ago</div>
          </div>
          <div className=" bg-white  flex items-center justify-between p-6 border rounded-lg">
            <div className="">
              <div className="font-bold text-sm">
                Deleted Vendor From Client List
              </div>
              <div className=" text-[11px]">Vendor Name</div>
            </div>
            <div className="text-[11px] bg-gray-100 p-2 border rounded-full">10 mins ago</div>
          </div>
          <div className=" bg-white flex items-center justify-between p-6 border rounded-lg">
            <div className="">
              <div className="font-bold text-sm">
                Deleted Vendor From Client List
              </div>
              <div className=" text-[11px]">Vendor Name</div>
            </div>
            <div className="text-[11px] bg-gray-100 p-2 border rounded-full">10 mins ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
