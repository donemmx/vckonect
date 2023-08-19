import homeicon from "../../assets/sidebar/home.svg";
import dashicon from "../../assets/sidebar/dashboard.svg";
import livestockicon from "../../assets/sidebar/livestock.svg";
import clienticon from "../../assets/sidebar/clients.svg";
import storeicon from "../../assets/sidebar/stores.svg";
import chaticon from "../../assets/sidebar/chat.svg";
import feedicon from "../../assets/sidebar/feed-calc.svg";
import diseaseicon from "../../assets/sidebar/disease-prediction.svg";
import accounticon from "../../assets/sidebar/account.svg";
import clinicIcon from "../../assets/sidebar/clinic-dash.svg";
import casesIcon from "../../assets/sidebar/cases.svg";
import adsicon from "../../assets/sidebar/ads.svg";
import activitiesicon from "../../assets/sidebar/activities.svg";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";

export default function Sidebar() {
  return (
    <div className="fixed flex items-center justify-center z-50 bg-white w-[15%] l-0 top-0 h-[100vh]">
      <div className="flex flex-col items-center mt-[10vh] h-[80%] gap-1">
      <Link to="/" className="logo h-[28px] absolute top-[5%] ">
            <img
              src={logo}
              alt=""
              className=" w-[100%] h-[100%] object-contain"
            />
          </Link>

        <Link
          to="/admin-dashboard"
          className="flex items-center w-[100%]  gap-4 cursor-pointer   p-2   "
        >
          <img className="h-[30px]" src={dashicon} alt="" />
          <small className="text-[12px] leading-3 font-bold">Dashboard</small>
        </Link>
        <Link
          to="/user-features"
          className="flex items-center w-[100%]  gap-4 cursor-pointer  p-2   "
        >
          <img className="h-[30px]" src={casesIcon} alt="" />
          <small className="text-[12px] leading-3 text-center font-bold">
            Users & Features
          </small>
        </Link>
        <Link
          to="/clinic"
          className=" flex items-center w-[100%]  gap-4  cursor-pointer p-2   "
        >
          <img className="h-[30px]" src={clinicIcon} alt="" />
          <small className="text-[12px] leading-3 text-center font-bold">
            Forum Contents
          </small>
        </Link>
        <Link
          to="/subscriptions"
          className=" flex items-center w-[100%]  gap-4  cursor-pointer   p-2   "
        >
          <img className="h-[30px]" src={livestockicon} alt="" />
          <small className="text-[12px] leading-3 text-center font-bold">
            Subscriptions
          </small>
        </Link>
        <Link
          to="/admin-promotion"
          className=" flex items-center w-[100%]  gap-4  cursor-pointer p-2   "
        >
          <img className="h-[30px]" src={clienticon} alt="" />
          <small className="text-[12px] leading-3 font-bold text-center">
            Promotion
          </small>
        </Link>
        <Link
          to="/admin-activity"
          className="flex items-center w-[100%]  gap-4 cursor-pointer  p-2   "
        >
          <img className="h-[30px]" src={storeicon} alt="" />
          <small className="text-[12px] leading-3 font-bold text-center">
            Activity History
          </small>
        </Link>
        <Link
          to="/forum"
          className="flex items-center w-[100%]  gap-4 cursor-pointer   p-2   "
        >
          <img className="h-[30px]" src={chaticon} alt="" />
          <small className="text-[12px] leading-3 font-bold text-center">
            Chat Forum
          </small>
        </Link>
        <Link
          to="/admin-account"
          className=" flex items-center w-[100%]  gap-4 cursor-pointer   p-2   "
        >
          <img className="h-[30px]" src={accounticon} alt="" />
          <small className="text-[12px] leading-3 font-bold text-center">
            My Account
          </small>
        </Link>
        <Link className=" flex items-center w-[100%]  gap-4 cursor-pointer  p-2   ">
          <img className="h-[30px]" src={adsicon} alt="" />
          <small className="text-[12px] leading-3 font-bold text-center">
            Logout
          </small>
        </Link>
      </div>
    </div>
  );
}
