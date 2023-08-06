import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddCase() {
  const types = ["Pet", "Farm"];
  const genders = ["Male", "Female"];
  const [type, setType] = useState(null);
  const [gender, setGender] = useState(null);

  return (
    <div className=" bg-white h-full pb-20  mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/cases"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Case Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new case to your case list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Case Title</label>
            </span>

            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Client Name </label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Client Phone Number </label>
            </span>
            <span className="p-float-label">
              <Dropdown
                value={type}
                onChange={(e) => setType(e.value)}
                options={types}
                placeholder="Select Pet or Farm"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Select Pet or Farm </label>
            </span>
            {type === "Pet" ? (
              <>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Pet Name</label>
                </span>

                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Specie </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Breed </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Age (years)</label>
                </span>
                <span className="p-float-label">
                  <Dropdown
                    value={gender}
                    onChange={(e) => setGender(e.value)}
                    options={genders}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username"> Sex</label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Pet Number </label>
                </span>
         
              </>
            ) : (
              ""
            )}
            {type === "Farm" ? (
              <>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Farm Name</label>
                </span>

                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Type of Livestock </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Number of Livestock </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Number of Workers</label>
                </span>

                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Age </label>
                </span>
                <span className="p-float-label">
                  <Dropdown
                    value={gender}
                    onChange={(e) => setGender(e.value)}
                    options={genders}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username">Sex </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Location </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Other Details </label>
                </span>
              </>
            ) : (
              ""
            )}
            <button className="green__btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}