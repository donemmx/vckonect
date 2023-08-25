/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { adminGetPromotion } from "../../utils/adminApiService";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { Link } from "react-router-dom";
import addIcon from "../../assets/icons/add-icon.svg";

export default function AdminPromotion() {
  const [promotions, setPromotions] = useState();
  const userData = useRecoilValue(user);

  const getPromotions = async () => {
    const payload = {};
    await adminGetPromotion(payload).then((res) => {
      setPromotions(res);
    });
  };

  useEffect(() => {
    getPromotions();
  }, []);
  return (
    <div className="w-full">
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg w-full">
        <Link
          to="/add-promotion"
          className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-10 mb-5"
        >
          <p className="font-bold px-2">Add New Promotions</p>
          <img src={addIcon} alt="" className="w-[40px]" />
        </Link>
        <div className="posts p-3 mt-5 grid gap-2">
          {promotions?.map((res) => (
            <AdminDashboardCard
              time={moment(res.date).utc().fromNow()}
              title={res.title}
              name={res.no_of_products}
              key={res.id}
              price={res.price}
              duration={res.duration}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
