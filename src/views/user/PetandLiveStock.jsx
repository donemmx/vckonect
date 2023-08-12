import { useEffect, useState } from "react";
import addIcon from "../../assets/icons/add-icon.svg";
import PeLivestocktCard from "../../components/livestockpetCard/PeLivestocktCard";
import farmImg from "../../assets/icons/farm.png";
import dogImg from "../../assets/icons/dog.png";
import { Link } from "react-router-dom";
import { getFarm, getPet } from "../../utils/animalOwnerApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import FarmCard from "../../components/livestockpetCard/Farmcard";

export default function PetandLiveStock() {
  const userData = useRecoilValue(user);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("pets");
  const [allFarms, setAllFarms] = useState([]);
  const [allPets, setAllPets] = useState([]);

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
  }, [tab]);
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
        {tab === "pets" ? (
          <>
            <Link
              to="/add-pet"
              className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
            >
              <p className="font-bold px-2">Add New Post</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </Link>

            {allPets.map((res) => (
              <PeLivestocktCard
                petImg={dogImg}
                specie={res.specie}
                breed={res.breed}
                sex={res.sex}
                age={res.age}
                date={res.date}
                petId={res.pet_id}
                name={res.pet_name}
                key={res.id}
              />
            ))}
          </>
        ) : (
          <>
            <Link
              to="/add-farm"
              className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
            >
              <p className="font-bold px-2">Add New Post</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </Link>
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
                key={res.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
