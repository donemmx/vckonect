export default function DirectMessageCard({data}) {
  return (
    <div>
        <div className="flex rounded border p-4 bg-white">
            <div className="h-[40px] w-[40px">
                <img src={data?.profile_picture} alt="" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="">
                <div className="name text-sm">
                    {data?.first_name} {data?.last_name}
                </div>
            </div>
        </div>
        <div className="">
            <div className="time">

            </div>
        </div>
    </div>
  )
}
