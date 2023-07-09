import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputSwitch } from "primereact/inputswitch";

export default function AddStore() {
  const [file, setFile] = useState(null);
  const [avialability, setAvailability] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className=" bg-white h-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/stores"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Store Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new store to your store list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Store Name :</label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="livestock">Email (Required) :</label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Clinic Phone No (Required) :</label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Location (Required) : </label>
            </span>
            <div className=" flex items-center justify-between p-2 h-[60px]">
            Availability Status - {avialability ? 'Open' : 'Closed'}
              <InputSwitch
                checked={avialability}
                onChange={(e) => setAvailability(e.value)}
              />
            </div>
            {file !== null ? (
              <>
                <img
                  src={file}
                  className="h-[200px] w-full object-cover border-[1px] rounded-md"
                />
                <div
                  className="underline cursor-pointer"
                  onClick={() => setFile(null)}
                >
                  Remove Image
                </div>
              </>
            ) : (
              <input type="file" onChange={handleChange} />
            )}

            <button className="green__btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
