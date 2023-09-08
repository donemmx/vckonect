import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import { addCase } from "../../utils/vetApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addFarmCase, addPetCase } from "../../validations/UserValidation";

export default function AddCase() {
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const action = useRecoilValue(actionState);
  const [gender, setGender] = useState(null);
  const [type, setType] = useState("Pet");
  const [selectedPet, setSelectedPet] = useState(null);

  const types = ["Pet", "Farm"];
  const genders = ["Male", "Female"];
  const species = ["Dog", "Cat", "Pig", "Sheep"];

  const onSubmit = async (values) => {
    console.log(values);
    // Object.entries(payload).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    // await addCase(formData)
    //   .then((res) => {
    //     if (!res.code) {
    //       window.history.back();
    //       if (action && action === "edit") {
    //         toast.success("Add cases edited successfully");
    //       } else {
    //         toast.success("Cases added successfully");
    //       }
    //       setStore(null);
    //     } else {
    //       toast.error(res.detail);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const initialValuesPet = {
    client_name: "",
    client_phone: "",
    pet_name: "",
    specie: "",
    breed: "",
    age: "",
    sex: "",
    case_title: "",
  };

  const initialValuesFarm = {
    client_name: "",
    client_phone: "",
    age: "",
    sex: "",
    farm_name: "",
    details: "",
    date_of_occurence: "",
    history: "",
    clinical_sign: "",
    motality: "",
    mobile_veterinarian: "",
    treatment_regiment: "",
    clinic_physical_address: "",
    lab_confirm: "",
    disease_diagnostic: "",
    differential_diagnosis: "",
    tentative_diagnoistic: "",
  };

  // const loadedData = {
  //   caseTitle: store?.case_title,
  //   clientName: store?.client_name,
  //   caseType: store?.case_type,
  //   petName: store?.pet_name,
  //   breed: store?.breed,
  //   specie: store?.specie,
  //   age: store?.age,
  // };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: type === "Pet" ? initialValuesPet : initialValuesFarm,
    validationSchema: type === "Pet" ? addPetCase : addFarmCase,
    onSubmit,
  });

  return (
    <div className=" bg-white h-full pb-20  mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/vet-cases"
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
          <form
            onSubmit={handleSubmit}
            className="form flex flex-col gap-3 pt-6"
          >
            <span className="p-float-label">
              <InputText
                id="username"
                name="case_title"
                value={values.case_title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Case Title</label>
            </span>
            {errors.case_title && touched.case_title && (
              <p className="error">{errors.case_title}</p>
            )}

            <span className="p-float-label">
              <InputText
                id="username"
                name="client_name"
                value={values.client_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Client Name </label>
            </span>
            {errors.client_name && touched.client_name && (
              <p className="error">{errors.client_name}</p>
            )}

            <span className="p-float-label">
              <InputText
                id="username"
                name="client_phone"
                value={values.client_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Client Phone Number </label>
            </span>
            {errors.client_phone && touched.client_phone && (
              <p className="error">{errors.client_phone}</p>
            )}
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
                  <InputText
                    id="username"
                    name="pet_name"
                    value={values.pet_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Pet Name </label>
                </span>
                {errors.pet_name && touched.pet_name && (
                  <p className="error">{errors.pet_name}</p>
                )}

                <span className="p-float-label">
                  <Dropdown
                    name="specie"
                    value={values.specie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={species}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username">Specie </label>
                </span>
                {errors.specie && touched.specie && (
                  <p className="error">{errors.specie}</p>
                )}

                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="breed"
                    value={values.breed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Breed </label>
                </span>
                {errors.breed && touched.breed && (
                  <p className="error">{errors.breed}</p>
                )}

                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Age </label>
                </span>
                {errors.age && touched.age && (
                  <p className="error">{errors.age}</p>
                )}
                <span className="p-float-label">
                  <Dropdown
                    value={values.sex}
                    name="sex"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={genders}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username"> Sex</label>
                </span>
                {errors.sex && touched.sex && (
                  <p className="error">{errors.sex}</p>
                )}
              </>
            ) : (
              ""
            )}
            {type === "Farm" ? (
              <>
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="farm_name"
                    value={values.farm_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Farm Name</label>
                </span>

                {/* <span className="p-float-label"> */}
                {/* <InputText id="username"
                  id=""
                  name="pet_name"
                  value={values}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  /> */}
                {/* <label htmlFor="username">Type of Livestock </label> */}
                {/* </span> */}
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Age </label>
                </span>
                {errors.age && touched.age && (
                  <p className="error">{errors.age}</p>
                )}
                <span className="p-float-label">
                  <Dropdown
                    value={values.sex}
                    name="sex"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={genders}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username"> Sex</label>
                </span>
                {errors.sex && touched.sex && (
                  <p className="error">{errors.sex}</p>
                )}
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Other Details </label>
                </span>
              </>
            ) : (
              ""
            )}
            <button
              className="green__btn"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <i className="pi pi-spin pi-spinner !text-[20px]"></i>
              ) : (
                ""
              )}
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
