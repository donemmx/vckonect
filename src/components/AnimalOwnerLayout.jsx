import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import AnimalOwnerSidebar from "./sidebar/AnimalOwnerSidebar";

export default function AnimalOwnerLayout() {
  return (
    <div>
      <Header />
      <AnimalOwnerSidebar />
      <div className="absolute left-[5.5vw] lg:left-[13vw] top-[25vh] lg:top-[15vh] w-[90%] lg:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
