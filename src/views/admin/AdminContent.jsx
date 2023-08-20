/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminCard from "../../components/adminCard/AdminCard";
import totalVet from "../../assets/sidebar/total-vet.svg";
import totalComments from "../../assets/sidebar/recent-comment.svg";
import totalLiked from "../../assets/sidebar/recent-liked.svg";
import recentPublished from "../../assets/sidebar/recent-published-content.svg";
import {
  adminGetAnimalOwner,
  adminGetClinic,
  adminGetFarm,
  adminGetPet,
  adminGetVeterinarian,
  approveForumChat,
  rejectForumChat,
  usersCounter,
} from "../../utils/adminApiService";
import { toast } from "react-toastify";
import { getForumChat, getStore } from "../../utils/userApiService";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
import AdminDashboardCard from "../../components/adminDashboardCard/adminDashboardCard";
import moment from "moment";
import { product } from "../../validations/UserValidation";

export default function AdminContent() {
  const [animalOwner, setAnimalOwner] = useState();
  const [forum, setForum] = useState();
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState();
  const getUserCounter = async () => {
    await getForumChat().then((res) => {
      setForum(res);
      setLoading(false);
    });
  };

  const approveContent = (payload) => {
    setLoading(true);
    approveForumChat(payload).then((res) => {
      toast.success("Post Approved Successfully");
      getUserCounter();

    });
  };
  const rejectContent = (payload) => {
    setLoading(true);
    rejectForumChat(payload).then((res) => {
      toast.success("Post Rejected Successfully");
      getUserCounter();
    });
  };

  useEffect(() => {
    getUserCounter();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 mt-5">
        <AdminCard
          number={forum?.length}
          text="Total Published"
          icon={recentPublished}
        />
        <AdminCard
          number={forum?.animal_owner}
          text="Total Liked"
          icon={totalLiked}
        />

        <AdminCard
          number={forum?.veterinarian}
          text="Total Comment"
          icon={totalComments}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
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
        <div className="posts p-3 mt-5 grid gap-2">
          {forum?.map((res) =>
            res.status === "Approved" ? (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                rejcetButtonText="Reject"
                loading={loading}
                rejectFunction={() =>
                  rejectContent({
                    forum_chat_id: res.id,
                    user_id: res.user_id,
                    user_role: res.user_role,
                  })
                }
                key={res.id}
              />
            ) : (
              <AdminDashboardCard
                time={moment(res.date).utc().fromNow()}
                title={res.title}
                name={res.user_name}
                approveButtonText="Approve"
                loading={loading}
                approveFunction={() =>
                  approveContent({
                    forum_chat_id: res.id,
                    user_id: res.user_id,
                    user_role: res.user_role,
                  })
                }
                key={res.id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
