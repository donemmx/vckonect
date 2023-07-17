import addIcon from "../assets/icons/add-icon.svg";
import { Link } from "react-router-dom";
import PeLivestocktCard from "../components/livestockpetCard/PeLivestocktCard";

export default function Cases() {
  return (
    <div className="p-3">
      <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Cases
          </h2>
        </div>
        <Link
          to="/add-case"
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Case</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>

        <PeLivestocktCard petName="Kora" petName2="Catherine" />
      </div>
    </div>
  );
}
