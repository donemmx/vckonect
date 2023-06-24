import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from '../assets/icons/linkedin.svg'
import google from '../assets/icons/google.svg'
import or from '../assets/icons/or.svg'
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login flex justify-center items-center h-[120vh]">
      <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
        <h2 className="title font-black text-center head__two">Login</h2>
        <div className="subtitle paragraph text-center">
          Secure access to your account
        </div>
        <div className="form flex flex-col gap-3 pt-5">
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Email</label>
          </span>
          <span className="p-float-label">
            <Password toggleMask  feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
          <span className="text-sm underline cursor-pointer pt-2">Forgot your password?</span>
          <button className="green__btn">Login</button>
          <div className=" flex items-center justify-center gap-4">
              <img src={linkedIn} alt="" className="h-[35px] w-[35px] object-contain cursor-pointer"  />
              <img src={google} alt=""  className="h-[35px] w-[35px] object-contain cursor-pointer" />
          </div>
          <img src={or} alt="" className=" w-full object-cover" />
          <Link to='/signup' className="secondary__btn mt-[-30px]">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
