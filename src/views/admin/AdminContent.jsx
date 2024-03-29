/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminCard from "../../components/adminCard/AdminCard";
import totalVet from "../../assets/sidebar/total-vet.svg";
import rejectedPost from "../../assets/sidebar/rejectedPost.svg";
import approvedPost from "../../assets/sidebar/approvedPost.svg";
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
import {
  getForumChat,
  getForumChatByFilter,
  getStore,
} from "../../utils/userApiService";
import searchIcon from "../../assets/icons/search-icons/search-icon-white.svg";
import AdminDashboardCard from "../../components/adminDashboardCard/AdminDashboardCard";
import moment from "moment";
import { product } from "../../validations/UserValidation";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
import { Paginator } from "primereact/paginator";

export default function AdminContent() {
  const [animalOwner, setAnimalOwner] = useState();
  const [forum, setForum] = useState();
  const [approved, setApproved] = useState();
  const [rejected, setRejected] = useState();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pet, setPet] = useState();
  const [selectedId, setSelectedId] = useState();
  const [search, setSearch] = useState("");

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



  const getUserCounter = async () => {
    setLoading(true);
    await getForumChat().then(({data}) => {
      setCurrentData(data);
      setLoading(false);
      setApproved(() => data.filter((data) => data.status === "Approved"));
      const rejected  = data.filter((data) => data.status === "Rejected")
      const notApproved = data.filter((data) => data.status === "Not Approved")
      const totalRejected = rejected.length + notApproved.length
      setRejected(totalRejected);
    });
  };

  const approveContent = (payload) => {
    setButtonLoading(true);
    setSelectedId(payload.forum_chat_id)
    approveForumChat(payload).then(() => {
      toast.success("Post Approved Successfully");
      setButtonLoading(false);
      getUserCounter();
    });
  };
  const rejectContent = (payload) => {
    setButtonLoading(true);
    setSelectedId(payload.forum_chat_id)
    rejectForumChat(payload).then(() => {
      toast.success("Post Rejected Successfully");
      setButtonLoading(false);
      getUserCounter();
    });
  };

  const searchData = async () => {
    setLoading(true);
    await getForumChatByFilter({ name: search }).then(({data}) => {
      setCurrentData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserCounter();
  }, [search.length < 3]);

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
          number={formatNumber(currentData?.length)}
          text="Total Published"
          icon={recentPublished}
        />
        <AdminCard
          number={formatNumber(approved?.length)}
          text="Approved Post"
          icon={approvedPost}
        />

        <AdminCard
          number={formatNumber(rejected)}
          text="Rejected Post"
          icon={rejectedPost}
        />
      </div>
      <div className="activity mt-5  mb-5 p-4 border bg-white rounded-lg">
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
          </div>
        ) : (
          <>
            <div className="posts p-3 mt-5 grid gap-2">
              {currentPage?.map((res) =>
                res.status === "Approved" ? (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res.title}
                    name={res.user_name}
                    rejcetButtonText="Reject"
                    loading={buttonLoading}
                    id={res.id}
                    selectedId={selectedId}
                    message="Are you sure you want to reject this post"
                    approveFunction={() =>
                      rejectContent({
                        forum_chat_id: res.id,
                        user_id: res.user_id,
                        user_role: res.user_role,
                      })
                    }
                  />
                ) : (
                  <AdminDashboardCard
                    key={res.id}
                    time={moment(res.date).utc().fromNow()}
                    title={res.title}
                    name={res.user_name}
                    approveButtonText="Approve"
                    message="Are you sure you want to accept this post"
                    loading={buttonLoading}
                    id={res.id}
                    selectedId={selectedId}
                    approveFunction={() =>
                      approveContent({
                        forum_chat_id: res.id,
                        user_id: res.user_id,
                        user_role: res.user_role,
                      })
                    }
                  />
                )
              )}
            </div>
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
