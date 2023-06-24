import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

export default function OnboardVetPersonal() {
  const [ingredients, setIngredients] = useState([]);
  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };
  return (
    <div className="login flex justify-center items-center h-[170vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          Create Account
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
          Create a new account to become a user or a veterinarians on vet konect
          by clicking on one of the cards below
        </div>
        <div className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly">
            <div className="step1 w-[40px] text-[12px] text-center ]">
              <img src={accountlIcon} alt="" />
              <p className="text-green-800 font-bold">Account Details</p>
            </div>
            <img src={arrow} alt="" />
            <div className="step1 w-[40px] text-[12px] text-center">
              <img className="greenOverlay" src={personalIcon} alt="" />
              <p className="text-green-800 font-bold">Personal Info</p>
            </div>
            <img src={arrow} alt="" />

            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={verifyIcon} alt="" />
              <p>Verify Account </p>
            </div>
          </div>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Vet Number (VCN)</label>
          </span>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">First Name</label>
          </span>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Last Name</label>
          </span>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Specialty</label>
          </span>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Phone No.</label>
          </span>
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Address</label>
          </span>
          <div className="checkbox-group flex items-center">
            <Checkbox
              inputId="ingredient1"
              name="pizza"
              className="ml-3"
              value="Cheese"
              onChange={onIngredientsChange}
              checked={ingredients.includes("Cheese")}
            />
            <label
              htmlFor="ingredient1"
              className=" text-gray-500 ml-5 lg:w-[75%] text-sm lg:text-[.95rem]"
            >
              Confirm that you agree to our terms and conditions at Vet Konect
            </label>
          </div>
          <Link to="/onboard-verify" className="green__btn">
            Proceed
          </Link>
          <Link to="/onboard-animal-owner-account" className="tertiary__btn">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
