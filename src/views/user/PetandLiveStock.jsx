/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import addIcon from "../../assets/icons/add-icon.svg";
import PeLivestocktCard from "../../components/livestockpetCard/PeLivestocktCard";
import { Link } from "react-router-dom";
import { getFarm, getPet } from "../../utils/animalOwnerApiService";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import FarmCard from "../../components/livestockpetCard/Farmcard";
import { actionState } from "../../atom/actionAtom";
import { reloadStore } from "../../atom/reloadAtom";
import LoadingTwo from "../../components/loading/LoadingTwo";

export default function PetandLiveStock() {
  const userData = useRecoilValue(user);
  const [action, setAction] = useRecoilState(actionState);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pets");
  const [allFarms, setAllFarms] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const reload = useRecoilValue(reloadStore);

  const activeTab = (type) => {
    setTab(type);
  };

  useEffect(() => {
    let payload = {
      user_id: userData.id,
    };
    getPet(payload).then((res) => setAllPets(res));
    getFarm(payload).then((res) => {
      setAllFarms(res);
      setLoading(false);
    });
  }, [reload, tab]);
  return (
    <div className="lg:p-3">
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
        {tab === "pets" ? (
          <>
            <Link
              to="/add-pet"
              onClick={() => setAction("add")}
              className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
            >
              <p className="font-bold px-2">Add New Pet</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </Link>
            <div className=" flex flex-wrap gap-4 w-full mb-10">
              {loading
                ? [1, 2].map((data) => (
                    <div className="flex w-full mt-10" key={data}>
                      <LoadingTwo />
                    </div>
                  ))
                : ""}
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {allPets.map((res) => (
                <PeLivestocktCard
                  petImg={res.picture}
                  specie={res.specie}
                  breed={res.breed}
                  sex={res.sex}
                  age={res.age}
                  date={res.date}
                  petId={res.pet_id}
                  name={res.pet_name}
                  fullData={res}
                  key={res.id}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/add-farm"
              className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
            >
              <p className="font-bold px-2">Add New Farm</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </Link>
            <div className="grid md:grid-cols-2 gap-2">
              {allFarms.map((res) => (
                <FarmCard
                  petImg={res.picture}
                  name={res.farm_name}
                  location={res.location}
                  livestockNumber={res.no_of_livestock}
                  livestockType={res.livestock_type}
                  sex={res.sex}
                  age={res.age}
                  date={res.date}
                  farmId={res.farm_id}
                  fullData={res}
                  key={res.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
