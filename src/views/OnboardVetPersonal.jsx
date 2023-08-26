import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { registerVeterinarian2 } from "../utils/vetApiService";
import {  useRecoilValue } from "recoil";
import { registration } from "../atom/registrationAtom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { vetUser } from "../validations/UserValidation";
import { MultiSelect } from "primereact/multiselect";

export default function OnboardVetPersonal() {
  const [ingredients, setIngredients] = useState([]);
  const [speciality, setSpeciality] = useState([]);

  const specialities = [
    "Poultry" ,
    "Fish",
    "Pig",
    "Sheep"
 ];
  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  const regEmail = useRecoilValue(registration);
  const location = useNavigate();

  const onSubmit = async (values) => {

    const {firstName, lastName, vetNumber, country,state, ...others}  = values
    const payload = {
      stage: 2,
      email: regEmail,
      first_name: firstName,
      last_name: lastName,
      country: country,
      state: state,
      vet_number: vetNumber,
      speciality: speciality,
      ...others,
    };
    await registerVeterinarian2(payload)
      .then((res) => {
        if (!res.code) {
          location("/onboard-vet-verify");
          toast.success(res.detail);
        } else {
          toast.error(res.detail);
        }
      })
      .catch((err) => console.log(err));
  };

  const { values, errors, isValid, isSubmitting, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        vetNumber: "",
        firstName: "",
        lastName: "",
        phone_number: "",
        address: "",
        state: "",
        country: "",
      },
      validationSchema: vetUser,
      onSubmit,
    });
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
        <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-6">
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
            <InputText
              id="username"
              name="vetNumber"
              value={values.vetNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">Vet Number (VCN)</label>
          </span>
          {errors.vetNumber && touched.vetNumber && (
            <p className="error">{errors.vetNumber}</p>
          )}
          <span className="p-float-label">
            <InputText
              id="username"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">First Name</label>
          </span>
          {errors.firstName && touched.firstName && (
            <p className="error">{errors.firstName}</p>
          )}
          <span className="p-float-label">
            <InputText
              id="username"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">Last Name</label>
          </span>
          {errors.lastName && touched.lastName && (
            <p className="error">{errors.lastName}</p>
          )}
            <span className="p-float-label">
              <MultiSelect
                value={speciality}
                onChange={(e)=> setSpeciality(e.target.value)}
                options={specialities}
                placeholder="Select Speciality"
                className="w-full md:w-20rem"
              />

              <label htmlFor="username">Speciality (Required) : </label>
            </span>
          <span className="p-float-label">
            <InputText
              id="username"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">Phone No.</label>
          </span>
          {errors.phone_number && touched.phone_number && (
            <p className="error">{errors.phone_number}</p>
          )}
          <span className="p-float-label">
            <InputText
              id="username"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">Country</label>
          </span>
          {errors.country && touched.country && (
            <p className="error">{errors.country}</p>
          )}
          <span className="p-float-label">
            <InputText
              id="username"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">State</label>
          </span>
          {errors.state && touched.state && (
            <p className="error">{errors.state}</p>
          )}
          <span className="p-float-label">
            <InputText
              id="username"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">Address</label>
          </span>
          {errors.address && touched.address && (
            <p className="error">{errors.address}</p>
          )}
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
          <button className="green__btn"disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Proceed
          </button>
          <Link to="/onboard-vet-account" className="tertiary__btn">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
