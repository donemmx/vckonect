/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { usersCounter } from "../../utils/adminApiService";
import { useEffect, useState } from "react";
import AdminCard from "../../components/adminCard/AdminCard";
import totalUsers from "../../assets/sidebar/users.svg";
import animalOwner from "../../assets/sidebar/animal-owner.svg";
import totalVet from "../../assets/sidebar/total-vet.svg";
import verifiedVet from "../../assets/sidebar/verified-vet.svg";
import unverifiedVet from "../../assets/sidebar/unverified-vet.svg";
import activeUser from "../../assets/sidebar/active-users.svg";

export default function AdminDashboard() {
  const [counter, setCounter] = useState();
  const [tab, setTab] = useState('total users')
  const getUserCounter = () => {
    usersCounter()
      .then((res) => {
        setCounter(res);
      })
      .catch((err) => toast.error(err.detail));
  };

  const activeTab = (type) => {
    setTab(type);
  };

  useEffect(() => {
    getUserCounter();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-6 gap-2 mt-5">
        <AdminCard
          number={counter?.total_user}
          text="Total Users"
          icon={totalUsers}
        />
        <AdminCard
          number={counter?.animal_owner}
          text="Animal Owners"
          icon={animalOwner}
        />
        
        <AdminCard
          number={counter?.veterinarian}
          text="Total Veterinarian"
          icon={totalVet}
        />
        <AdminCard
          number={counter?.verified_vet}
          text="Verified Veterinarian"
          icon={verifiedVet}
        />
        <AdminCard
          number={counter?.unverified_vet}
          text="Unverified Veterinarian"
          icon={unverifiedVet}
        />
        <AdminCard
          number={counter?.active_user}
          text="Active Users"
          icon={activeUser}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h2
            className={` text-[1rem] lg:text-[1rem] cursor-pointer ${
              tab === "users" ? "font-black" : ""
            } `}
            onClick={() => activeTab("users")}
          >
            Total Users
          </h2>
          <h4
            className={`text-[1rem] lg:text-[1rem] cursor-pointer ${
              tab === "animalOwner" ? "font-black" : ""
            } `}
            onClick={() => activeTab("animalOwner")}
          >
          Animal Owners
          </h4>
          <h4
            className={`text-[1rem] lg:text-[1rem] cursor-pointer ${
              tab === "totalVet" ? "font-black" : ""
            } `}
            onClick={() => activeTab("totalVet")}
          >
            Total Vetenarians
          </h4>
          <h4
            className={`text-[1rem] lg:text-[1rem] cursor-pointer ${
              tab === "verifiedVet" ? "font-black" : ""
            } `}
            onClick={() => activeTab("verifiedVet")}
          >
               Verified Vetenarians
          </h4>
          <h4
            className={`text-[1rem] lg:text-[1rem] cursor-pointer ${
              tab === "unverifiedVet" ? "font-black" : ""
            } `}
            onClick={() => activeTab("unverifiedVet")}
          >
              Unverified Vetenarians
          </h4>
        </div>

  
      </div>
    </div>
  );
}
