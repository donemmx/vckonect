import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import ClinicCard from "../../components/clinicCard/ClinicCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { actionState } from "../../atom/actionAtom";
import { useEffect, useState } from "react";
import { getClinic } from "../../utils/vetApiService";
import { reloadStore } from "../../atom/reloadAtom";
import Loading from "../../components/loading/Loading";
import { Paginator } from "primereact/paginator";
import { Empty } from "antd";

export default function Clinic() {
  const userData = useRecoilValue(user);
  const reload = useRecoilValue(reloadStore);
  const [action, setAction] = useRecoilState(actionState);
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

  useEffect(() => {
    getClinic({ user_id: userData?.id }).then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  }, [reload]);

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <div>
      <div className=" font-black text-2xl">Clinic</div>
      {userData?.vet_number_status === "Verified" ? (
        <div className="border border-[#52CE06] p-3  text-sm rounded-[18px] bg-[#F9FFF5] mt-6">
          <small>Congratulations</small>
          <p>Your Clinic License Number (CLN) has been Verified and Approved</p>
        </div>
      ) : (
        <div className="border text-red-700 bg-red-50 text-sm border-red-400  p-3 rounded-[18px] mt-6">
          <small>Pending Verification</small>
          <p>
            Your Clinic License Number (CLN) has not been Verified / Approved
          </p>
        </div>
      )}
      <Link
        to="/vet-add-clinic"
        onClick={() => setAction("add")}
        className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5"
      >
        <p className="font-bold px-2">Add New Clinic</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </Link>
      <div className=" grid md:grid-cols-2  lg:grid-cols-4 w-full">
        {loading
          ? [1, 2, 3, 4].map((data) => (
              <div className="w-full mt-10" key={data}>
                <Loading />
              </div>
            ))
          : ""}
      </div>
      {currentData?.length > 0 ? (
        <div className="pt-5 gap-6  pb-10 grid md:grid-cols-2  lg:grid-cols-4 w-full">
          {currentPage?.map((res) => (
            <ClinicCard
              availability={res.availability}
              clinicName={res.clinic_name}
              clinicLocation={res.location}
              image={res.picture}
              fullData={res}
              clinic_id={res.id}
              key={res.id}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex h-[35vh] items-center justify-center">
          <Empty className="w-full" />
        </div>
      )}
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
