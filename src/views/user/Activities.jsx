/* eslint-disable no-unused-vars */
import { useRecoilValue } from "recoil";
import DashboardCard from "../../components/dashboardCard/DashboardCard";
import { user } from "../../atom/userAtom";
import { useEffect, useState } from "react";
import { getAnimalOwnerActivity } from "../../utils/animalOwnerApiService";
import moment from "moment";
import { getVeterinarianActivity } from "../../utils/vetApiService";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import { Paginator } from "primereact/paginator";

export default function Activities() {
  const userData = useRecoilValue(user);
  const [loading, setLoading] = useState(true);
  const [allActivities, setAllActivities] = useState([]);

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

  useEffect(() => {
    let payload = {
      id: userData?.id,
      role: userData?.role,
    };
    if (userData.role === "Animal Owner") {
      getAnimalOwnerActivity(payload).then(({data}) => {
        setCurrentData(data);
        setLoading(false);
      });
    } else {
      getVeterinarianActivity(payload).then(({data}) => {
        setCurrentData(data);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <div className="">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Recent Activities
          </h2>
        </div>
        {loading ? (
          <div className="grid gap-2">
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
          </div>
        ) : (
          <div className="posts p-3 mt-5 grid gap-2">
            {currentPage?.map((res) => (
              <DashboardCard
                time={moment(res.date).fromNow()}
                title={res.title}
                name={res.detail}
                key={res.id}
              />
            ))}
          </div>
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
