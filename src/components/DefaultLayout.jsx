import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";

export default function DefaultLayout() {
  let auth = useRecoilValue(user);

  return (
    <div>
      {auth?.role === "Veterinarian" || auth?.role === "Animal Owner" ? (
        <>
          <Header bg={true} />
          <Outlet />
        </>
      ) : auth?.role === "Admin" ? (
        <Navigate to="/admin-login" />
      ) : (
        <>
          <Header bg={true} />
          <Outlet />
        </>
      )}
    </div>
  );
}
