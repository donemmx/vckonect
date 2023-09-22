import homeicon from "../../assets/sidebar/home.svg";
import dashicon from "../../assets/sidebar/dashboard.svg";
import livestockicon from "../../assets/sidebar/livestock.svg";
import clienticon from "../../assets/sidebar/clients.svg";
import storeicon from "../../assets/sidebar/stores.svg";
import chaticon from "../../assets/sidebar/chat.svg";
import feedicon from "../../assets/sidebar/feed-calc.svg";
import diseaseicon from "../../assets/sidebar/disease-prediction.svg";
import accounticon from "../../assets/sidebar/account.svg";
import adsicon from "../../assets/sidebar/promotionIcon.svg";
import activitiesicon from "../../assets/sidebar/activities.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function AnimalOwnerSidebar() {
  const userData = useRecoilValue(user);
  const navigate = useNavigate();
  const openAccountDetails = () => {
    navigate(`/animal-owner-account/${userData?.id}`);
  };
  return (
    <div className="fixed z-50   w-full lg:w-fit pr-14 lg:pr-0 top-[10vh] lg:top-[15vh] pb-10 left-8 h-[18vh] lg:h-[85vh] overflow-x-scroll lg:overflow-y-scroll no-scrollbar flex items-center lg:flex-col gap-2 justify-between">
      <NavLink
        to="/animal-owner-home"
        className=" flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={homeicon} alt="" />
        <small className="text-[10px] leading-3 font-bold">Home</small>
      </NavLink>
      <NavLink
        to="/animal-owner-dashboard"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={dashicon} alt="" />
        <small className="text-[10px] leading-3 font-bold">Dashboard</small>
      </NavLink>

      <NavLink
        to="/livestock"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={livestockicon} alt="" />
        <small className="text-[10px] leading-3 text-center font-bold">
          Pets & Livestock
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-clients"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={clienticon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Clients
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-stores"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={storeicon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Stores
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-forum"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={chaticon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Chat Forum
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-feed-calculator"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={feedicon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Feed Calculator
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-disease-prediction"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img src={diseaseicon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Disease Prediction
        </small>
      </NavLink>
      <div
        onClick={openAccountDetails}
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={accounticon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Account
        </small>
      </div>
      <NavLink
        to="/animal-owner-activities"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={activitiesicon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Activities
        </small>
      </NavLink>
      <NavLink
        to="/animal-owner-promotion"
        className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
      >
        <img className="h-[30px]" src={adsicon} alt="" />
        <small className="text-[10px] leading-3 font-bold text-center">
          Ads Promotion
        </small>
      </NavLink>
      <div className="base"></div>
    </div>
  );
}
