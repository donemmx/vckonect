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
  verifyVetNumber,
} from "../../utils/adminApiService";
import { toast } from "react-toastify";
import { getStore, getStoreByFilter } from "../../utils/userApiService";
import searchIcon from "../../assets/icons/search-icons/search-icon-white.svg";
import moment from "moment";
import { farm, product } from "../../validations/UserValidation";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import PromoCard from "../../components/promoCard/PromoCard";
import ImageComponent from "../../components/image/ImageComponent";

export default function UserFeatures() {
  const [counter, setCounter] = useState();
  const [animalOwner, setAnimalOwner] = useState();
  const [stores, setStores] = useState();
  const [product, setProduct] = useState();
  const [clinic, setClinic] = useState();
  const [pet, setPet] = useState();
  const [farms, setFarms] = useState();
  const [vet, setVet] = useState();
  const [selectedId, setSelectedId] = useState();
  const [tab, setTab] = useState("animalOwner");
  const [active, setActive] = useState("pet");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [vetLoading, setVetLoading] = useState(false);

  const getUserCounter = async () => {
    await usersCounter().then((res) => {
      setCounter(res);
      setLoading(false);
    });

    await adminGetAnimalOwner().then((res) => {
      setAnimalOwner(res);
      setLoading(false);
    });

    await adminGetClinic().then((res) => {
      setClinic(res);
      setLoading(false);
    });

    await getStore().then((res) => {
      setStores(res);
      setLoading(false);
    });

    await adminGetFarm().then((res) => {
      setFarms(res);
      setLoading(false);
    });

    await adminGetPet().then((res) => {
      setPet(res);
      setLoading(false);
    });
    await adminGetVeterinarian().then((res) => {
      setVet(res);
      setLoading(false);
    });

    await adminGetProduct().then((res) => {
      setProduct(res);
      setLoading(false);
    });
  };

  const activeTab = (type) => {
    setTab(type);
  };

  const searchData = async () => {
    setLoading(true);
    switch (tab) {
      case "animalOwner":
        setLoading(true);
        await adminGetAnimalOwner({ name: search }).then((res) => {
          setLoading(false);
          setAnimalOwner(res);
        });
        break;
      case "pets":
        if (active === "pet") {
          setLoading(true);
          await adminGetPet({ name: search }).then((res) => {
            setLoading(false);
            setPet(res);
          });
        } else {
          setLoading(true);
          await adminGetFarm({ name: search }).then((res) => {
            setLoading(false);
            setFarms(res);
          });
        }
        break;
      case "vet":
        setLoading(true);
        await adminGetVeterinarian({ name: search }).then((res) => {
          setLoading(false);
          setVet(res);
        });
        break;
      case "store":
        setLoading(true);
        await getStoreByFilter({ name: search }).then((res) => {
          setLoading(false);
          setStores(res);
        });
        break;
      case "clinic":
        setLoading(true);
        await adminGetClinic({ name: search }).then((res) => {
          setLoading(false);
          setClinic(res);
        });
        break;
      default:
        break;
    }
  };

  const activeMenu = (type) => {
    setActive(type);
  };

  const disableUserAccount = (data) => {
    setButtonLoading(true);
    setSelectedId(data.id);
    console.log(data);
    const payload = {
      id: data.id,
      role: data.role,
    };
    deactivateAccount(payload).then((res) => {
      toast.success("User successfully deactivated");
      setButtonLoading(false);
      getUserCounter();
    });
  };

  const verifyVetNumberFunction = (id) => {
    setVetLoading(true);
    const payload = {
      id: id,
    };
    setSelectedId(id);

    verifyVetNumber(payload).then((res) => {
      toast.success("Vet Number Verified successfully");
      setVetLoading(false);
      getUserCounter();
    });
  };
  const activateUserAccount = (data) => {
    setButtonLoading(true);
    setSelectedId(data.id);

    const payload = {
      id: data.id,
      role: data.role,
    };
    activateAccount(payload).then((res) => {
      toast.success("User successfully activated");
      setButtonLoading(false);
      getUserCounter();
    });
  };

  useEffect(() => {
    getUserCounter();
  }, [search.length < 3]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 mt-5">
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
        <div className="flex  flex-wrap items-center gap-4">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="search__btn  bg-green-800 h-[45px] w-[200px] text-white  flex items-center gap-4 justify-center rounded-r-[16px]"
              onClick={searchData}
              disabled={search.length < 3}
            >
              <img src={searchIcon} alt="" className=" h-[15px]" />
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <div className="grid gap-2">
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
            <AdminCardLoading />
          </div>
        ) : (
          <>
            {tab == "animalOwner" ? (
              <div className="posts lg:p-3 mt-5 grid gap-2">
                {animalOwner?.map((res) =>
                  res.account_activation === "Activated" ? (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      id={res.id}
                      selectedId={selectedId}
                      image={res.profile_picture}
                      rejcetButtonText="Disable"
                      message="Are you sure to deactivate this account?"
                      approveFunction={() => disableUserAccount(res)}
                      loading={buttonLoading}
                    />
                  ) : (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      selectedId={selectedId}
                      name={res.role}
                      id={res.id}
                      image={res.profile_picture}
                      approveButtonText="Enable"
                      approveFunction={() => activateUserAccount(res)}
                      message="Are you sure to activate this account?"
                      loading={buttonLoading}
                    />
                  )
                )}
              </div>
            ) : tab == "vet" ? (
              <div className="posts p-3 mt-5 grid gap-2">
                {vet?.map((res) =>
                  res.account_activation === "Activated" ? (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      id={res.id}
                      vet={res.vet_number_status}
                      verifyVetFunction={() => verifyVetNumberFunction(res.id)}
                      vetLoading={vetLoading}
                      selectedId={selectedId}
                      name={res.role}
                      image={res.profile_picture}
                      rejcetButtonText="Disable"
                      message="Are you sure to deactivate this account?"
                      approveFunction={() => disableUserAccount(res)}
                      loading={buttonLoading}
                    />
                  ) : (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res.first_name + res.last_name}
                      name={res.role}
                      id={res.id}
                      selectedId={selectedId}
                      image={res.profile_picture}
                      approveButtonText="Enable"
                      approveFunction={() => activateUserAccount(res)}
                      message="Are you sure to activate this account?"
                      loading={buttonLoading}
                    />
                  )
                )}
              </div>
            ) : tab == "store" ? (
              <div className="posts p-3 mt-5 grid gap-2">
                {stores?.map((res) => (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res.store_name}
                    id={res.id}
                    selectedId={selectedId}
                    name={res.location}
                    image={res.picture}
                    loading={buttonLoading}
                  />
                ))}
              </div>
            ) : tab == "clinic" ? (
              <div className="posts p-3 mt-5 grid gap-2">
                {clinic?.map((res) => (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res.clinic_name}
                    id={res.id}
                    selectedId={selectedId}
                    name={res.location}
                    image={res.picture}
                    loading={buttonLoading}
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
                {active === "pet" ? (
                  <div className="posts p-3 mt-5 grid gap-2">
                    {pet?.map((res) => (
                      <AdminDashboardCard
                        key={res.id}
                        time={moment(res.date).utc().fromNow()}
                        title={res.pet_name}
                        name={res.pet_id}
                        id={res.pet_id}
                        selectedId={selectedId}
                        image={res.picture}
                        loading={loading}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="posts p-3 mt-5 grid gap-2">
                    {farms?.map((res) => (
                      <AdminDashboardCard
                        key={res.id}
                        time={moment(res.date).utc().fromNow()}
                        title={res.farm_name}
                        name={res.farm_id}
                        image={res.picture}
                        id={res.id}
                        selectedId={selectedId}
                        loading={loading}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : tab == "product" ? (
              <div className="posts w-full mx-auto items-center pt-10 flex justify-center flex-wrap gap-5">
                {product?.map((res) => (
                  <div className="flex  justify-center flex-col" key={res.id}>
                    <div className="">
                      <ImageComponent data={res} />
                    </div>
                    <PromoCard
                      data={res}
                      store_id={res.id}
                      show={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
