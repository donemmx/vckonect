import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";
import VetSidebar from "./sidebar/VetSidebar";
import { useRecoilValue } from "recoil";
import { user } from "../atom/userAtom";
import ScrollToTop from "../hooks/ScrollToTop";

export default function VetLayout() {
  let auth = useRecoilValue(user);
  return (
    <div>
      {auth?.role === "Veterinarian" ? (
        auth.subscription === null || auth.subscription === "Expired" ? (
          <>
            <Header />
            <Navigate to="/vet-subscription" />
            <ScrollToTop />
            <Outlet />
          </>
        ) : (
          <>
            <Header />
            <VetSidebar />
            <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
              <ScrollToTop />
              <Outlet />
            </div>
          </>
        )
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
