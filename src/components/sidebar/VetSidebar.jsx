import homeicon from "../../assets/sidebar/home.svg";
import dashicon from "../../assets/sidebar/dashboard.svg";
import clienticon from "../../assets/sidebar/clients.svg";
import storeicon from "../../assets/sidebar/stores.svg";
import chaticon from "../../assets/sidebar/chat.svg";
import feedicon from "../../assets/sidebar/feed-calc.svg";
import diseaseicon from "../../assets/sidebar/disease-prediction.svg";
import accounticon from "../../assets/sidebar/account.svg";
import clinicIcon from "../../assets/sidebar/clinic-dash.svg";
import casesIcon from "../../assets/sidebar/cases.svg";
import adsicon from "../../assets/sidebar/promotionIcon.svg";
import activitiesicon from "../../assets/sidebar/activities.svg";
import { Link } from "react-router-dom";
export default function VetSidebar() {

  return (
      <div className="fixed z-50   w-full lg:w-fit pr-14 lg:pr-0 top-[12vh] lg:top-[15vh] pb-10 left-8 h-[18vh] lg:h-[85vh] overflow-x-scroll lg:overflow-y-scroll no-scrollbar flex items-center lg:flex-col gap-2 justify-between">
        <Link
          to="/vet-home"
          className=" flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={homeicon} alt="" />
          <small className="text-[10px] leading-3 font-bold">Home</small>
        </Link>
        <Link
          to="/vet-dashboard"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={dashicon} alt="" />
          <small className="text-[10px] leading-3 font-bold">Dashboard</small>
        </Link>
        <Link
          to="/vet-cases"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={casesIcon} alt="" />
          <small className="text-[10px] leading-3 text-center font-bold">
            Cases
          </small>
        </Link>
        <Link
          to="/vet-clinic"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={clinicIcon} alt="" />
          <small className="text-[10px] leading-3 text-center font-bold">
            Clinic
          </small>
        </Link>
        <Link
          to="/vet-clients"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={clienticon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Clients
          </small>
        </Link>
        <Link
          to="/vet-stores"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={storeicon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Stores
          </small>
        </Link>
        <Link
          to="/vet-forum"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={chaticon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Chat Forum
          </small>
        </Link>
        <Link
          to="/vet-feed-calculator"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={feedicon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Feed Calculator
          </small>
        </Link>
        <Link
          to="/vet-disease-prediction"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img src={diseaseicon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Disease Prediction
          </small>
        </Link>
        <Link
          to="/vet-account"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={accounticon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Account
          </small>
        </Link>
        <Link
          to="/vet-activities"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={activitiesicon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Activities
          </small>
        </Link>
        <Link
          to="/vet-promotion"
          className="flex items-center flex-col gap-1 cursor-pointer justify-center bg-white w-[90px] px-6 h-[80px] p-2 rounded-[15px] border hover:border-[2px] hover:border-green-500"
        >
          <img className="h-[30px]" src={adsicon} alt="" />
          <small className="text-[10px] leading-3 font-bold text-center">
            Ads Promotion
          </small>
        </Link>
        <div className="base"></div>
      </div>
  );
}
