export default function AdminCard({ icon, text, number }) {
  return (
    <div className="grid  lg:grid-cols-2 gap-2 lg:gap-20 cursor-pointer border border-[#EBEBEB] bg-white p-5 lg:px-8 h-[19vh] w-full lg:w-[13vw] rounded-[16px] items-center justify-between transition-all ease-in-out hover:border-green-500 hover:border-[2px] hover:text-green-700 hover:bg-green-50 hover:shadow-2xl hover:shadow-green-100">
      <div className="">
        <div className="h-[25px] w-[25px] lg:h-[34px] lg:w-[34px]">
          <img src={icon} alt="" className=" h-full w-full object-cover" />
        </div>
        <p className="text-[14px] lg:text-sm font-light pt-3 "> {text} </p>
      </div>
      <div className="font-black text-[30px] ">{number? number : 0}</div>
    </div>
  );
}
