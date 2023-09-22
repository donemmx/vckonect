import { useEffect, useState } from "react";
import { getUserById } from "../../utils/userApiService";

export default function ImageComponent({ data }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const payload = {
      id: data.user_id,
      role: data.role,
    };
    console.log(data);
    getUserById(payload).then(({data}) => {
      setUserInfo(data);
    });
  }, []);
  return (
    <div className="flex items-center gap-2 py-4">
      <img
        src={userInfo?.profile_picture}
        alt=""
        className="h-[40px] w-[40px] rounded-full border-2 border-green-700"
      />
      <div className=" flex flex-col ">
        <div className="text-sm">
          {userInfo?.first_name + " " + userInfo?.last_name}
        </div>
        <small className=" font-light text-[11px]">{userInfo?.role === 'Animal Owner' ? 'User': userInfo?.role }</small>
      </div>
    </div>
  );
}
