/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";
import language from "../../assets/icons/modal-icons/language-icon.svg";
import support from "../../assets/icons/modal-icons/support-icon.svg";
import userPic from "../../assets/icons/modal-icons/user-icon.svg";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { toast } from "react-toastify";
import { getNotification } from "../../utils/userApiService";
import { Badge } from 'primereact/badge';

export default function Header({ bg }) {
  const location = useNavigate();

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState();
  const userData = useRecoilValue(user);
  const [data, setData] = useRecoilState(user);
  const openModal = () => {
    setOpen(!open);
  };

  const logOut = () => {
    setData(null);
    toast.success("Successfully logged out");
  };

  const checker = (route) => {
    if (data?.role) {
      if (data?.role === "Veterinarian") {
        location(`/vet-${route}`);
      } else if (data?.role === "Animal Owner") {
        location(`/animal-owner-${route}`);
      } else {
        location(`/admin-${route}`);
      }
    } else {
      location("/login");
    }
  };


  useEffect(()=> {
    const payload ={
      user_id:  userData?.id,
      role: userData?.role
    }
    // getNotification(payload).then((res)=> {
    //   setNotification(res)
    // })
  }, [])

  return (
    <>
      <div
        className={`${
          bg ? "bg-hero" : " bg-white"
        }  w-[100vw] h-[80px] flex justify-center items-center fixed z-[100] `}
      >
        <div className="header flex items-center justify-between p-2 w-[90%] md:w-[85%] m-auto">
          <Link to="/" className="logo h-[25px] md:h-[30px] lg:h-[35px]">
            <img
              src={logo}
              alt=""
              className=" w-[100%] h-[100%] object-contain"
            />
          </Link>
          <div className="header__links  hidden lg:flex space-x-5 ">
            <Link to={"/about-us"}>About Us</Link>
            <div
              onClick={() => checker("feed-calculator")}
              className=" cursor-pointer"
            >
              Feed Calculator
            </div>
            <div
              onClick={() => checker("disease-prediction")}
              className=" cursor-pointer"
            >
              Disease Predictor
            </div>
            {/* <Link to={"/blog"}>Blog Post</Link> */}
            <div onClick={() => checker("forum")} className=" cursor-pointer">
              Chat Forum
            </div>
          </div>
          {!userData ? (
            <div className="header__user">
              <div
                className="grouped__icons flex space-x-2 bg-white border p-2 border-gray-300 h-[40px] md:h-[45px] lg:h-[50px] cursor-pointer rounded-[16px]"
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
          ) : (
            <div className="">
              <div className="flex items-center gap-4">
                <i className="pi pi-bell p-overlay-badge p-3 bg-gray-50 rounded-full border" >
                <Badge value={notification?.length} severity="danger" className="w-[20px] h-[20px] !flex !justify-center !items-center !rounded-full !text-[10px]"></Badge>
                </i>
                <div className="w-[48px] h-[48px] "  onClick={openModal}>
                  <img src={userData?.profile_picture} alt="" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {open && !userData ? (
        <div
          className="modal w-[220px]  h-[24vh] z-[100] bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
          data-aos="fade"
        >
          <div className="modal__body flex  flex-col gap-2 p-4">
            <Link
              to="/login"
              onClick={openModal}
              className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <img src={userPic} alt="" className="h-4" />
              Login / Signup
            </Link>
            <div className="group text-[15px] text-gray-600 p-2 flex items-center gap-3  hover:bg-gray-300 rounded-md cursor-pointer">
              <img src={language} alt="" className="h-4" />
              Language Option
            </div>
            <div className="group text-[15px] text-gray-600 p-2 flex items-center gap-3  hover:bg-gray-300 rounded-md cursor-pointer">
              <img src={support} alt="" className="h-4" />
              Customer Support
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
          {open && userData ? (
        <div
          className="modal w-[220px] h-[16vh] z-[100] bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
          data-aos="fade"
        >
          <div className="modal__body flex  flex-col gap-2 p-4">
            <button
              onClick={logOut}
              className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer"
            >
              <img src={userPic} alt="" className="h-4" />
              Log out
            </button>

            <div className="group text-[15px] text-gray-600 p-2 flex items-center gap-3  hover:bg-gray-300 rounded-md cursor-pointer">
              <img src={support} alt="" className="h-4" />
              Customer Support
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
