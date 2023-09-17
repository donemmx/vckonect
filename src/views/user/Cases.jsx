import addIcon from "../../assets/icons/add-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import PeLivestocktCard from "../../components/livestockpetCard/PeLivestocktCard";
import { useEffect, useState } from "react";
import { getCase } from "../../utils/vetApiService";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import CaseCard from "../../components/caseCard/CaseCard";
import { actionState } from "../../atom/actionAtom";

export default function Cases() {
  const [allcase, setAllCases] = useState([])
  const userData = useRecoilValue(user)
  const [action, setAction] = useRecoilState(actionState);

  const navigate = useNavigate()
  useEffect(()=> {
    getCase({user_id: userData?.id}).then((res)=> {
      setAllCases(res)
    })
  }, [])

  //  to="/vet-add-case"
  const addCase = ()=> {
    setAction("add")
    navigate('/vet-add-case')

  }

  return (
    <div className="p-3">
      <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Cases
          </h2>
        </div>
        <button
          onClick={addCase}
          className="w-full border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Case</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </button>

      <div className="">
       {allcase?.map((res)=> (
        <CaseCard name={res.farm_name} fullData={res} key={res.id}/> 
       )) }
      </div>
      </div>
    </div>
  );
}
