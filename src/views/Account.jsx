import editIcon from "../assets/account/edit-icon.svg";
export default function Account() {
  return (
    <div className=" bg-white h-[90vh] mb-10  rounded-md border-[1px] border-[#EBEBEB]">
      <div className="top bg-account h-[25vh] p-3 lg:p-10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] bg-white rounded-full"></i>
            Back
          </div>
          <div className=" flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer">
            Edit
            <img
              src={editIcon}
              alt=""
              className="p-1 lg:p-3 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] bg-white rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
