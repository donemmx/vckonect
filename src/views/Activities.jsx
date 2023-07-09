import DashboardCard from "../components/dashboardCard/DashboardCard";

export default function Activities() {
  return (
    <div className="">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className='text-[1rem] lg:text-[1.3rem] cursor-pointer font-black' >
            Recent Activities
          </h2>
  
        </div>

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
      </div>
    </div>
  )
}
