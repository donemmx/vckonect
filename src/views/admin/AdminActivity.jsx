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
import { Paginator } from "primereact/paginator";

export default function AdminActivity() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  const userData = useRecoilValue(user);
  const getUserCounter = async () => {
    const payload = {
      staff_id: userData.staff_id,
    };
    await getAdminActivity(payload).then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const searchData = async () => {
    setLoading(true);
    await getAdminActivityByFilter({
      name: search,
      staff_id: userData.staff_id,
    }).then((res) => {
      setCurrentData(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getUserCounter();
  }, [search.length < 3]);

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

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
              {currentPage?.map((res) => (
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
