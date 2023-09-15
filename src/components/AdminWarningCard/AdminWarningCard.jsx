import { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function AdminWarningCard({
  message,
  header,
  acceptFunction,
  rejcetButtonText,
  approveButtonText,
  loading,
  id,
  vet,
  selectedId,
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
        {vet === "Not Verified" ? (
          <>
            <button className=" border flex items-center gap-2 justify-center rounded-full w-[110px] h-[30px] text-green-800 bg-green-50 border-green-400 text-xs">
              Verify Vet No.
            </button>
          </>
        ) : vet === "Verified" ? (
          <>
            <div className=" flex items-center gap-2 justify-center rounded-full w-[110px] h-[30px] text-green-800  text-xs">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3799 22.5944C17.7028 25.5922 6.22115 25.5922 2.61904 22.5944C-1.0581 19.5965 -0.682889 6.78086 2.61904 3.40832C5.92097 0.0357696 18.078 0.0357696 21.3799 3.40832C24.6819 6.78086 25.0571 19.5966 21.3799 22.5944Z"
                  fill="#52CE06"
                />
                <g opacity="0.2">
                  <path
                    d="M12.0636 17.3486C8.76166 19.9717 5.08452 21.3207 1.63253 21.3957C-0.918974 17.0488 -0.393645 6.48152 2.6081 3.40877C5.30967 0.635794 13.7896 0.111152 18.6674 1.83489C19.8681 6.78131 17.3917 13.0767 12.0636 17.3486Z"
                    fill="white"
                  />
                </g>
                <path
                  d="M10.283 19.523C9.75769 19.523 9.23241 19.2981 8.93223 18.8485L4.72982 13.4524C4.12946 12.703 4.27957 11.6537 5.03 11.0542C5.78042 10.4546 6.83102 10.6045 7.43138 11.354L10.283 15.0263L16.5867 6.85724C17.1871 6.1078 18.2377 5.95788 18.9881 6.55746C19.7385 7.15703 19.8886 8.20626 19.2883 8.95571L11.6338 18.8485C11.2586 19.2232 10.8083 19.523 10.283 19.523Z"
                  fill="white"
                />
              </svg>
              Verified
            </div>
          </>
        ) : (
          ""
        )}
        {approveButtonText ? (
          <button
            className=" border flex items-center gap-2 justify-center rounded-full w-[100px] h-[30px] text-green-800 bg-green-50 border-green-400 text-xs"
            onClick={openModal}
            disabled={id === selectedId && loading}
          >
            {id === selectedId && loading ? (
              <i className="pi pi-spin pi-spinner !text-sm"></i>
            ) : (
              ""
            )}
            {approveButtonText}
          </button>
        ) : (
          ""
        )}
        {rejcetButtonText ? (
          <button
            className=" border flex items-center gap-2 justify-center rounded-full w-[100px] h-[30px] text-red-700 bg-red-50 border-red-400 text-xs"
            onClick={openModal}
            disabled={id === selectedId && loading}
          >
            {id === selectedId && loading ? (
              <i className="pi pi-spin pi-spinner !text-sm"></i>
            ) : (
              ""
            )}
            {rejcetButtonText}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
