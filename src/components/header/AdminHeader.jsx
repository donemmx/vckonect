import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function AdminHeader() {
  const userData = useRecoilValue(user);

  return (
    <div className="hidden fixed w-[calc(100vw-17vw)] h-[80px] lg:flex items-center justify-end p-4 right-0 top-0">
    <div className=" flex flex-row-reverse items-center justify-end gap-3 ">
      <div className="   h-[50px] w-[50px]">
        <img
          src={userData?.profile_picture}
          alt=""
          className=" w-full h-full object-cover rounded-full "
        />
      </div>
      <div className="">
        <div className="text-[14px] font-black">
          {userData?.first_name} {userData?.last_name}
        </div>
        <p className="text-[10px]">{userData?.email}</p>
      </div>
    </div>
    </div>
  );
}
