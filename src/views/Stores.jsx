import addIcon from "../assets/icons/add-icon.svg";
import StoreCard from "../components/storeCard/StoreCard";

export default function Stores() {
  return (
    <div>
        <div className=" font-black text-2xl">Store</div>
        <div className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5">
            <p className="font-bold px-2">Add New Store</p>
            <img src={addIcon} alt="" className="w-[40px]" />
          </div>
          <div className=" flex gap-2 flex-wrap items-center justify-center">
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
            <StoreCard/>
          </div>
    </div>
  )
}
