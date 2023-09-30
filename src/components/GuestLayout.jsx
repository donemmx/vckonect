import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import { user } from "../atom/userAtom";
import { useRecoilValue } from "recoil";
import ScrollToTop from "../hooks/ScrollToTop";

export default function GuestLayout() {
  let userData = useRecoilValue(user);
  return (
    <div className="">
      {!userData?.role ? (
        <div>
          <Header />
          <ScrollToTop />
          <Outlet />
        </div>
      ) : (
        <>
          {userData?.role === "Veterinarian" ? (
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
