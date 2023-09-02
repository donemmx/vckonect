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
import { addPetCase } from "../../validations/UserValidation";

export default function AddCase() {
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const action = useRecoilValue(actionState);
  const [gender, setGender] = useState(null);
  const [type, setType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const types = ["Pet", "Farm"];
  const genders = ["Male", "Female"];
  const species = ["Dog", "Cat", "Pig", "Sheep"];

  const onSubmit = async (values) => {
    const formData = new FormData();
    const { case_title, date_of_occurence, age } = values;
    let payload;
    // if (action && action === "edit") {
    //   payload = {
    //     user_id: store?.user_id,
    //     case_title: 
    //     pet_name: petName,
    //     specie: specie,
    //     breed: breed,
    //     sex: gender,
    //     pet_id: store?.pet_id,
    //     age: age,
    //   };
    // } else {
    //   payload = {
    //     user_id: userData.id,
    //     pet_name: petName,
    //     specie: specie,
    //     breed: breed,
    //     sex: gender,
    //     age: age,
    //   };
    // }
    payload = {
          user_id: userData?.user_id,
          case_title: case_title,
          pet_name: selectedPet.pet_name,
          pet_id: selectedPet.pet_id,
          specie: selectedPet.specie,
          breed: selectedPet.breed,
          age: selectedPet.age,
          sex: selectedPet.age,
          date_of_occurence: date_of_occurence,
          history: '',
          clinical_sign: '',
          tentative_diagnoistic: '',
          differential_diagnosis:'',
          disease_diagnostic: '',
          lab_confirm: '',
          motality: '',
          treatment_regiment: '',
          clinic_physical_address: '',
          mobile_veterinarian: '',
        };

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(payload);

    await addCase(formData)
      .then((res) => {
        if (!res.code) {
          window.history.back();
          if (action && action === "edit") {
            toast.success("Add cases edited successfully");
          } else {
            toast.success("Cases added successfully");
          }
          setStore(null);
        } else {
          toast.error(res.detail);
        }
      })
      .catch((err) => console.log(err));
  };

  const initialValues = {
    caseTitle: "",
    clientName: "",
    caseType: "",
    petName: "",
    specie: "",
    breed: "",
    age: "",
  };

  const loadedData = {
    caseTitle: store?.case_title,
    clientName: store?.client_name,
    caseType: store?.case_type,
    petName: store?.pet_name,
    breed: store?.breed,
    specie: store?.specie,
    age: store?.age,
  };

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
    initialValues: action === "add" ? initialValues : loadedData,
    validationSchema: addPetCase,
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
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText
                id="username"
                name="caseTitle"
                value={values.caseTitle}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Case Title</label>
            </span>
            {errors.caseTitle && touched.caseTitle && (
              <p className="error">{errors.caseTitle}</p>
            )}

            <span className="p-float-label">
              <InputText
                id="username"
                name="clientName"
                value={values.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Client Name </label>
            </span>
            {errors.clientName && touched.clientName && (
              <p className="error">{errors.clientName}</p>
            )}

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
                  <InputText
                    id="username"
                    name="petName"
                    value={values.petName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username">Pet Name </label>
                </span>
                {errors.petName && touched.petName && (
                  <p className="error">{errors.petName}</p>
                )}

                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="specie"
                    value={values.specie}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    value={gender}
                    onChange={(e) => setGender(e.value)}
                    options={genders}
                    placeholder="Select Pet or Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username"> Sex</label>
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
