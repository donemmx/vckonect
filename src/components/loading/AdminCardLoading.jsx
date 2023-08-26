export default function AdminCardLoading() {
  return (
    <div className=" border border-[#EBEBEB] bg-white p-5 h-[15vh] w-full rounded-[16px] ">
      <div className="animate-pulse w-full">
        <div className="w-full flex items-center justify-between">
        <div className="">
          <div className="h-2 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-2"></div>
          <div className="h-10 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-2"></div>
        </div>
        <div className="h-10 bg-gray-100 rounded dark:bg-gray-200 w-48 mb-2"></div>
        </div>
      </div>
    </div>
  );
}
