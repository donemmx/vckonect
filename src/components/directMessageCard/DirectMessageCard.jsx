/* eslint-disable no-unused-vars */
import moment from "moment";
import { Badge } from "primereact/badge";
import { message } from "../../atom/messageAtom";
import { useRecoilState } from "recoil";
import { viewDirectMessage } from "../../utils/userApiService";
import { user } from "../../atom/userAtom";
import { reloadStore } from "../../atom/reloadAtom";
export default function DirectMessageCard({ data }) {
  const [messageData, setMessageData] = useRecoilState(message);
  const userData = useRecoilState(user);
  const [reload, setReload] = useRecoilState(reloadStore);

  const viewMessage = (fullData) => {

    setMessageData(data);
    setReload(!reload);
    viewDirectMessage(fullData).then(() => {});
  };
  return (
    <div
      className="flex gap-2  border items-center justify-between p-5 bg-white cursor-pointer hover:border-green-500 hover:border-2 transition-all ease-in-out hover:bg-green-50 rounded"
      onClick={() => viewMessage(data)}
    >
      <div className="flex gap-2 ">
        <div className="h-[40px] w-[40px]">
          <img
            src={data?.profile_picture}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="">
          <div className="name text-sm font-bold">
            {data?.first_name} {data?.last_name}
          </div>
          <small className="font-light text-xs">{data?.role}</small>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="time text-xs p-1 px-3 rounded-full bg-gray-200 w-fit ">
          {moment(data?.message[0].date).fromNow()}
        </div>
        {data.counter > 0 ? <Badge value={data?.counter} severity={"danger"}></Badge> : ''}
      </div>
    </div>
  );
}
