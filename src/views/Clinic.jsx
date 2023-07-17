import { Link } from "react-router-dom";
import addIcon from "../assets/icons/add-icon.svg";
import ClinicCard from "../components/clinicCard/ClinicCard";

export default function Clinic() {
  return (
    <div>
    <div className=" font-black text-2xl">Client</div>
    <Link to='/add-client' className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5">
        <p className="font-bold px-2">Add New Clinic</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </Link>
      <div className=" flex gap-2 flex-wrap items-center justify-center">
        <ClinicCard/>
        <ClinicCard/>
        <ClinicCard/>
        <ClinicCard/>
      </div>
</div>
  )
}
