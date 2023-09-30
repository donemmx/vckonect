import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import AnimalOwnerSidebar from "./sidebar/AnimalOwnerSidebar";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";
import ScrollToTop from "../hooks/ScrollToTop";

export default function AnimalOwnerLayout() {
  let userData = useRecoilValue(user);
  return (
    <div>
      {userData?.role === "Animal Owner" ? (
        <>
          <Header />
          <ScrollToTop />
          <AnimalOwnerSidebar />
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
