import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
