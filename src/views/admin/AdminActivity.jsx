import { useEffect, useState } from "react";
import { getAdminActivity } from "../../utils/adminApiService";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
import moment from "moment";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function AdminActivity() {
  const [activities, setActivities] = useState();
  const userData = useRecoilValue(user)
  const getUserCounter = async () => {
    const payload = {
      staff_id: userData.staff_id
    }
    await getAdminActivity(payload).then((res) => {
      setActivities(res);
    });
  };
  useEffect(() => {
    getUserCounter();
  }, []);

  return (
    <div className="w-full">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <div className="search mt-[5vh] shadow-[0px_13px_40px_0px_rgba(27,25,86,0.06)]">
          <div className="form__group flex space-x-2 items-center p-1 border-[#EBEBEB] border  bg-white rounded-[16px]">
            <input
              type="text"
              placeholder="Search"
              className=" outline-none px-2 w-full"
            />
            <div className="search__btn  bg-green-800 h-[45px] w-[200px] text-white  flex items-center gap-4 justify-center rounded-r-[16px]">
              <img src={search} alt="" className=" h-[15px]" />
              Search
            </div>
          </div>
        </div>
        <div className="posts p-3 mt-5 grid gap-2">
          {activities?.map((res) =>
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                key={res.id}
              />
          )}
        </div>
      </div>
    </div>
  );
}
