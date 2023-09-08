/* eslint-disable no-unused-vars */
import expandIcon from "../../assets/icons/expand-icon.svg";
import location from "../../assets/icons/marker-icon.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import WarningCard from "../warningCard/WarningCard";
import { deleteProduct, deletePromotion } from "../../utils/userApiService";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import useUpadateReload from "../../hooks/UpdateRelaod";
import { useNavigate } from "react-router-dom";
import useRouteChecker from "../../hooks/RouteChecker";

export default function PromoCard({ data, store_id, show }) {
  const userData = useRecoilValue(user);
  const [updateReload] = useUpadateReload();
  const navigate = useNavigate();
  const [routeChecker] = useRouteChecker();
  const deleteProductById = () => {
    const payload = {
      id: data?.id,
      store_id: store_id,
      user_id: userData?.id,
      role: userData?.role,
      title: data?.title,
    };
    deleteProduct(payload).then((res) => {
      updateReload();
      toast.success(res.detail);
    });
  };

  const deletePromotionProduct = () => {
    const payload = {
      id: data?.id,
    }
    deletePromotion(payload).then((res)=> {
      toast.success(res),
      updateReload();
    })
  }

  const gotoStore = () => {
    routeChecker(`store-details/${data.store_id}`);
  };
  return (
    <div
      className="adsCard mb-6  "
    >
      <Carousel
        showThumbs={false}
        swipeable={true}
        showStatus={false}
        showArrows={false}
        autoPlay
        infiniteLoop
        className=" absolute w-full "
      >
        {data?.images?.map((res) => (
          <div key={res} className=" h-full w-full rounded-lg">
            <img
              src={res}
              className="rounded-lg w-full h-[200px] object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="group h-full w-full">
        <div className="top adsUser h-[65%] w-[200px]">
          <div className="pt-4 pr-4">
            {show && userData?.id === data?.user_id ? (
              <div className="flex items-center gap-2 w-fit ml-auto">
                <WarningCard
                  message="Are you Sure you want to delete this product?"
                  header="Confirmation"
                  acceptFunction={deleteProductById}
                />
                <img
                  src={expandIcon}
                  alt=""
                  className=" p-2 mb-2 !h-[35px] w-[35px] object-cover bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 w-fit ml-auto">
                <WarningCard
                  message="Are you Sure you want to delete this promotion?"
                  header="Confirmation"
                  acceptFunction={deletePromotionProduct}
                />
              </div>
            )}
          </div>
          <div className="bottom flex items-center justify-between p-2 absolute bottom-2 w-full ">
            <div className="rating text-white text-sm flex items-center gap-2"></div>
            <div className="text-white font-black text-2xl pr-4">
              $ {data?.price}
            </div>
          </div>
        </div>

        <div className="bottom absolute w-full z-50 bg-white p-5 rounded-b-[12px]">
          <div className="name font-black sm:text-[.85rem] md:text-[1rem]">
            {data?.title}
          </div>
          <div className="location flex text-sm items-center gap-2">
            <img src={location} alt="" className=" h-5" />
            {data?.location}
          </div>
          <div className="flex items-center justify-center gap-2 text-[.8rem] bg-gray-100  rounded p-3 mt-4 ">
            <div
              className={data?.availability == 1 ? "available" : "unavailable"}
            ></div>
            {data?.available_units > 0
              ? `Available - ${data?.available_units}`
              : "Sold Out"}
          </div>
        </div>
      </div>
    </div>
  );
}
