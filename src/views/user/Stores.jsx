import addIcon from "../../assets/icons/add-icon.svg";
import StoreCard from "../../components/storeCard/StoreCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStore } from "../../utils/userApiService";
import Loading from "../../components/loading/Loading";

export default function Stores() {
  const userData = useRecoilValue(user);
  const location = useNavigate();
  const [loading, setLoading] = useState(true)
  const [allStores, SetAllStores] = useState([]);
  const checker = (route) => {
    if (userData?.role === "Veternarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  useEffect(() => {
    getStore({ id: userData.id }).then((res) => {
      SetAllStores(res);
      setLoading(false)
    });
  }, []);
  return (
    <div>
      <div className=" font-black text-2xl">Store</div>
      <button
        onClick={() => checker("add-store")}
        className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5 w-full"
      >
        <p className="font-bold px-2">Add New Store</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </button>

      <div className=" flex gap-4 w-full mb-10">
        {
        loading ?
        [1, 2, 3, 4].map((data) => (
          <div className="w-full mt-10" key={data}>
            <Loading />
          </div>
        ))
        : ''
        }
        
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-center">
        {allStores.map((res) => (
          <StoreCard
            key={res.id}
            availability={res.availability}
            storeName={res.store_name}
            storeLocation={res.location}
            storePhone={res.phone_number}
            image={res.picture}
          />
        ))}
      </div>
    </div>
  );
}
