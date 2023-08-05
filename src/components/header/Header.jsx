import { Link } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";
import language from "../../assets/icons/modal-icons/language-icon.svg";
import support from "../../assets/icons/modal-icons/support-icon.svg";
import userPic from "../../assets/icons/modal-icons/user-icon.svg";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function Header({ bg }) {
  const [open, setOpen] = useState(false);
  const userData = useRecoilValue(user);
  const [data, setData] = useRecoilState(user)
  const openModal = () => {
    setOpen(!open);
  };

  const logOut = () => {
    setData(null)
  }
  return (
    <>
      <div
        className={`${
          bg ? "bg-hero" : " bg-white"
        }  w-[100vw] h-[80px] flex justify-center items-center fixed z-50 `}
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
            <Link to={"/feed-calculator"}>Feed Calculator</Link>
            <Link to={"/disease-prediction"}>Disease Predictor</Link>
            <Link to={"/blog"}>Blog Post</Link>
            <Link to={"/forum"}>Chat Forum</Link>
          </div>
          <div className="header__user">
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
      </div>
      {open && !userData ? (
        <div
          className="modal w-[220px] h-[24vh] z-50 bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
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
        className="modal w-[220px] h-[24vh] z-50 bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"
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
