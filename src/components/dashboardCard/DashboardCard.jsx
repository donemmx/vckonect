
export default function DashboardCard({title, name, time}) {
  return (
    <div className=" bg-white flex items-center flex-col gap-2 lg:flex-row justify-between p-6 border rounded-lg">
    <div className=" w-full">
      <div className="font-bold text-sm">
       {title}
      </div>
      <div className=" text-[11px]">{name}</div>
    </div>
    <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
      {time} mins ago
    </div>
  </div>
  )
}
