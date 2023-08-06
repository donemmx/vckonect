import addIcon from "../../assets/icons/add-icon.svg";
import StoreCard from "../../components/storeCard/StoreCard";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getStore } from "../../utils/userApiService";

export default function Stores() {
  const userData = useRecoilValue(user);
  const location = useNavigate();

  const checker = (route) => {
    if (userData?.role === "Veternarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  useEffect(()=> {
      getStore().then((res)=> {
        console.log(res);
      })
  }, [])
  return (
    <div>
        <div className=" font-black text-2xl">Store</div>
        <button onClick={() => checker('add-store')} className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5 w-full">
            <p className="font-bold px-2">Add New Store</p>
            <img src={addIcon} alt="" className="w-[40px]" />
          </button>
          <div className=" flex gap-2 flex-wrap items-center justify-center">
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
          </div>
    </div>
  )
}
