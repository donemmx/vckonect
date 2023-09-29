import addIcon from "../../assets/icons/add-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import PeLivestocktCard from "../../components/livestockpetCard/PeLivestocktCard";
import { useEffect, useState } from "react";
import { getCase } from "../../utils/vetApiService";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import CaseCard from "../../components/caseCard/CaseCard";
import { actionState } from "../../atom/actionAtom";
import { reloadStore } from "../../atom/reloadAtom";
import Loading from "../../components/loading/Loading";
import { Paginator } from "primereact/paginator";
import { Empty } from "antd";

export default function Cases() {
  const [allcase, setAllCases] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    getCase({ user_id: userData?.id }).then(({ data }) => {
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

  //  to="/vet-add-case"
  const addCase = () => {
    setAction("add");
    navigate("/vet-add-case");
  };

  return (
    <div className="p-3">
      <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Cases
          </h2>
        </div>
        <button
          onClick={addCase}
          className="w-full border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Case</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </button>
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
          <div className="">
            {currentPage?.map((res) => (
              <CaseCard name={res.farm_name} fullData={res} key={res.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex h-[35vh] items-center justify-center">
            <Empty className="w-full" />
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
