import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from '../assets/icons/linkedin.svg'
import google from '../assets/icons/google.svg'
import or from '../assets/icons/or.svg'

export default function Login() {
  return (
    <div className="login flex justify-center items-center h-[130vh]">
      <div className=" w-[25%]">
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
          <span>Forgot your password?</span>
          <button className="green__btn">Login</button>
          <div className=" flex items-center justify-center gap-4">
              <img src={linkedIn} alt="" className="h-[35px] w-[35px] object-contain"  />
              <img src={google} alt=""  className="h-[35px] w-[35px] object-contain" />
          </div>
          <img src={or} alt="" className="h-[70px] w-full object-cover" />
          <button className="secondary__btn">Create Account</button>
        </div>
      </div>
    </div>
  );
}
