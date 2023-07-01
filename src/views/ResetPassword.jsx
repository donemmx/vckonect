import { Link } from "react-router-dom";
import { Password } from "primereact/password";


export default function ResetPassword() {
  return (
    <div className="login flex justify-center items-center h-[100vh] lg:h-[105vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          Reset Password
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
        Kindly retrieve your password
        </div>
        <div className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly">
      
          </div>
 
          <span className="p-float-label">
            <Password toggleMask  feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
          <span className="p-float-label">
            <Password toggleMask  feedback={false} />
            <label htmlFor="password">Confirm Password</label>
          </span>
          <Link to="/verified" className="green__btn">
            Confirm
          </Link>
          <Link to="#" className="tertiary__btn">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}
