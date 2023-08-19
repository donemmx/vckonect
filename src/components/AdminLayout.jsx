import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function AdminLayout() {
  let userData = useRecoilValue(user);

  return (
    <div>
      {userData?.role === 'Admin' ? (
        <>
          <Header />
          <Sidebar />
          <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
