import { Link } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";
import language from "../../assets/icons/modal-icons/language-icon.svg";
import support from "../../assets/icons/modal-icons/support-icon.svg";
import user from "../../assets/icons/modal-icons/user-icon.svg";
import { useState } from "react";

export default function Header({bg}) {
    const [open, setOpen] = useState(false)

    const openModal=()=> {
        setOpen(!open)
    }
  return (
    <>
      <div className={`${bg? 'bg-hero' : ' bg-white' }  w-[100vw] h-[85px] flex justify-center items-center fixed z-50 `}>
        <div className="header flex items-center justify-between p-2 w-[90%] md:w-[85%] m-auto">
          <div className="logo h-[25px] md:h-[30px] lg:h-[35px]">
            <img
              src={logo}
              alt=""
              className=" w-[100%] h-[100%] object-contain"
            />
          </div>
          <div className="header__links  hidden lg:flex space-x-5 ">
            <Link to={"/login"}>About Us</Link>
            <Link to={"/login"}>Feed Calculator</Link>
            <Link to={"/login"}>Disease Predictor</Link>
            <Link to={"/login"}>Blog Post</Link>
            <Link to={"/login"}>Chat Forum</Link>
          </div>
          <div className="header__user">
            <div className="grouped__icons flex space-x-2 bg-white border p-1 border-gray-300 h-[40px] md:h-[45px] lg:h-[50px] cursor-pointer rounded-[16px]" onClick={openModal}>
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
      {open ? (
        <div className="modal w-[220px] h-[24vh] z-50 bg-white fixed top-[9%] right-[8%] rounded-md shadow-sm"  data-aos="fade" >
          <div className="modal__body flex  flex-col gap-2 p-4">
            <Link to='/login' onClick={openModal} className="group text-[15px] text-gray-600 p-2 flex items-center gap-3 hover:bg-gray-300 rounded-md cursor-pointer">
              <img src={user} alt="" className="h-4" />
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
    </>
  );
}
