import { Link } from "react-router-dom";
import veriiedIcon from "../assets/icons/create-account/onboard/verified-icon.svg";

export default function Verified() {
  return (
    <div className="login flex justify-center items-center h-[100vh]">
      <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
        <div className="flex items-center justify-center pb-4">
          <img src={veriiedIcon} alt="" className=" w-[70px] object-cover" />
        </div>
        <h2 className="title font-black text-center head__two pt-2 pb-2">
          Congratulations!
        </h2>
        <div className="subtitle paragraph text-center">
          Your Vet Konect account has been created. Kindly log into your account
          with your account credentials.
        </div>
        <div className="form flex flex-col gap-3 pt-5">
          <Link to='/login' className="green__btn">Login</Link>
        </div>
      </div>
    </div>
  );
}
