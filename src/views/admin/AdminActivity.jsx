import { useEffect, useState } from "react";
import {
  getAdminActivity,
  getAdminActivityByFilter,
} from "../../utils/adminApiService";
import searchIcon from "../../assets/icons/search-icons/search-icon-white.svg";
import moment from "moment";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import AdminCardLoading from "../../components/loading/AdminCardLoading";

export default function AdminActivity() {
  const [activities, setActivities] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const userData = useRecoilValue(user);
  const getUserCounter = async () => {
    const payload = {
      staff_id: userData.staff_id,
    };
    await getAdminActivity(payload).then((res) => {
      setActivities(res);
      setLoading(false);
    });
  };

  const searchData = async () => {
    setLoading(true);
    await getAdminActivityByFilter({
      name: search,
      staff_id: userData.staff_id,
    }).then((res) => {
      setActivities(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    getUserCounter();
  }, [search.length < 3]);

  return (
    <div className="w-full">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <div className="search mt-[5vh] shadow-[0px_13px_40px_0px_rgba(27,25,86,0.06)]">
          <div className="form__group flex space-x-2 items-center p-1 border-[#EBEBEB] border  bg-white rounded-[16px]">
            <input
              type="text"
              placeholder="Search"
              className=" outline-none px-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="search__btn  bg-green-800 h-[45px] w-[200px] text-white  flex items-center gap-4 justify-center rounded-r-[16px]"
              onClick={searchData}
              disabled={search.length < 3}
            >
              <img src={searchIcon} alt="" className=" h-[15px]" />
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <div className="grid gap-2">
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
          </div>
        ) : (
          <>
            <div className="posts p-3 mt-5 grid gap-2">
              {activities?.map((res) => (
                <AdminDashboardCard
                  time={moment(res.date).utc().fromNow()}
                  title={res.title}
                  name={res.detail}
                  key={res.id}
                  loading={loading}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
