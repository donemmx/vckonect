import { useState } from "react";
import Footer from "../components/footer/Footer";
import Vetcard from "../components/vetCard/Vetcard";
import vetClinic from "../assets/tab-icon/vet-clinic-tab.svg";
import vetStore from "../assets/tab-icon/vet-store-tab.svg";
import vet from "../assets/tab-icon/vet-icon-tab.svg";
import search from "../assets/icons/search-icons/search-icon-white.svg";
import verified from "../assets/vetcard/verified-icon.svg";
import location from "../assets/icons/marker-icon.svg";
import filter from "../assets/menu-search/filter.svg";
import mapView from "../assets/menu-search/map-view.svg";
import listView from "../assets/menu-search/list-view.svg";

export default function Search() {
  const [active, setActive] = useState('vet');

  const selectTab = (value) => {
  setActive(value)
    }
  return (
    <>
      <div className="section flex pt-[10vh] pb-10 w-[100%] h-[100%] bg-cover bg-[#fff]">
        <div className="body flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="tab">
            <div className={`${active == 'vet'? 'active' : ''} tab__menu tab-left  cursor-pointer`} onClick={() => selectTab('vet')}>
              <img src={vet} alt="" className=" w-[20px] md:w-[35px] object-contain" />
              <p>Veterinarian</p>
              {active === 'vet' ?  <img src={verified}  alt="" /> : '' }
            </div>
            <div className={`tab__menu tab-center   ${active == 'store'? 'active' : ''} cursor-pointer`}  onClick={()=> selectTab('store')}>
              <img src={vetStore} alt="" className=" w-[20px] md:w-[35px] object-contain"/>
              <p>Vet Vendor & Store</p>
             {active === 'store' ? <img src={verified} alt="" className=" h-[14px] md:h-[20px]"  /> : ''}

            </div>
            <div className={`tab__menu tab-right ${active == 'clinic'? 'active' : ''}   cursor-pointer`} onClick={ () => selectTab('clinic')}>
              <img src={vetClinic} alt="" className=" w-[20px] md:w-[35px] object-contain" />
              <p>Vet Clinic</p>
              {active === 'clinic' ? <img src={verified} alt="" className=" h-[14px] md:h-[20px]" /> : ''}

            </div>
          </div>
          <div className="menuSearch pt-8">
          <div className="search">
            <div className="form__group flex space-x-4 items-center p-2 border-[#EBEBEB] border-2  bg-white rounded-full">
              <img src={location} alt="" className=" h-[26px] px-3 object-contain" />
              <input type="text" placeholder="Type in your location"  className=" outline-none p-1 w-full"/>
              <div className="search__btn  bg-gray-600 h-[45px] w-[80px] flex items-center justify-center rounded-r-full">
                <img src={search} alt="" className=" h-[15px]"  />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
          <img src={filter} className="h-[60px] object-contain" alt="" />
          <img src={listView} className="h-[60px] object-contain" alt="" />
          <img src={mapView} className="h-[60px] object-contain"  alt="" />
          </div>
          </div>

          <div className="scrollable pt-12 gap-6  pb-10 grid md:grid-cols-2  lg:grid-cols-4 w-full">
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
            <Vetcard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
