import { Link } from "react-router-dom";
import logo from "../../assets/logo/vc-logo.svg";
import userImg from "../../assets/icons/header-icons/user-icon.svg";
import hamburger from "../../assets/icons/header-icons/hamburger-icon.svg";

export default function Header() {
  return (
    <>
    <div className="header__main w-[100vw] h-[10vh] fixed z-50 bg-hero">
      <div className="header flex items-center justify-between p-2 w-[90%] md:w-[85%] m-auto">
        <div className="logo h-[25px] md:h-[30px] lg:h-[35px]" >
          <img src={logo} alt="" className=" w-[100%] h-[100%] object-contain" />
        </div>
        <div className="header__links  hidden lg:flex space-x-5 ">
          <Link to={"/login"}>About Us</Link>
          <Link to={"/login"}>Feed Calculator</Link>
          <Link to={"/login"}>Disease Predictor</Link>
          <Link to={"/login"}>Blog Post</Link>
          <Link to={"/login"}>Chat Forum</Link>
        </div>
        <div className="header__user">
          <div className="grouped__icons flex space-x-2 bg-white border p-1 border-gray-300 h-[40px] md:h-[45px] lg:h-[50px] rounded-[16px]">
            <img src={hamburger} alt="" className="w-[100%] h-[100%] object-contain" />
            <img src={userImg} alt="" className="w-[100%] h-[100%] object-contain" />
          </div>
        </div>
      </div>
    </div>
    <div className="modal">
        
    </div>
    </>
  );
}
