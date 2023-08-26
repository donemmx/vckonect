export default function AdminCardLoading() {
  return (
    <div className="grid  lg:grid-cols-2 gap-2 lg:gap-20 cursor-pointer border border-[#EBEBEB] bg-white p-5 lg:px-8 h-[19vh] w-full lg:w-[13vw] rounded-[16px] items-center justify-between transition-all ease-in-out hover:border-green-500 hover:border-[2px] hover:text-green-700 hover:bg-green-50 hover:shadow-2xl hover:shadow-green-100">
      <div className="animate-pulse ">
        <div className="w-full flex justify-between">
        <div className="">
          <div className="h-2 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-5"></div>
          <div className="h-2 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-5"></div>
          <div className="h-10 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-5"></div>
        </div>
        <div className="h-10 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-5"></div>
        </div>
      </div>
    </div>
  );
}
