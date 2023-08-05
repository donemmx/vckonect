import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import { user } from "../atom/userAtom";
import { useRecoilValue } from "recoil";

export default function GuestLayout() {
  let userData = useRecoilValue(user);
  return (
    <div className="">
      {!userData ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (
        <Navigate to='/dashboard' />
      )}
    </div>
  );
}
