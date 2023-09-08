import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SubscribeToPlan from "./SubscribeToPlan";
import { getMyPromotionPlan, getPromotion } from "../../utils/userApiService";
import { promotion } from "../../validations/UserValidation";
import moment from "moment/moment";
import PromotionPlanCard from "../../components/promotionPlanCard/PromotionPlanCard";
import PromotionSubscriptionCard from "../../components/promotionSubscriptionCard/PromotionSubscriptionCard";
import { reloadStore } from "../../atom/reloadAtom";
import PromoCard from "../../components/promoCard/PromoCard";
import { adminGetPromotion } from "../../utils/adminApiService";

export default function Promotion() {
  const userData = useRecoilValue(user);
  const reload = useRecoilValue(reloadStore);
  const [tab, setTab] = useState("all");
  const [myPromotion, setMyPromotion] = useState([]);
  const [productsPromoted, setProductsPromoted] = useState([]);
  const location = useNavigate();

  const activeTab = (type) => {
    setTab(type);
  };

  const checker = (route) => {
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  const getCurrentPromotion = () => {
    const payload = {
      id: userData?.id,
      role: userData?.role,
    };
    getMyPromotionPlan(payload).then((res) => {
      setMyPromotion(res);
    });
  };

  const getProductsPromoted = () => {
    adminGetPromotion({
      name: ''
    }).then((res) => {
      setProductsPromoted(res);
    });
  };

  useEffect(() => {
    getCurrentPromotion();
    getProductsPromoted();
  }, [reload]);

  return (
    <div className=" flex flex-wrap gap-6">
      <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full lg:w-full">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Ads Promotions
          </h2>
        </div>
        <div className="pets mt-5  mb-5 p-4 border bg-white rounded-lg">
          <div className="flex items-center gap-6">
            <h2
              className={` text-[1rem] lg:text-[1.1rem] cursor-pointer ${
                tab === "all" ? "font-black" : ""
              } `}
              onClick={() => activeTab("all")}
            >
              Promotion
            </h2>
            <h4
              className={`text-[1rem] lg:text-[1.1rem] cursor-pointer ${
                tab === "subscription" ? "font-black" : ""
              } `}
              onClick={() => activeTab("subscription")}
            >
              Ads Subsription
            </h4>
          </div>
          {tab === "all" ? (
            <>
              {myPromotion?.subscription === "Active" ? (
                <>
                  <PromotionPlanCard myPromotion={myPromotion} productsPromoted={productsPromoted}/>
                  <div className=" flex flex-wrap items-center gap-4">
                    {productsPromoted.map((res) => (
                      <PromoCard key={res.id} data={res} />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : myPromotion?.subscription === "Active" ? (
            <PromotionSubscriptionCard promotion={myPromotion} />
          ) : (
            <SubscribeToPlan />
          )}
        </div>
      </div>
    </div>
  );
}
