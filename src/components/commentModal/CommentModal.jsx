import React, { useState } from "react";
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
              rows={10}
              cols={10}
              className="!border !border-gray-200 outline-none"
            ></textarea>
          </form>
          <button className="green__btn mt-2" onClick={accept}>
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
