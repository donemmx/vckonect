export default function AdminCard({ icon, text, number }) {
  return (
    <div className="grid grid-cols-2 gap-20 cursor-pointer border border-[#EBEBEB] bg-white p-5 px-8 h-[19vh] w-[13vw] rounded-[16px] items-center justify-between transition-all ease-in-out hover:border-green-500 hover:border-[2px] hover:text-green-700 hover:bg-green-50 hover:shadow-2xl hover:shadow-green-100">
      <div className="">
        <div className="h-[34px] w-[34px]">
          <img src={icon} alt="" className=" h-full w-full object-cover" />
        </div>
        <p className="text-sm font-light pt-3 "> {text} </p>
      </div>
      <div className="font-black text-[30px] ">{number? number : 0}</div>
    </div>
  );
}
