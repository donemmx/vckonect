import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { user } from "../../atom/userAtom";

export default function AccountDetails() {
  const [specialty, setSpecialty] = useState(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useRecoilState(user);
  const location = useNavigate()

  const Specialties = [
    "Small Animal Medicine",
    "Avian Medicine",
    "Ruminant medicine",
    "Wildlife medicine",
  ];


  const checker = (route) => {
    if (userData?.role === "Veternarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  return (
    <div className=" bg-white h-[140vh] mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        onClick={() => checker("account")}
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Account Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can update your profile information by filling the field below
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Email Address (Required)</label>
            </span>
            <span className="p-float-label">
              <MultiSelect
                value={specialty}
                onChange={(e) => setSpecialty(e.value)}
                options={Specialties}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />
              <label htmlFor="livestock">Specialty (Required): </label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">First Name (Required)</label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Last Name (Required): </label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Phone No. (Required): </label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Address (Required): </label>
            </span>
            { open ?
              <>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Password (Required): </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Change Password (Required): </label>
                </span>
              </>
              : ''
            }

           { !open ? <button className="green__btn" onClick={() => setOpen(!open)}>
              Change Password
            </button> : ''}
            <button className="green__btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
