/* eslint-disable no-unused-vars */
import dashicon from "../../assets/sidebar/dashboard.svg";
import chaticon from "../../assets/sidebar/chat.svg";
import accounticon from "../../assets/sidebar/account.svg";
import logout from "../../assets/sidebar/logout.svg";
import users from "../../assets/sidebar/users.svg";
import subscription from "../../assets/sidebar/subscription.svg";
import adsicon from "../../assets/sidebar/ads.svg";
import activitiesicon from "../../assets/sidebar/activities.svg";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import logoShort from "../../assets/logo/vc-short.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";


export default function Sidebar() {
  const userData = useRecoilValue(user);
  const [data, setData] = useRecoilState(user);

  const logOut = () => {
    setData(null);
    toast.success("Successfully logged out");
  };

  const [open, setOpen] = useState(false);


  const openModal = () => {
    setOpen(!open);
  };


  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    <div className="">
      <div className="hidden  fixed lg:flex items-center justify-center shadow-2xl shadow-slate-100 z-50 bg-white w-[17vw] l-0 top-0 h-[100vh]">
        <div className="flex flex-col items-center mt-[12vh] h-[80%] w-[70%] gap-2">
          <NavLink to="/" className="logo h-[28px] absolute top-[5%] ">
            <img
              src={logo}
              alt=""
              className=" w-[100%] h-[100%] object-contain"
            />
          </NavLink>

          <NavLink
            to="/admin-dashboard"
            className="flex items-center w-full  gap-4 cursor-pointer p-2 hover:bg-gray-100 rounded-full "
          >
            <img className="h-[25px]" src={dashicon} alt="" />
            <small className="text-[14px] leading-3 ">Dashboard</small>
          </NavLink>
          <NavLink
            to="/user-features"
            className="flex items-center w-[100%]  gap-4 cursor-pointer  p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={users} alt="" />
            <small className="text-[14px] leading-3 text-center ">
              Users & Features
            </small>
          </NavLink>
          <NavLink
            to="/forum-content"
            className=" flex items-center w-[100%]  gap-4  cursor-pointer p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={chaticon} alt="" />
            <small className="text-[14px] leading-3 text-center ">
              Forum Contents
            </small>
          </NavLink>
          <NavLink
            to="/subscriptions"
            className=" flex items-center w-[100%]  gap-4  cursor-pointer   p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={subscription} alt="" />
            <small className="text-[14px] leading-3 text-center ">
              Subscriptions
            </small>
          </NavLink>
          <NavLink
            to="/admin-promotion"
            className=" flex items-center w-[100%]  gap-4  cursor-pointer p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={adsicon} alt="" />
            <small className="text-[14px] leading-3  text-center">
              Promotion
            </small>
          </NavLink>
          <NavLink
            to="/admin-activity"
            className="flex items-center w-[100%]  gap-4 cursor-pointer  p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={activitiesicon} alt="" />
            <small className="text-[14px] leading-3  text-center">
              Activity History
            </small>
          </NavLink>
          <NavLink
            to="/admin-account"
            className=" flex items-center w-[100%]  gap-4 cursor-pointer   p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={accounticon} alt="" />
            <small className="text-[14px] leading-3  text-center">
              My Account
            </small>
          </NavLink>
          <div
            onClick={logOut}
            className=" flex items-center w-[100%]  gap-4 cursor-pointer  p-2 hover:bg-gray-100 rounded-full  "
          >
            <img className="h-[25px]" src={logout} alt="" />
            <small className="text-[14px] leading-3  text-center">Logout</small>
          </div>
          <div className="absolute flex items-center gap-3 bottom-10 l-0">
            <div className="   h-[50px] w-[50px]">
              <img
                src={userData?.profile_picture}
                alt=""
                className=" w-full h-full object-cover rounded-full "
              />
            </div>
            <div className="">
              <div className="text-[14px] font-black">
                {userData?.first_name} {userData?.last_name}
              </div>
              <p className="text-[10px]">{userData?.email}</p>
            </div>
          </div>
        </div>

      </div>
      <div className="fixed w-full bg-white h-[10vh]  flex items-center justify-between p-3  ">
        <img src={logoShort} alt="" className="h-[25px]" />
        <div
              className="grouped__icons flex space-x-2 bg-white border p-1 border-gray-300 h-[40px] md:h-[45px] lg:h-[50px] cursor-pointer rounded-[16px]"
              onClick={openModal}
            >
              <img
                src={hamburger}
                alt=""
                className="w-[100%] h-[100%] object-contain"
              />
              <img
                src={userImg}
                alt=""
                className="w-[100%] h-[100%] object-contain"
              />
            </div>
      </div>
    </div>
  );
}
