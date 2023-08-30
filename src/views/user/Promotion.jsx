
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";


export default function Promotion() {
  const userData = useRecoilValue(user);

  return (
    <div className=" flex flex-wrap gap-6">
      <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full lg:w-full">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Ads Promotions
          </h2>
        </div>
          <Link
              to="/animal-owner-subscription"
              className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
            >
              <p className="font-bold px-2">Add New Promotion</p>
              <img src={addIcon} alt="" className="w-[40px]" />
            </Link>
        {/* <div className="flex items-center justify-center gap-2 text-[.8rem] bg-[#F1FFF4] border border-[#B3FFC4] rounded p-3 mt-4 mb-4 ">
          <div className="available "></div>
          Active - ( Till Jun 20, 2023)
        </div> */}
        {/* <div className="promo flex flex-wrap gap-4"> */}
        {/* <PromoCard available={true} />
          <PromoCard available={true} />
          <PromoCard available={true} />
          <PromoCard available={true} /> */}
        {/* </div> */}
        {/* <div className="flex items-center justify-center gap-2 text-[.8rem] bg-[#FFE7E7] border border-[#FF9999] rounded p-3 mt-4 mb-4 ">
          <div className="unavailable "></div>
          Expired - (On Jan 30, 2023) (Renew Ads Promotion)
        </div> */}
        {/* <div className="promo flex flex-wrap gap-4">
          <PromoCard />
          <PromoCard />
        </div> */}
      </div>
   
    </div>
  );
}
