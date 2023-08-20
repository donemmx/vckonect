/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminCard from "../../components/adminCard/AdminCard";
import totalUsers from "../../assets/sidebar/users.svg";
import animalOwnerIcon from "../../assets/sidebar/animal-owner.svg";
import totalVet from "../../assets/sidebar/total-vet.svg";
import storesIcon from "../../assets/sidebar/stores.svg";
import clinicsIcon from "../../assets/sidebar/clinic-dash.svg";
import petsIcon from "../../assets/sidebar/livestock.svg";
import { adminGetAnimalOwner, adminGetClinic, adminGetFarm, adminGetPet, adminGetVeterinarian, usersCounter } from "../../utils/adminApiService";
import { toast } from "react-toastify";
import { getStore } from "../../utils/userApiService";

export default function UserFeatures() {
  const [counter, setCounter] = useState();
  const [animalOwner, setAnimalOwner] = useState();
  const [stores, setStores] = useState();
  const [clinic, setClinic] = useState();
  const [pet, setPet] = useState();
  const [farms, setFarms] = useState();
  const [vet, setVet] = useState();
  const [tab, setTab] = useState("total users");
  const getUserCounter = async () => {
    await usersCounter()
      .then((res) => {
        setCounter(res);
      })

    await adminGetAnimalOwner().then((res) => {
      setAnimalOwner(res);
    });

    await adminGetClinic().then((res)=> {
      setClinic(res)
    })

    await getStore().then((res)=> {
      setStores(res)
    })

    await adminGetFarm().then((res)=> {
      setFarms(res)
    })

    await adminGetPet().then((res)=> {
      setPet(res)
    })
    await adminGetVeterinarian().then((res)=> {
      setVet(res)
    })


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
          icon={animalOwnerIcon}
        />

        <AdminCard
          number={counter?.veterinarian}
          text="Total Veterinarian"
          icon={totalVet}
        />
        <AdminCard
          number={stores?.length}
          text="Total Stores"
          icon={storesIcon}
        />
        <AdminCard
          number={clinic?.length}
          text="Total Clinics"
          icon={clinicsIcon}
        />
        <AdminCard
          number={pet?.length + farms?.length}
          text="Total Pets/Farms"
          icon={petsIcon}
        />
      </div>
    </div>
  );
}
