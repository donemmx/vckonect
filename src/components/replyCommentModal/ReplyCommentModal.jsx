import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { replyForumChatComment } from "../../utils/userApiService";
import { toast } from "react-toastify";
import { user } from "../../atom/userAtom";
import { reloadStore } from "../../atom/reloadAtom";

export default function ReplyCommentModal({ fulldata }) {
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useRecoilState(reloadStore);
  const [comment, setComment] = useState([]);
  const userData = useRecoilValue(user);

  const openModal = () => {
    setVisible(!visible);
  };

  const accept = () => {
    const payload = {
      user_id: userData?.id,
      user_role: userData?.role,
      comment_id: fulldata.id,
      response: comment,
    };
    replyForumChatComment(payload).then(() => {
      toast.success("Message sent succesfully");
    });
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
            onClick={accept}
          >
            <i className="pi pi-send"></i>Submit
          </button>
        </div>
      </Dialog>

      <div className="flex gap-3 hover:bg-green-100 cursor-pointer items-center justify-center rounded-full  p-1.5 px-3 bg-gray-50 text-gray-600 border hover:text-green-600" onClick={openModal}>
        <i className="pi pi-comments flex !text-sm "></i>
        <p className="text-xs "> reply </p>
      </div>
    </div>
  );
}
