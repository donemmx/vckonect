import AdminWarningCard from "../AdminWarningCard/AdminWarningCard";

export default function AdminDashboardCard({
  image,
  title,
  name,
  time,
  approveButtonText,
  rejcetButtonText,
  approveFunction,
  message,
  loading,
}) {
  return (
    <div className=" bg-white flex items-center flex-col gap-2 lg:flex-row justify-between p-5 border rounded-lg">
      <div className="flex items-center gap-4 w-full">
        {image && image.length > 64 ? (
          <div className=" h-[65px] w-[65px]">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        ) : (
          ""
        )}
        <div className="">
          <div className="font-bold text-sm">{title}</div>
          <div className=" text-[11px]">{name}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
          <AdminWarningCard 
           approveButtonText={approveButtonText}
           rejcetButtonText={rejcetButtonText}
           acceptFunction={approveFunction}
           message={message}
           loading={loading}
          />
        <div className="text-[11px] bg-gray-100 flex text-center justify-center mr-auto lg:ml-auto p-2 w-[140px] px-4 border rounded-full">
          {time}
        </div>
      </div>
    </div>
  );
}
