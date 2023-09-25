
export default function ImageComponent({ data }) {

  return (
    <div className="flex items-center gap-2 py-4">
      <img
        src={data?.profile_picture}
        alt=""
        className="h-[40px] w-[40px] rounded-full border-2 border-green-700"
      />
      <div className=" flex flex-col ">
        <div className="text-sm">
          {data?.first_name + " " + data?.last_name}
        </div>
        <small className=" font-light text-[11px]">{data?.role === 'Animal Owner' ? 'User': data?.role }</small>
      </div>
    </div>
  );
}
