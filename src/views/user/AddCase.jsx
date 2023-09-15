import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import { addCase } from "../../utils/vetApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addCaseValidation } from "../../validations/UserValidation";
import { getFarmByFilter, getPetByFilter } from "../../utils/userApiService";
import { Calendar } from 'primereact/calendar';
        
export default function AddCase() {
  const userData = useRecoilValue(user);
  const [store, setStore] = useRecoilState(storeData);
  const action = useRecoilValue(actionState);
  const [type, setType] = useState("Pet");
  const [pets, setPets] = useState([]);
  const [data, setData] = useState();
  const [farms, setFarms] = useState([]);

  const types = ["Pet", "Farm"];

  const onSubmit = async (values) => {
    console.log(values, data, type);
    const payload = {
      ...data,
      ...values,
      case_type: type,
      user_id: userData?.id,
      role: userData?.role
    }
    await addCase(payload)
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
    client_name: "",
    client_phone: "",
    case_title: "",
    details: "",
    clinical_sign: "",
    history: "",
    motality: "",
    mobile_veterinarian: "",
    date_of_occurence: "",
    treatment_regiment: "",
    clinic_physical_address: "",
    lab_confirm: "",
    disease_diagnostic: "",
    differential_diagnosis: "",
    tentative_diagnoistic: "",
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
    initialValues: initialValues,
    validationSchema: addCaseValidation,
    onSubmit,
  });

  const getAllPets = () => {
    getPetByFilter({ name: null }).then((res) => {
      setPets(res);
    });
  };

  const getAllFarms = () => {
    getFarmByFilter({ name: null }).then((res) => {
      setFarms(res);
    });
  };

  useEffect(() => {
    getAllPets(), getAllFarms();
  }, []);


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
                placeholder="Type"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Type </label>
            </span>
            {type === "Pet" ? (
              <>
                <span className="p-float-label">
                  <Dropdown
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    options={pets}
                    optionLabel="pet_name"
                    placeholder="Select Pet"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username">Select a Pet </label>
                </span>
              </>
            ) : (
              ""
            )}
            {type === "Farm" ? (
              <>
                <span className="p-float-label">
                  <Dropdown
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    options={farms}
                    optionLabel="farm_name"
                    placeholder="Select Farm"
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="username">Select a Farm </label>
                </span>
              </>
            ) : (
              ""
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="details"
                value={values.details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Details </label>
            </span>
            {errors.details && touched.details && (
              <p className="error">{errors.details}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="clinical_sign"
                value={values.clinical_sign}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Clinical Sign </label>
            </span>
            {errors.clinical_sign && touched.clinical_sign && (
              <p className="error">{errors.clinical_sign}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="history"
                value={values.history}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">History </label>
            </span>
            {errors.history && touched.history && (
              <p className="error">{errors.history}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="motality"
                value={values.motality}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Motality </label>
            </span>
            {errors.motality && touched.motality && (
              <p className="error">{errors.motality}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="mobile_veterinarian"
                value={values.mobile_veterinarian}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Mobile Veterinarian </label>
            </span>
            {errors.mobile_veterinarian && touched.mobile_veterinarian && (
              <p className="error">{errors.mobile_veterinarian}</p>
            )}
            <span className="p-float-label">
              <Calendar
                id="username"
                name="date_of_occurence"
                value={values.date_of_occurence}
                onChange={handleChange}
                onBlur={handleBlur}
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="username">Date of Occurence </label>
            </span>
            {errors.date_of_occurence && touched.date_of_occurence && (
              <p className="error">{errors.date_of_occurence}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="treatment_regiment"
                value={values.treatment_regiment}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Treatment Regiment </label>
            </span>
            {errors.treatment_regiment && touched.treatment_regiment && (
              <p className="error">{errors.treatment_regiment}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="clinic_physical_address"
                value={values.clinic_physical_address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Clinic Physical Address </label>
            </span>
            {errors.clinic_physical_address &&
              touched.clinic_physical_address && (
                <p className="error">{errors.clinic_physical_address}</p>
              )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="lab_confirm"
                value={values.lab_confirm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Lab Confirm </label>
            </span>
            {errors.lab_confirm && touched.lab_confirm && (
              <p className="error">{errors.lab_confirm}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="disease_diagnostic"
                value={values.disease_diagnostic}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Disease Diagnostic </label>
            </span>
            {errors.disease_diagnostic && touched.disease_diagnostic && (
              <p className="error">{errors.disease_diagnostic}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="differential_diagnosis"
                value={values.differential_diagnosis}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Differential Diagnosis </label>
            </span>
            {errors.differential_diagnosis &&
              touched.differential_diagnosis && (
                <p className="error">{errors.differential_diagnosis}</p>
              )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="tentative_diagnoistic"
                value={values.tentative_diagnoistic}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Tentative Diagnoistic </label>
            </span>
            {errors.tentative_diagnoistic && touched.tentative_diagnoistic && (
              <p className="error">{errors.tentative_diagnoistic}</p>
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
