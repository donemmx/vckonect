import moment from "moment";
import { Badge } from "primereact/badge";

export default function DirectMessageCard({data}) {
  return (
    <div className="flex gap-2 rounded border items-center justify-between p-5 bg-white cursor-pointer hover:border-green-500 hover:border-2 transition-all delay-100 ease-in-out">
        <div className="flex gap-2 ">
            <div className="h-[40px] w-[40px]">
                <img src={data?.profile_picture} alt="" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="">
                <div className="name text-sm font-bold">
                    {data?.first_name} {data?.last_name}
                </div>
                <small className="font-light text-xs">
                    {data?.role}
                </small>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="time text-xs p-1 px-3 rounded-full bg-gray-200 w-fit ">
                {moment(data?.message[0].date).fromNow() }
            </div>
                <Badge value={data?.counter} severity={'danger'}></Badge>
        </div>
    </div>
  )
}
