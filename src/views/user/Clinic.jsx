import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import ClinicCard from "../../components/clinicCard/ClinicCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function Clinic() {
  const userData = useRecoilValue(user);
  return (
    <div>
      <div className=" font-black text-2xl">Client</div>
      {userData?.vet_number_status === "Verified" ? (
        <div className="border border-[#52CE06] p-3 rounded-[18px] bg-[#F9FFF5] mt-6">
          <small>Congratulations</small>
          <p>Your Clinic License Number (CLN) has been verified and Approved</p>
        </div>
      ) : (
        <div className="border text-red-700 bg-red-50 border-red-400  p-3 rounded-[18px] mt-6">
          <small>Pending Verification</small>
          <p>
            Your Clinic License Number (CLN) has not been verified / Approved
          </p>
        </div>
      )}
      <Link
        to="/vet-add-clinic"
        className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5"
      >
        <p className="font-bold px-2">Add New Clinic</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </Link>
      <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
      </div>
    </div>
  );
}
