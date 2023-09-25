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
import {
  getStore,
  getStoreByFilter,
  getUserProduct,
} from "../../utils/userApiService";
import searchIcon from "../../assets/icons/search-icons/search-icon-white.svg";
import moment from "moment";
import { farm, product } from "../../validations/UserValidation";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import PromoCard from "../../components/promoCard/PromoCard";
import ImageComponent from "../../components/image/ImageComponent";
import { Paginator } from "primereact/paginator";

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
  const [timer, setTimer] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [vetLoading, setVetLoading] = useState(false);

  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);
  const [currentData, setCurrentData] = useState();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const formatNumber = (number) => {
    if (number > 999) {
      return `${(number / 1000).toFixed(2)}k`;
    }
    return number;
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    const myData = currentData?.slice(event.first, event.rows + event.first);
    setCurrentPage(myData);
    setTotalRecords(currentData?.length);
  };

  const getAnimalOwner = async () => {
    setLoading(true);
    await adminGetAnimalOwner().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getUserStore = async () => {
    setLoading(true);
    await getStore().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getUserClinic = async () => {
    setLoading(true);
    await adminGetClinic().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getFarmByAdmin = async () => {
    setLoading(true);
    await adminGetFarm().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getPetByAdmin = async () => {
    setLoading(true);
    await adminGetPet().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getAdminVeterinarian = async () => {
    setLoading(true);
    await adminGetVeterinarian().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getadminProduct = async () => {
    setLoading(true);
    await adminGetProduct().then(({ data }) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  const getUserCounter = async () => {
    await usersCounter().then(({ data }) => {
      setCounter(data);
      setLoading(false);
    });
  };

  const activeTab = (type) => {
    setTab(type);
    switch (type) {
      case "animalOwner":
        getAnimalOwner();
        break;
      case "pets":
        if (active === "pet") {
          getPetByAdmin();
        } else {
          getFarmByAdmin();
        }
        break;
      case "vet":
        getAdminVeterinarian();
        break;
      case "store":
        getUserStore();
        break;
      case "clinic":
        getUserClinic();
        break;
      case "product":
        getadminProduct();
        break;
      default:
        break;
    }
  };

  const searchData = async () => {
    setLoading(true);
    switch (tab) {
      case "animalOwner":
        setLoading(true);
        await adminGetAnimalOwner({ name: search }).then(({ data }) => {
          setLoading(false);
          setCurrentData(data);
        });
        break;
      case "pets":
        if (active === "pet") {
          setLoading(true);
          await adminGetPet({ name: search }).then(({ data }) => {
            setLoading(false);
            setCurrentData(data);
          });
        } else {
          setLoading(true);
          await adminGetFarm({ name: search }).then(({ data }) => {
            setLoading(false);
            setCurrentData(data);
          });
        }
        break;
      case "vet":
        setLoading(true);
        await adminGetVeterinarian({ name: search }).then(({ data }) => {
          setLoading(false);
          setCurrentData(data);
        });
        break;
      case "store":
        setLoading(true);
        await getStoreByFilter({ name: search }).then(({ data }) => {
          setLoading(false);
          setCurrentData(data);
        });
        break;
      case "clinic":
        setLoading(true);
        await adminGetClinic({ name: search }).then(({ data }) => {
          setLoading(false);
          setCurrentData(data);
        });
        break;
      case "product":
        setLoading(true);
        await adminGetProduct({ name: search }).then(({ data }) => {
          setCurrentData(data);
          setLoading(false);
        });
        break;
      default:
        break;
    }
  };

  const activeMenu = (type) => {
    setActive(type);
    if(type === 'pet'){
      getPetByAdmin()
    }
    else{
      getFarmByAdmin()
    }
  };

  const useDebounce = () => {
    return function debounce(fn,  wait) {
        let timer = setTimer(null)
        return function(...args) {
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                await fn.apply(this, args);
            }, wait);
        }
    }
}

  const disableUserAccount = (data) => {
    setButtonLoading(true);
    setSelectedId(data.id);
    const payload = {
      id: data.id,
      role: data.role,
    };
    deactivateAccount(payload).then(() => {
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

    verifyVetNumber(payload).then(() => {
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
    activateAccount(payload).then(() => {
      toast.success("User successfully activated");
      setButtonLoading(false);
      getUserCounter();
    });
  };

  useEffect(() => {
    getUserCounter();
  }, []);

  useEffect(() => {
    searchData();
  }, [search.length < 3]);

  useEffect(() => {
    switch (tab) {
      case "animalOwner":
        getAnimalOwner();
        break;
      case "pets":
        if (active === "pet") {
          getPetByAdmin();
        } else {
          getFarmByAdmin();
        }
        break;
      case "vet":
        getAdminVeterinarian();
        break;
      case "store":
        getUserStore();
        break;
      case "clinic":
        getUserClinic();
        break;
      case "product":
        getadminProduct();
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 mt-5">
        <AdminCard
          number={formatNumber(counter?.total_user)}
          text="Total Users"
          icon={totalUsers}
        />
        <AdminCard
          number={formatNumber(counter?.animal_owner)}
          text="Animal Owners"
          icon={animalOwnerIcon}
        />

        <AdminCard
          number={formatNumber(counter?.veterinarian)}
          text="Total Veterinarian"
          icon={totalVet}
        />
        <AdminCard
          number={formatNumber(counter?.store)}
          text="Total Stores"
          icon={storesIcon}
        />
        <AdminCard
          number={formatNumber(counter?.clinic)}
          text="Total Clinics"
          icon={clinicsIcon}
        />
        <AdminCard
          number={formatNumber(counter?.pet + counter?.farm)}
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
                {currentPage?.map((res) =>
                  res.account_activation === "Activated" ? (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res?.first_name + res?.last_name}
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
                      title={res?.first_name + res?.last_name}
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
                {currentPage?.map((res) =>
                  res.account_activation === "Activated" ? (
                    <AdminDashboardCard
                      key={res.id}
                      time={moment(res.date).utc().fromNow()}
                      title={res?.first_name + res?.last_name}
                      id={res.id}
                      vet={res.vet_number_status}
                      verifyVetFunction={() => verifyVetNumberFunction(res.id)}
                      vetLoading={vetLoading}
                      selectedId={selectedId}
                      email={res.email}
                      phone={res.phone_number}
                      vet_number={res.vet_number}
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
                      title={res?.first_name + res?.last_name}
                      name={res.role}
                      id={res.id}
                      email={res.email}
                      vet_number={res.vet_number}
                      phone={res.phone_number}
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
                {currentPage?.map((res) => (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res?.store_name}
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
                {currentPage?.map((res) => (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res?.clinic_name}
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
                    {currentPage?.map((res) => (
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
                    {currentPage?.map((res) => (
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
                {currentPage?.map((res) => (
                  <div className="flex  justify-center flex-col" key={res.id}>
                    <div className="">
                      <ImageComponent data={res} />
                    </div>
                    <PromoCard data={res} store_id={res.id} show={true} />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <Paginator
        className="mt-10"
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[8, 16, 24, 32]}
        onPageChange={onPageChange}
      />
    </div>
  );
}
