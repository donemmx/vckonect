/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import {
  adminGetPromotion,
  adminGetPromotionPlan,
  deleteUserPromotionPlan,
  getPromotionPlan,
} from "../../utils/adminApiService";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";
import searchIcon from "../../assets/icons/search-icons/search-icon-white.svg";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import AdminCard from "../../components/adminCard/AdminCard";
import expiredPromotions from "../../assets/sidebar/expired-promotion.svg";
import activePromotions from "../../assets/sidebar/active-promotion.svg";
import totalPromotions from "../../assets/sidebar/total-promotion.svg";
import { toast } from "react-toastify";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import PromoCard from "../../components/promoCard/PromoCard";
import { getUserById } from "../../utils/userApiService";
import ImageComponent from "../../components/image/ImageComponent";
import { Paginator } from "primereact/paginator";

export default function AdminPromotion() {
  const [promotions, setPromotions] = useState();
  const [userPromotions, setUserPromotions] = useState([]);
  const userData = useRecoilValue(user);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSub, setActiveSub] = useState();
  const [expiredSub, setExpiredSub] = useState();
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [tab, setTab] = useState("active");

  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);
  const [currentData, setCurrentData] = useState();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    const myData = currentData?.slice(event.first, event.rows + event.first);
    setCurrentPage(myData);
    setTotalRecords(currentData?.length);
  };

  const formatNumber = (number) => {
    if (number > 999) {
      return `${(number / 1000).toFixed(2)}k`;
    }
    return number;
  };

  const location = useNavigate();

  const activeTab = (type) => {
    setTab(type);
    if(type === 'active'){
      setCurrentData(activeSub)
    }
    else if(type === 'expired'){
      setCurrentData(expiredSub)
    }
    else{
      setCurrentData(promotions)
    }
  };

  const getPromotions = async () => {
    const payload = {};
    await adminGetPromotionPlan(payload).then(({ data }) => {
      setPromotions(data);
      setLoading(false);
    });
  };

  const getUserPromotions = async () => {
    const payload = {};
    await adminGetPromotion(payload).then((res) => {
      setUserPromotions(res.data);
      const active = res.data.filter((data) => data.subscription === "Active");
      const suspended = res.data.filter(
        (data) => data.subscription === "Suspended"
      );
      const expired = res.data.filter(
        (data) =>
          data.subscription === "Expired" || data.subscription === "Suspended"
      );
      setActiveSub(active);
      setExpiredSub(expired);
      setLoading(false);
      switch (tab) {
        case "active":
          setCurrentData(active)
          break;
        case "expired":
          setCurrentData(expired)
          break;
        default:
          break;
    }})
  };

  const deletePromotion = (data) => {
    const payload = {
      promotion_id: data.promotion_id,
    };
    setLoading(true);
    deleteUserPromotionPlan(payload).then(() => {
      toast.success("Promotion deleted successfully");
      setLoading(false);
      getPromotions();
    });
  };

  const editPromotion = (data) => {
    setStore(data);
    setAction("edit");
    location("/add-promotion");
  };

  const addPromotion = () => {
    setAction("add");
    location("/add-promotion");
  };

  useEffect(() => {
    getPromotions();
    getUserPromotions();
  }, [search.length < 3]);

  const getUserDetails = (res) => {
    const payload = {
      id: res.user_id,
      role: res.role,
    };
    let myInfo = getUserById(payload).then(({ data }) => data.role);
    return myInfo;
  };

  useEffect(() => {
    const event = {
      first: 0,
      rows: 8,
    };
    onPageChange(event);
  }, [currentData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-2 mt-5">
        <AdminCard
          number={formatNumber(promotions?.length)}
          text="Total Promotions"
          icon={totalPromotions}
        />
        <AdminCard
          number={formatNumber(activeSub?.length)}
          text="Active Promotions"
          icon={activePromotions}
        />

        <AdminCard
          number={formatNumber(expiredSub?.length)}
          text="Expired Promotions"
          icon={expiredPromotions}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <Link
          onClick={addPromotion}
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Promotions</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>
        <div className="posts p-3 mt-5 grid gap-2">
          <div className="flex  flex-wrap items-center gap-4">
            <h4
              className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
                tab === "active" ? "font-black" : ""
              } `}
              onClick={() => activeTab("active")}
            >
              Active
            </h4>
            <h4
              className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
                tab === "expired" ? "font-black" : ""
              } `}
              onClick={() => activeTab("expired")}
            >
              Expired
            </h4>
            <h4
              className={`text-[.85rem] lg:text-[1rem] cursor-pointer ${
                tab === "plans" ? "font-black" : ""
              } `}
              onClick={() => activeTab("plans")}
            >
              All Promotion plans
            </h4>
          </div>
          {loading ? (
            <>
              <AdminCardLoading />
              <AdminCardLoading />
              <AdminCardLoading />
            </>
          ) : (
            <>
              {tab == "plans" ? (
                <>
                  {currentPage?.map((res) => (
                    <AdminDashboardCard
                      key={res.id}
                      title={res.promotion_title + " " + "plan"}
                      name={`(${res.no_of_products} Product(s) Max)`}
                      duration={`${res.promotion_title} (${res.duration} ${res.date_option})`}
                      price={res.currency + res.price}
                      message="Are you sure you want to delete this subscription?"
                      loading={loading}
                      deleteCard={true}
                      time={moment(res.date).utc().fromNow()}
                      edit={true}
                      approveFunction={() => deletePromotion(res)}
                      editFunction={() => editPromotion(res)}
                    />
                  ))}
                </>
              ) : tab == "active" ? (
                <>
                  <div className="posts w-full mx-auto items-center pt-10 flex flex-wrap gap-5">
                    {currentPage?.map((res) => (
                      <div
                        className="flex  justify-center flex-col"
                        key={res.id}
                      >
                        <div className="">
                          <ImageComponent data={res} />
                        </div>
                        <PromoCard data={res} store_id={res.id} show={true} />
                      </div>
                    ))}
                  </div>
                </>
              ) : tab == "expired" ? (
                <>
                  <div className="posts w-full mx-auto items-center pt-10 flex flex-wrap gap-5">
                    {currentPage?.map((res) => (
                      <div
                        className="flex  justify-center flex-col"
                        key={res.id}
                      >
                        <div className="">
                          <ImageComponent data={res} />
                        </div>
                        <PromoCard data={res} store_id={res.id} show={true} />
                      </div>
                    ))}
                  </div>
                </>
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
    </div>
  );
}
