import { useState } from "react";
import addIcon from "../assets/icons/add-icon.svg";
import PeLivestocktCard from "../components/livestockpetCard/PeLivestocktCard";
import farmImg from "../assets/icons/farm.png";
import dogImg from "../assets/icons/dog.png";

export default function PetandLiveStock() {
  const [tab, setTab] = useState("pets");

  const activeTab = (type) => {
    setTab(type);
  };
  return (
    <div className="p-3">
      <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2
            className={` text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "pets" ? "font-black" : ""
            } `}
            onClick={() => activeTab("pets")}
          >
            My Pets
          </h2>
          <h4
            className={`text-[1rem] lg:text-[1.3rem] cursor-pointer ${
              tab === "livestock" ? "font-black" : ""
            } `}
            onClick={() => activeTab("livestock")}
          >
            LiveStock Farms
          </h4>
        </div>
        {tab === 'pets' ? (<>
          <div className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5">
            <p className="font-bold px-2">Add New Post</p>
            <img src={addIcon} alt="" className="w-[40px]" />
          </div>

          <PeLivestocktCard
            petImg={dogImg}
            petName="Kora"
            petName2="Catherine"
          />
        </>) : (
          <>
            <div className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5">
              <p className="font-bold px-2">Add New Post</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </div>

            <PeLivestocktCard
              petImg={farmImg}
              petName="Adibala Poultry"
              petName2="Grace Hill Poultry"
            />
          </>
        )}
      </div>
    </div>
  );
}
