/* eslint-disable no-unused-vars */
import editIcon from "../../assets/account/edit-icon.svg";
import callIcon from "../../assets/icons/phone-icon.svg";
import messageIcon from "../../assets/icons/message-icon.svg";
import markerIcon from "../../assets/icons/location-icon.svg";
import handIcon from "../../assets/account/hand-icon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { user } from "../../atom/userAtom";
import { getUserById } from "../../utils/userApiService";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export default function Account() {
  const [userData, setUserData] = useState();
  const [userDetails, setUserDetails] = useState();
  const [openDetail, setOpenDetail] = useState(null);
  const location = useNavigate();
  const params = useParams();

  let payload;
  if (userData) {
    payload = {
      id: userData.id,
      role: userData.role,
    };
  } else {
    let role;
    if (window.location.pathname.split("/")[1].includes("vet")) {
      role = "Veterinarian";
    }
    else{
      role = 'Animal Owner'
    }
    payload = {
      id: params.id,
      role: role,
    };
  }

  const getUser = () => {
    getUserById(payload).then((res) => {
      setUserDetails(res);
      setUserData({
        ...userData,
        ...res,
      });
    });
  };

  const setData = (data, type) => {
    const payload = [data, type];
    setOpenDetail(payload);
  };

  const checker = (route) => {
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  useEffect(() => getUser, []);

  return (
    <div className=" bg-white h-[110vh] mb-10  rounded-md border-[1px] border-[#EBEBEB]">
      <div className="top bg-account h-[25vh] p-3 lg:p-10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer"></div>
          {userData?.id ? (
            <Link
              onClick={() => checker("account-details")}
              className=" flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer"
            >
              Edit
              <img
                src={editIcon}
                alt=""
                className="p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-[-6vh]">
        {userData?.profile_picture && userData?.profile_picture.length > 64 ? (
          <img
            src={userData?.profile_picture}
            alt=""
            className=" rounded-full border-[4px] h-[150px] w-[150px] object-cover border-green-400"
          />
        ) : (
          <i className="pi pi-user !text-[40px] p-10 bg-white border-[4px] rounded-full border-green-400"></i>
        )}
      </div>
      <div className="name text-[1.25rem] pt-1 text-center font-bold">
        {userData?.first_name} {userData?.last_name}
      </div>

      <div className=" text-[.82rem] flex items-center gap-7 justify-center mt-2">
        <a
          className="flex flex-col items-center justify-center "
          onClick={() => setData(userData?.phone_number, "Phone Number")}
        >
          <img
            src={callIcon}
            alt=""
            className=" p-2 mb-2 h-[40px] w-[40px] bg-white rounded-full border-[1px] border-[#828282] hover:border-green-400 hover:bg-green-100 cursor-pointer"
          />
          Call
        </a>
        <a
          className="flex flex-col items-center justify-center"
          onClick={() => setData(userData?.email, "Email")}
        >
          <img
            src={messageIcon}
            alt=""
            className=" p-2 mb-2 h-[40px] w-[40px] bg-white rounded-full border-[1px] border-[#828282] hover:border-green-400 hover:bg-green-100 cursor-pointer"
          />
          Email
        </a>
        <div
          className="flex flex-col items-center justify-center"
          onClick={() => setData(userData?.address, "Location")}
        >
          <img
            src={markerIcon}
            alt=""
            className=" p-2 mb-2 h-[40px] w-[40px] bg-white rounded-full border-[1px] border-[#828282] hover:border-green-400 hover:bg-green-100 cursor-pointer"
          />
          Location
        </div>
      </div>

      {openDetail ? (
        <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[15vh]">
          <h4 className=" font-bold pt-3">Users’ {openDetail[1]}</h4>
          <p className="text-sm text-center text-[#666666]">{openDetail[0]}</p>
          <CopyToClipboard
            text={openDetail[0]}
            onCopy={() => toast.success("Copied")}
          >
            <div className="p-4 border rounded-full bg-white shadow-lg mt-4 cursor-pointer hover:border-green-400">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                className="h-8 w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.66732 3.33203C8.12022 3.33203 6.63649 3.94661 5.54253 5.04058C4.44857 6.13454 3.83398 7.61827 3.83398 9.16536V24.9987C3.83398 26.5458 4.44857 28.0295 5.54253 29.1235C6.63649 30.2175 8.12022 30.832 9.66732 30.832H10.5007V31.6654C10.5007 32.9914 11.0274 34.2632 11.9651 35.2009C12.9028 36.1386 14.1746 36.6654 15.5007 36.6654H32.1673C33.4934 36.6654 34.7652 36.1386 35.7029 35.2009C36.6405 34.2632 37.1673 32.9914 37.1673 31.6654V14.9987C37.1673 13.6726 36.6405 12.4008 35.7029 11.4632C34.7652 10.5255 33.4934 9.9987 32.1673 9.9987H31.334V9.16536C31.334 7.61827 30.7194 6.13454 29.6254 5.04058C28.5315 3.94661 27.0477 3.33203 25.5007 3.33203H9.66732ZM29.6673 9.9987V9.16536C29.6673 8.0603 29.2283 7.00049 28.4469 6.21909C27.6655 5.43768 26.6057 4.9987 25.5007 4.9987H9.66732C8.56225 4.9987 7.50244 5.43768 6.72104 6.21909C5.93964 7.00049 5.50065 8.0603 5.50065 9.16536V24.9987C5.50065 26.1038 5.93964 27.1636 6.72104 27.945C7.50244 28.7264 8.56225 29.1654 9.66732 29.1654H10.5007V14.9987C10.5007 13.6726 11.0274 12.4008 11.9651 11.4632C12.9028 10.5255 14.1746 9.9987 15.5007 9.9987H29.6673ZM15.5007 11.6654H32.1673C33.0514 11.6654 33.8992 12.0166 34.5243 12.6417C35.1495 13.2668 35.5007 14.1146 35.5007 14.9987V31.6654C35.5007 32.5494 35.1495 33.3973 34.5243 34.0224C33.8992 34.6475 33.0514 34.9987 32.1673 34.9987H15.5007C14.6166 34.9987 13.7688 34.6475 13.1436 34.0224C12.5185 33.3973 12.1673 32.5494 12.1673 31.6654V14.9987C12.1673 14.1146 12.5185 13.2668 13.1436 12.6417C13.7688 12.0166 14.6166 11.6654 15.5007 11.6654Z"
                  fill="black"
                />
              </svg>
            </div>
          </CopyToClipboard>
          <p className="text-xs mt-4">Click to copy</p>
        </div>
      ) : (
        <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[15vh]">
          <img src={handIcon} alt="" className=" w-[30px]" />
          <h4 className=" font-bold pt-3">Hey! Users</h4>
          <p className="text-sm text-center text-[#666666]">
            Kindly click any of your choice from the icon button above to
            connect with this user
          </p>
        </div>
      )}
    </div>
  );
}
