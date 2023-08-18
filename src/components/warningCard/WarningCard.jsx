import { useState } from "react";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { Dialog } from "primereact/dialog";
import { reloadStore } from "../../atom/reloadAtom";
import { useRecoilState } from "recoil";

export default function WarningCard({ message, header, acceptFunction }) {
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useRecoilState(reloadStore);

  const openModal = () => {
    setVisible(!visible);
  };

  const accept = () => {
    acceptFunction()
    openModal()
    setReload(!reload)
  }
  return (
    <div>
      <Dialog
        visible={visible}
        draggable={false}
        header={header}
        className=" w-[95%] md:w-[70%] lg:w-[30%]"
        onHide={() => setVisible(false)}
      >
        <div className="">
          <div className="warning mb-5">
            <i className="pi pi-exclamation-triangle !text-[30px] !flex !items-center !justify-center !mb-5 text-red-600 "></i>
            <p className="mt-5 text-center py-3">{message}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="border border-green-600 p-3 rounded px-4 text-sm flex items-center gap-2 text-green-700 "
              onClick={accept}
            >
              <i className="pi pi-check"></i>Yes, Proceed
            </button>
            <button
              className="border border-green-600 p-3 rounded px-4 text-sm flex items-center gap-2 text-green-700"
              onClick={openModal}
            >
              <i className="pi pi-times"></i>No, Cancel
            </button>
          </div>
        </div>
      </Dialog>
      <img
        src={deleteIcon}
        alt=""
        className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
        onClick={openModal}
      />
    </div>
  );
}
