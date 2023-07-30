import { useState } from "react";
import PromoCard from "../../components/promoCard/PromoCard";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";

export default function Promotion() {
  const [specialty, setSpecialty] = useState(null);
  const [file, setFile] = useState(null);
  const [plan, setPlan] = useState("weekly");
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
    <div className=" flex flex-wrap gap-6">
      <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full lg:w-[58%]">
        <div className="flex items-center gap-6">
          <h2 className="text-[1rem] lg:text-[1.3rem] cursor-pointer font-black">
            Ads Promotions
          </h2>
        </div>
        <div className="flex items-center justify-center gap-2 text-[.8rem] bg-[#F1FFF4] border border-[#B3FFC4] rounded p-3 mt-4 mb-4 ">
          <div className="available "></div>
          Active - ( Till Jun 20, 2023)
        </div>
        <div className="promo flex flex-wrap gap-4">
          <PromoCard available={true} />
          <PromoCard available={true} />
          <PromoCard available={true} />
          <PromoCard available={true} />
        </div>
        <div className="flex items-center justify-center gap-2 text-[.8rem] bg-[#FFE7E7] border border-[#FF9999] rounded p-3 mt-4 mb-4 ">
          <div className="unavailable "></div>
          Expired - (On Jan 30, 2023) (Renew Ads Promotion)
        </div>
        <div className="promo flex flex-wrap gap-4">
          <PromoCard />
          <PromoCard />
        </div>
      </div>
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
              <div className="group flex flex-wrap gap-2">
                <div className="left w-full lg:w-[40%] border p-4 rounded-lg">
                  <div className="text-center">Free Trial Plan</div>
                  <div className="mt-3">
                    <div
                      className={
                        plan === "weekly"
                          ? "bg-gray-100 p-2 border rounded-full text-center font-bold text-sm cursor-pointer"
                          : "p-2 rounded-full text-center cursor-pointer text-sm"
                      }
                      onClick={() => setPlan("weekly")}
                    >
                      Weekly Plan
                    </div>
                    <div
                      className={
                        plan === "monthly"
                          ? "bg-gray-100 p-2 border rounded-full text-center font-bold  text-sm cursor-pointer"
                          : "p-2 rounded-full text-center cursor-pointer text-sm"
                      }
                      onClick={() => setPlan("monthly")}
                    >
                      Monthly Plan
                    </div>
                    <div
                      className={
                        plan === "yearly"
                          ? "bg-gray-100 p-2 border rounded-full text-center font-bold  text-sm cursor-pointer"
                          : "p-2 rounded-full text-center cursor-pointer text-sm"
                      }
                      onClick={() => setPlan("yearly")}
                    >
                      Yearly Plan
                    </div>
                  </div>
                </div>
                <div className="right w-full lg:w-[56%] border rounded-lg">
                  <div className="p-4 ">
                    <div className="font-black text-center">
                      Weekly (7 Days)
                    </div>
                    <div className="text-center">(3 Products Max)</div>
                    <div className=" flex items-center justify-between mt-3">
                      <div className="number p-3 border h-[40px] w-[40px] rounded-lg flex items-center justify-center">
                        1
                      </div>
                      <div className="number p-3 border h-[40px] w-[40px] bg-gray-100 rounded-lg flex items-center justify-center">
                        2
                      </div>
                      <div className="number p-3 border h-[40px] w-[40px] rounded-lg flex items-center justify-center">
                        3
                      </div>
                      <div className="number p-3 border h-[40px] w-[40px] rounded-lg flex items-center justify-center">
                        4
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <small>Pricing</small>
                      <small> (VAT Inclusive)</small>
                      <p className=""> $0.99 x 2 = 2.00</p>
                      <h2 className="font-black text-3xl"> $2.00 </h2>
                    </div>
                  </div>
                  <div className="p-4 bg-green-800 text-center text-white text-sm font-bold rounded-b-lg"> SELECT PLAN</div>
                </div>
              </div>
              <button className="green__btn" disabled>Promote Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
