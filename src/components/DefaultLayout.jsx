import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default function DefaultLayout() {
  return (
    <div>
        <Header/>
        <Outlet />
    </div>
  )
}
