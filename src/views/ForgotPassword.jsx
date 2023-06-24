import { InputText } from "primereact/inputtext";
import or from '../assets/icons/or.svg'
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="login flex justify-center items-center h-[100vh]">
    <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
      <h2 className="title font-black text-center head__two">Forgot Password</h2>
      <div className="subtitle paragraph text-center">
      Kindly retrieve your password
      </div>
      <div className="form flex flex-col gap-3 pt-3">
        <span className="p-float-label">
          <InputText id="username" />
          <label htmlFor="username">Email</label>
        </span>
        <Link to='/otp' className="green__btn">Proceed</Link>
        <img src={or} alt="" className=" w-full object-cover" />
        <Link to='/signup' className="secondary__btn mt-[-40px]">Create Account</Link>
      </div>
    </div>
  </div>
  )
}
