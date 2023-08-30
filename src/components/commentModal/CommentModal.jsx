/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useRecoilState } from "recoil";
import { reloadStore } from "../../atom/reloadAtom";
import { Dialog } from "primereact/dialog";
import commentsIcon from "../../assets/icons/comments-icon.svg";

export default function CommentModal({ header, acceptFunction }) {
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useRecoilState(reloadStore);
  const [comment, setComment] = useState([]);

  const openModal = () => {
    setVisible(!visible);
  };

  const accept = () => {
    acceptFunction();
    openModal();
    setReload(!reload);
  };

  return (
    <div>
      <Dialog
        visible={visible}
        className=" w-[95%] md:w-[70%] lg:w-[50%]"
        onHide={() => setVisible(false)}
      >
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
         className="bg-green-800 p-2 w-full mt-2 rounded text-white flex items-center justify-center gap-4"
          onClick={accept}>
            <i className="pi pi-send"></i>Submit
          </button>
        </div>
      </Dialog>
      
      <img
                src={commentsIcon}
                alt=""
                className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] border-[#EBEBEB] shadow"
              />
    </div>
  );
}
