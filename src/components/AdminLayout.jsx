import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function AdminLayout() {
  let userData = useRecoilValue(user);

  return (
    <div>
      {userData?.role === 'Admin' ? (
        <>
          <Sidebar />
          <div className="flex w-[90%] mx-auto pt-[12vh] lg:pt-0 lg:absolute lg:left-[18vw] lg:top-20 lg:w-[calc(100vw-19vw)]">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
