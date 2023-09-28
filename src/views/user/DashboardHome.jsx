import { useEffect, useState } from "react";
import Vetcard from "../../components/vetCard/Vetcard";
import vetClinic from "../../assets/tab-icon/vet-clinic-tab.svg";
import vetStore from "../../assets/tab-icon/vet-store-tab.svg";
import vet from "../../assets/tab-icon/vet-icon-tab.svg";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
import verified from "../../assets/vetcard/verified-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import StoreCard from "../../components/storeCard/StoreCard";
import ClinicCard from "../../components/clinicCard/ClinicCard";
import {
  getClinicByFilter,
  getStoreByFilter,
} from "../../utils/userApiService";
import { getVeterinarianByFilter } from "../../utils/vetApiService";
import Loading from "../../components/loading/Loading";
import { Paginator } from "primereact/paginator";

export default function DashboardHome() {
  const [active, setActive] = useState("vet");
  const [searchData, setSearchData] = useState("");
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

  const selectTab = (value) => {
    setActive(value);
    if (value == "clinic") {
      getClinicData();
    } else if (value == "store") {
      getStoreData();
    } else {
      getVetsData();
    }
  };

  const getClinicData = async () => {
    setLoading(true);
    await getClinicByFilter(name).then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };
  const getStoreData = async () => {
    setLoading(true);
    await getStoreByFilter({ name: "" }).then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };
  const getVetsData = async () => {
    await getVeterinarianByFilter({ name: "" }).then((res) => {
      setCurrentData(res.data);
      setLoading(false);
    });
  };

  const searchDataFunction = async () => {
    setLoading(true);
    if (active == "clinic") {
      await getClinicByFilter({
        name: searchData,
      }).then(({ data }) => {
        setCurrentData(data);
        setLoading(false);
      });
    } else if (active == "store") {
      await getStoreByFilter({ name: searchData }).then(({ data }) => {
        setCurrentData(data);
        setLoading(false);
      });
    } else {
      await getVeterinarianByFilter({ name: searchData }).then(({ data }) => {
        setCurrentData(data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (active === "vet") {
      getVetsData();
    } else if (active === "clinic") {
       getClinicData();
    } else {
      getStoreData();
    }
  }, [searchData.length < 3]);

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <>
      <div className=" flex ">
        <div className=" w-full h-full m-auto">
          <div className="homeTab pt-0">
            <div
              className={`${
                active == "vet" ? "activeLink" : ""
              } tab__menu tab-left  cursor-pointer`}
              onClick={() => selectTab("vet")}
            >
              <img
                src={vet}
                alt=""
                className="  w-[20px] md:w-[35px] object-contain"
              />
              <p className="hidden lg:block">Veterinarian</p>
              {active === "vet" ? <img src={verified} alt="" /> : ""}
            </div>
            <div
              className={`tab__menu tab-center   ${
                active == "store" ? "activeLink" : ""
              } cursor-pointer`}
              onClick={() => selectTab("store")}
            >
              <img
                src={vetStore}
                alt=""
                className=" w-[20px] md:w-[35px] object-contain"
              />
              <p className="hidden lg:block"> Store</p>
              {active === "store" ? (
                <img src={verified} alt="" className=" h-[14px] md:h-[20px]" />
              ) : (
                ""
              )}
            </div>
            <div
              className={`tab__menu tab-right ${
                active == "clinic" ? "activeLink" : ""
              }   cursor-pointer`}
              onClick={() => selectTab("clinic")}
            >
              <img
                src={vetClinic}
                alt=""
                className=" w-[20px] md:w-[35px] object-contain"
              />
              <p className="hidden lg:block">Vet Clinic</p>
              {active === "clinic" ? (
                <img src={verified} alt="" className=" h-[14px] md:h-[20px]" />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" pt-8">
            <div className="search">
              <div className="form__group flex space-x-4 items-center p-1 border-[#EBEBEB] border-2  bg-white rounded-full">
                <img
                  src={location}
                  alt=""
                  className=" h-[26px] px-3 object-contain"
                />
                <input
                  type="text"
                  placeholder="Search by Location or Name"
                  className=" outline-none p-1 w-full"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />

                <button
                  disabled={searchData.length < 3}
                  onClick={searchDataFunction}
                  className="search__btn  bg-gray-600 h-[45px] w-[80px] flex items-center justify-center rounded-r-full"
                >
                  <img src={search} alt="" className=" h-[15px]" />
                </button>
              </div>
            </div>
          </div>
          <div className=" grid md:grid-col-2 lg:grid-cols-4 gap-4 w-full mb-10">
            {loading
              ? [1, 2, 3, 4].map((data) => (
                  <div className="w-full mt-10" key={data}>
                    <Loading />
                  </div>
                ))
              : ""}
          </div>
          <div className=" pt-12 gap-6  pb-10 grid md:grid-cols-2  lg:grid-cols-4 w-full">
            {active == "vet"
              ? currentPage?.map((res) => (
                  <Vetcard key={res.id} fullData={res} />
                ))
              : ""}
            {active == "store"
              ? currentPage?.map((res) => (
                  <StoreCard
                    availability={res.availability}
                    storeName={res.store_name}
                    storeLocation={res.location}
                    storePhone={res.phone_number}
                    image={res.picture}
                    fullData={res}
                    store_id={res.id}
                    key={res.id}
                  />
                ))
              : ""}
            {active == "clinic"
              ? currentPage?.map((res, i) => (
                  <ClinicCard key={i} fullData={res} />
                ))
              : ""}
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
      </div>
    </>
  );
}
