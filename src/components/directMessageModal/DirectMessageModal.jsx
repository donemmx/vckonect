import { Dialog } from "primereact/dialog";
import chat from "../../assets/icons/chat-icon.svg";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { reloadStore } from "../../atom/reloadAtom";
import { directMessage, getUserById } from "../../utils/userApiService";
import { user } from "../../atom/userAtom";
import { toast } from "react-toastify";

export default function DirectMessageModal({ acceptFunction, fullData }) {
  const [comment, setComment] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useRecoilState(reloadStore);
  const userData = useRecoilValue(user);
  const openModal = () => {
    setVisible(!visible);
    const payload = {
      id: fullData?.user_id,
      role: fullData?.role,
    };
    getUserById(payload).then((res) => {
      setUserInfo(res);
    });
  };

  const accept = () => {
    acceptFunction();
    openModal();
    setReload(!reload);
  };

  const getFile =  (e) => {
    const formData = new FormData();

    setFile(e.target.files[0]);
    const type = e.target.files[0].type.split("/")[0];
    const payload = {
      type: type,
      sender_id: userData?.id,
      sender_role: userData?.role,
      receiver_id: fullData?.id,
      receiver_role: fullData?.role,
      content: e.target.files[0]
    };

    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

    directMessage(formData).then(()=> {
        toast.success('File uploaded successfully')
        openModal()
   })
  };

  return (
    <div>
      <img
        onClick={openModal}
        src={chat}
        alt=""
        className=" p-2 h-[35px] bg-white w-[35px] object-contain rounded-full shadow-md cursor-pointer"
      />
      <Dialog
        visible={visible}
        className=" w-[95%] md:w-[70%] lg:w-[40%]"
        onHide={() => setVisible(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={ userInfo?.profile_picture}
              alt=""
              className="h-[40px] w-[40px] rounded-full border-2 border-green-700"
            />
            <div className=" flex flex-col ">
              <div className="text-sm">
                {userInfo?.first_name + " " + userInfo?.last_name}
              </div>
              <small className=" font-light text-[11px]">
                {userInfo?.role}
              </small>
            </div>
          </div>
          <div className="p-2 border w-fit rounded-full bg-white shadow-xl">
            <label htmlFor="file-input">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 10V15C18 16.5913 17.3679 18.1174 16.2426 19.2426C15.1174 20.3679 13.5913 21 12 21C10.4087 21 8.88258 20.3679 7.75736 19.2426C6.63214 18.1174 6 16.5913 6 15V7C6 5.93913 6.42143 4.92172 7.17157 4.17157C7.92172 3.42143 8.93913 3 10 3V3C11.0609 3 12.0783 3.42143 12.8284 4.17157C13.5786 4.92172 14 5.93913 14 7V15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15V7"
                  stroke="#1D2432"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <input
              id="file-input"
              type="file"
              accept="audio/*,video/*,image/*"
              className="hidden"
              onChange={(e) => getFile(e)}
            />
          </div>
        </div>
        <div className="">
          <form className="pt-3">
            <label htmlFor="username"></label>
            <textarea
              name="content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              cols={5}
              className="!border !h-[160px] !border-gray-200 outline-none"
            ></textarea>
          </form>
          <button
            className="bg-green-800 p-3 w-full mt-2 rounded text-white flex items-center justify-center gap-4"
            onClick={accept}
          >
            <i className="pi pi-send"></i>Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
}
