import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import VetSidebar from "./sidebar/VetSidebar";

export default function VetLayout() {
  return (
    <div>
      <Header />
      <VetSidebar />
      <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
