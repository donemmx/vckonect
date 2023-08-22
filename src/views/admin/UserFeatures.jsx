/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminCard from "../../components/adminCard/AdminCard";
import totalUsers from "../../assets/sidebar/users.svg";
import animalOwnerIcon from "../../assets/sidebar/animal-owner.svg";
import totalVet from "../../assets/sidebar/total-vet.svg";
import storesIcon from "../../assets/sidebar/stores.svg";
import clinicsIcon from "../../assets/sidebar/clinic-dash.svg";
import petsIcon from "../../assets/sidebar/livestock.svg";
import {
  activateAccount,
  adminGetAnimalOwner,
  adminGetClinic,
  adminGetFarm,
  adminGetPet,
  adminGetProduct,
  adminGetVeterinarian,
  deactivateAccount,
  usersCounter,
} from "../../utils/adminApiService";
import { toast } from "react-toastify";
import { getStore } from "../../utils/userApiService";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
import moment from "moment";
import { farm, product } from "../../validations/UserValidation";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";

export default function UserFeatures() {
  const [counter, setCounter] = useState();
  const [animalOwner, setAnimalOwner] = useState();
  const [stores, setStores] = useState();
  const [product, setProduct] = useState();
  const [clinic, setClinic] = useState();
  const [pet, setPet] = useState();
  const [farms, setFarms] = useState();
  const [vet, setVet] = useState();
  const [tab, setTab] = useState("animalOwner");
  const [active, setActive] = useState("pet");

  const getUserCounter = async () => {
    await usersCounter().then((res) => {
      setCounter(res);
    });

    await adminGetAnimalOwner().then((res) => {
      setAnimalOwner(res);
    });

    await adminGetClinic().then((res) => {
      setClinic(res);
    });

    await getStore().then((res) => {
      setStores(res);
    });

    await adminGetFarm().then((res) => {
      setFarms(res);
    });

    await adminGetPet().then((res) => {
      setPet(res);
    });
    await adminGetVeterinarian().then((res) => {
      setVet(res);
    });

    await adminGetProduct().then((res) => {
      setProduct(res);
    });
  };

  const activeTab = (type) => {
    setTab(type);
  };

  const activeMenu = (type) => {
    setActive(type);
  };

  const disableUserAccount = () => {
    deactivateAccount(payload).then((res)=> {
      toast.success('User successfully deactivated')
    })
  }
  const activateUserAccount = () => {
    activateAccount(payload).then((res)=> {
      toast.success('User successfully activated')
    })
  }

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
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
        <div className="flex items-center gap-6">
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "animalOwner" ? "font-black" : ""
            } `}
            onClick={() => activeTab("animalOwner")}
          >
            Animal Owners
          </h4>
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "vet" ? "font-black" : ""
            } `}
            onClick={() => activeTab("vet")}
          >
            Vetenarians
          </h4>
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "store" ? "font-black" : ""
            } `}
            onClick={() => activeTab("store")}
          >
            Store
          </h4>
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "clinic" ? "font-black" : ""
            } `}
            onClick={() => activeTab("clinic")}
          >
            Clinic
          </h4>
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "pets" ? "font-black" : ""
            } `}
            onClick={() => activeTab("pets")}
          >
            Pets & Farms
          </h4>
          <h4
            className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
              tab === "product" ? "font-black" : ""
            } `}
            onClick={() => activeTab("product")}
          >
            Products
          </h4>
        </div>

        <div className="search mt-[5vh] shadow-[0px_13px_40px_0px_rgba(27,25,86,0.06)]">
          <div className="form__group flex space-x-2 items-center p-1 border-[#EBEBEB] border  bg-white rounded-[16px]">
            <input
              type="text"
              placeholder="Search"
              className=" outline-none px-2 w-full"
            />
            <div className="search__btn  bg-green-800 h-[45px] w-[200px] text-white  flex items-center gap-4 justify-center rounded-r-[16px]">
              <img src={search} alt="" className=" h-[15px]" />
              Search
            </div>
          </div>
        </div>
        {tab == "animalOwner" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {animalOwner?.map((res) =>
              res.account_activation === "Activated" ? (
                <AdminDashboardCard
                  time={moment(res.date).utc().fromNow()}
                  title={res.first_name + res.last_name}
                  name={res.role}
                  image={res.profile_picture}
                  rejcetButtonText="Disable"
                  message="Are you sure to deactivate this account?"
                  approveFunction={disableUserAccount}
                  key={res.id}
                />
              ) : (
                <AdminDashboardCard
                  time={moment(res.date).utc().fromNow()}
                  title={res.first_name + res.last_name}
                  name={res.role}
                  image={res.profile_picture}
                  approveButtonText="Enable"
                  approveFunction={activateUserAccount}
                  message="Are you sure to activate this account?"
                  key={res.id}
                />
              )
            )}
          </div>
        ) : tab == "vet" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {vet?.map((res) => (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                key={res.id}
              />
            ))}
          </div>
        ) : tab == "store" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {stores?.map((res) => (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.store_name}
                name={res.location}
                image={res.picture}
                key={res.id}
              />
            ))}
          </div>
        ) : tab == "clinic" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {clinic?.map((res) => (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                image={res.picture}
                key={res.id}
              />
            ))}
          </div>
        ) : tab == "pets" ? (
          <>
            <div className="flex items-center gap-4 mt-5 mx-4">
              <h4
                className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
                  active === "pet" ? "font-black" : ""
                } `}
                onClick={() => activeMenu("pet")}
              >
                Pets
              </h4>
              <h4
                className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
                  active === "farm" ? "font-black" : ""
                } `}
                onClick={() => activeMenu("farm")}
              >
                Farms
              </h4>
            </div>
            { active === 'pet' ?
              <div className="posts p-3 mt-5 grid gap-2">
                {pet?.map((res) => (
                  <AdminDashboardCard
                    time={moment(res.date).utc().fromNow()}
                    title={res.pet_name}
                    name={res.pet_id}
                    image={res.picture}
                    key={res.id}
                  />
                ))}
              </div>
              :
              <div className="posts p-3 mt-5 grid gap-2">
              {farms?.map((res) => (
                <AdminDashboardCard
                  time={moment(res.date).utc().fromNow()}
                  title={res.farm_name}
                  name={res.farm_id}
                  image={res.picture}
                  key={res.id}
                />
              ))}
            </div>
            }
          </>
        ) : tab == "product" ? (
          <div className="posts p-3 mt-5 grid gap-2">
            {product?.map((res) => (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                key={res.id}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
