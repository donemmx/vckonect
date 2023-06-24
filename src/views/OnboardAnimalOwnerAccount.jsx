import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from "../assets/icons/linkedin.svg";
import google from "../assets/icons/google.svg";
import or from "../assets/icons/or.svg";
import { Link } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";
export default function OnboardAnimalOwnerAccount() {
  return (
    <div className="login flex justify-center items-center h-[140vh]">
      <div className=" w-[80%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          Create Account
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
          Create a new account to become a user or a veterinarians on vet konect
          by clicking on one of the cards below
        </div>
        <div className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[80%] mx-auto items-center justify-evenly">
            <div className="step1 w-[40px] text-[12px] text-center ]">
              <img src={accountlIcon} alt="" />
              <p className="text-green-800 font-bold">Account Details</p>
            </div>
            <img src={arrow} alt="" />
            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={personalIcon} alt="" />
              <p>Personal Info</p>
            </div>
            <img src={arrow} alt="" />

            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={verifyIcon} alt="" />
              <p>Verify Account </p>
            </div>
          </div>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Email</label>
          </span>
          <span className="p-float-label">
            <Password toggleMask feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
          <span className="p-float-label">
            <Password toggleMask feedback={false} />
            <label htmlFor="password"> Confirm Password</label>
          </span>
          <button className="green__btn">Proceed</button>
          <div className=" flex items-center justify-center gap-4">
            <img
              src={linkedIn}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
            <img
              src={google}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </div>
          <img src={or} alt="" className=" w-full object-cover" />
          <Link to="/login" className="secondary__btn mt-[-30px]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
