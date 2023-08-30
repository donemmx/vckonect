import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { useEffect, useState } from "react";
import PromoCard from "../../components/promoCard/PromoCard";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";

export default function AddPromotionToSub() {
    const [specialty, setSpecialty] = useState(null);
    const [file, setFile] = useState(null);
    const [avialability, setAvailability] = useState(false);
    const [agree, setAgree] = useState(false);
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
  
    const onChange = () => {
      setAgree(!agree);
    };
  return (
    <div>
           <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full lg:w-[38%]">
        <div className="flex items-center gap-6">
          <div className="w-full">
            <h2 className="title font-black  head__two">Ads Promotion</h2>
            <div className="pt-2 subtitle paragraph ">
              You can add a new promotion to your list
            </div>
            <div className="form flex flex-col gap-3 pt-6">
              <h3 className="font-bold mt-5">Product Details</h3>
              <span className="p-float-label">
                <Dropdown
                  value={specialty}
                  onChange={(e) => setSpecialty(e.value)}
                  options={Specialties}
                  placeholder="Select Product"
                  className="w-full md:w-20rem"
                />
                <label htmlFor="livestock">Select Product :</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Title or Product ID</label>
              </span>

              <span className="p-float-label">
                <Dropdown
                  value={specialty}
                  onChange={(e) => setSpecialty(e.value)}
                  options={Specialties}
                  placeholder="Product Category"
                  className="w-full md:w-20rem"
                />
                <label htmlFor="username">Product Category :</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Description</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Tags : </label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">
                  Location - Eg: Lagos, Nigeria :{" "}
                </label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Price - $00.00 : </label>
              </span>
              <div className=" flex items-center justify-between p-2 h-[60px]">
                Availability Status - {avialability ? "Open" : "Closed"}
                <InputSwitch
                  checked={avialability}
                  onChange={(e) => setAvailability(e.value)}
                />
              </div>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Availabile Units - 20 : </label>
              </span>

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

              <div className="checkbox-group flex items-center mt-4">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  className="ml-3"
                  value="Cheese"
                  onChange={onChange}
                  checked={agree}
                />
                <label
                  htmlFor="ingredient1"
                  className=" text-gray-500 ml-5 lg:w-[75%] text-sm lg:text-[.85rem]"
                >
                  Confirm that you agree to our terms and conditions at Vet
                  Konect
                </label>
              </div>

            
              <button className="green__btn" disabled>
                Promote Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
