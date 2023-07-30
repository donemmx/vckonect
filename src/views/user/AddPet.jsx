import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddPet() {
  const [specialty, setSpecialty] = useState(null);
  const [gender, setGender] = useState(null);
  const [file, setFile] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const Specialties = [
    "Small Animal Medicine",
    "Avian Medicine",
    "Ruminant medicine",
    "Wildlife medicine",
  ];
  const Genders = ["Male", "Female"];

  return (
    <div className=" bg-white h-full pb-20  mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/livestock"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Pet Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new pet to your pet list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Name of Pet (Required)</label>
            </span>
            <span className="p-float-label">
              <Dropdown
                value={specialty}
                onChange={(e) => setSpecialty(e.value)}
                options={Specialties}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />
              <label htmlFor="livestock">Specie (Required) :</label>
            </span>
            <span className="p-float-label">
              <Dropdown
                value={specialty}
                onChange={(e) => setSpecialty(e.value)}
                options={Specialties}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Breed (Required) :</label>
            </span>
            <span className="p-float-label">
              <Dropdown
                value={gender}
                onChange={(e) => setGender(e.value)}
                options={Genders}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Sex (Required) : </label>
            </span>
            <span className="p-float-label">
              <InputText id="username" />
              <label htmlFor="username">Age (Required) : </label>
            </span>
      
            {file !== null ? (
                <>
              <img
                src={file}
                className="h-[200px] w-full object-cover border-[1px] rounded-md"
              />
              <div className="underline cursor-pointer" onClick={()=> setFile(null)}>Remove Image</div>
                </>
            ) : (
                <input
                type="file"
                onChange={handleChange}
              />
            )}

            <button className="green__btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
