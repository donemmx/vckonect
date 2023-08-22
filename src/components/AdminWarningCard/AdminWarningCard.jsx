import { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function AdminWarningCard({
  message,
  header,
  acceptFunction,
  rejcetButtonText,
  approveButtonText,
  loading,
}) {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(!visible);
  };

  const accept = async () => {
    openModal();
    acceptFunction();
  };

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
              className="border border-green-600 p-3 rounded px-4 text-sm flex items-center gap-2 text-green-700 hover:bg-green-700 hover:text-white "
              onClick={accept}
            >
              <i className="pi pi-check"></i>Yes, Proceed
            </button>
            <button
              className="border border-green-600 p-3 rounded px-4 text-sm flex items-center gap-2 text-green-700 hover:bg-green-700 hover:text-white"
              onClick={openModal}
            >
              <i className="pi pi-times"></i>No, Cancel
            </button>
          </div>
        </div>
      </Dialog>
      <div className="flex items-center gap-2">
        {approveButtonText ? (
          <button
            className=" border flex items-center gap-2 justify-center rounded-full w-[100px] h-[30px] text-green-800 bg-green-50 border-green-400 text-xs"
            onClick={openModal}
            disabled={loading}
          >
            {loading ? <i className="pi pi-spin pi-spinner !text-sm"></i> : ""}
            {approveButtonText}
          </button>
        ) : (
          ""
        )}
        {rejcetButtonText ? (
          <button
            className=" border flex items-center gap-2 justify-center rounded-full w-[100px] h-[30px] text-red-700 bg-red-50 border-red-400 text-xs"
            onClick={openModal}
            disabled={loading}
          >
            {loading ? <i className="pi pi-spin pi-spinner !text-sm"></i> : ""}
            {rejcetButtonText}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
