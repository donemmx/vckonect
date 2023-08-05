import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import { user } from "../atom/userAtom";
import { useRecoilValue } from "recoil";

export default function GuestLayout() {
  let userData = useRecoilValue(user);
  return (
    <div className="">
      {!userData?.role ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (
        <>
          {userData?.role === "Veternarian" ? (
            <Navigate to="/vet-dashboard" />
          ) : "" || userData?.role === "Animal Owner" ? (
            <Navigate to="/animal-owner-dashboard" />
          ) : "" || userData?.role === "Admin" ? (
            <Navigate to="/admin-dashboard" />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
