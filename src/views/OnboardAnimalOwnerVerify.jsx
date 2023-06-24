import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";

export default function OnboardAnimalOwnerVerify() {
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
              <img className="greenOverlay" src={personalIcon} alt="" />
              <p className="text-green-800 font-bold">Personal Info</p>
            </div>
            <img src={arrow} alt="" />

            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={verifyIcon} alt="" />
              <p>Verify Account </p>
            </div>
          </div>
          <div className="pt-2 subtitle paragraph text-center">
            Kindly enter the 6 digit code sent to your email in the input field
            below
          </div>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">First Name</label>
          </span>

          <Link to="/onboard-animal-owner-verify" className="green__btn">
            Verify
          </Link>
          <Link to="/onboard-animal-owner-verify" className="tertiary__btn">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
