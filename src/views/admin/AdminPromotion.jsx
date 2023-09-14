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

export default function AdminPromotion() {
  const [promotions, setPromotions] = useState();
  const [userPromotions, setUserPromotions] = useState([]);
  const userData = useRecoilValue(user);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);

  const location = useNavigate();

  const getPromotions = async () => {
    const payload = {};
    await adminGetPromotionPlan(payload).then((res) => {
      setPromotions(res);
      setLoading(false);
    });
  };
  const getUserPromotions = async () => {
    const payload = {};
    await adminGetPromotion(payload).then((res) => {
      setUserPromotions(res);
      setLoading(false);
    });
  };


  const deletePromotion = (data) => {
    setLoading(true);
    const payload = {
      promotion_id: data.promotion_id,
    };
    deleteUserPromotionPlan(payload).then((res) => {
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
  }, [search.length < 3]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-2 mt-5">
        <AdminCard
          number={promotions?.length}
          text="Total Promotions"
          icon={totalPromotions}
        />
        <AdminCard
          number={0}
          text="Active Promotions"
          icon={activePromotions}
        />

        <AdminCard
          number={0}
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
          {/* <div className="form__group flex space-x-2 items-center p-1 border-[#EBEBEB] border  bg-white rounded-[16px]">
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
          </div> */}
          {loading ? (
            <>
              <AdminCardLoading />
              <AdminCardLoading />
              <AdminCardLoading />
            </>
          ) : (
            <>
              {promotions?.map((res) => (
                <AdminDashboardCard
                  key={res.id}
                  title={res.promotion_title + " " + "plan"}
                  name={`(${res.no_of_products} Product(s) Max)`}
                  duration={`${res.promotion_title} (${res.duration} ${res.date_option})`}
                  price={res.currency + res.price}
                  message='Are you sure you want to delete this subscription?'
                  loading={loading}
                  deleteCard={true}
                  time={moment(res.date).utc().fromNow()}
                  edit={true}
                  approveFunction={() => {
                    deletePromotion({
                      id: res.promotion_id
                    })
                  }}
                  editFunction={() => editPromotion(res)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
