import { useEffect, useState } from "react";
import Vetcard from "../../components/vetCard/Vetcard";
import vetClinic from "../../assets/tab-icon/vet-clinic-tab.svg";
import vetStore from "../../assets/tab-icon/vet-store-tab.svg";
import vet from "../../assets/tab-icon/vet-icon-tab.svg";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
import verified from "../../assets/vetcard/verified-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import filter from "../../assets/menu-search/filter.svg";
import mapView from "../../assets/menu-search/map-view.svg";
import listView from "../../assets/menu-search/list-view.svg";
import StoreCard from "../../components/storeCard/StoreCard";
import ClinicCard from "../../components/clinicCard/ClinicCard";
import {
  getClinicByFilter,
  getStoreByFilter,
} from "../../utils/userApiService";
import { getVeterinarianByFilter } from "../../utils/vetApiService";

export default function DashboardHome() {
  const [active, setActive] = useState("vet");
  const [stores, setStores] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [vets, setVets] = useState([]);

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
    await getClinicByFilter().then((res) => {
      setClinics(res);
    });
  };
  const getStoreData = async () => {
    await getStoreByFilter({name: ''}).then((res) => {
      setStores(res);
    });
  };
  const getVetsData = async () => {
    await getVeterinarianByFilter().then((res) => {
      setVets(res);
    });
  };

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
              <p className="hidden lg:block">Vet Vendor & Store</p>
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
          <div className="menuSearch pt-8">
            <div className="search">
              <div className="form__group flex space-x-4 items-center p-1 border-[#EBEBEB] border-2  bg-white rounded-full">
                <img
                  src={location}
                  alt=""
                  className=" h-[26px] px-3 object-contain"
                />
                <input
                  type="text"
                  placeholder="Type in your location"
                  className=" outline-none p-1 w-full"
                />
                <div className="search__btn  bg-gray-600 h-[45px] w-[80px] flex items-center justify-center rounded-r-full">
                  <img src={search} alt="" className=" h-[15px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <img
                src={filter}
                className="h-[50px] object-contain cursor-pointer"
                alt=""
              />
              <img
                src={listView}
                className="h-[50px] object-contain cursor-pointer"
                alt=""
              />
              <img
                src={mapView}
                className="h-[50px] object-contain cursor-pointer"
                alt=""
              />
            </div>
          </div>

          <div className=" pt-12 gap-6  pb-10 grid md:grid-cols-2  lg:grid-cols-4 w-full">
            {active == "vet" ? vets.map((res) => <Vetcard key={res} />) : ""}
            {active == "store"
              ? stores.map((res) => (
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
              ? clinics.map((res) => <ClinicCard key={res} />)
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
