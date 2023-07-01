import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

export default function Otp() {
  return (
    <div className="login flex justify-center items-center h-[100vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          OTP 
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
        Kindly retrieve your password
        </div>
        <div className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly">
      
          </div>
          <div className="pt-2 subtitle paragraph text-center">
            Kindly enter the 6 digit code sent to your email in the input field
            below
          </div>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">OTP Code</label>
          </span>
          <div className="pt-2 subtitle cursor-pointer paragraph underline text-center">
            Resend Code
          </div>
          <Link to="/reset-password" className="green__btn">
            Verify
          </Link>
          <Link to="#" className="tertiary__btn">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
