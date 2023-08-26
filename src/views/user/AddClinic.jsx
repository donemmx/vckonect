import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { actionState } from "../../atom/actionAtom";
import { storeData } from "../../atom/storeAtom";
import { toast } from "react-toastify";
import { addClinic } from "../../utils/vetApiService";
import { useFormik } from "formik";
import { clinic } from "../../validations/UserValidation";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { v4 } from "uuid";

export default function AddClinic() {
  const userData = useRecoilValue(user);
  const action = useRecoilValue(actionState);
  const [store, setStore] = useRecoilState(storeData);
  const [picture, setPicture] = useState(null);

  const location = useNavigate();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [avialability, setAvailability] = useState(false);

  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
    console.log(fileData);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    let available = 0;
    const { clinicName, phone, ...others } = values;
    if (avialability) {
      available = 1;
    }
    let payload;
    if (action && action === "edit") {
      payload = {
        license_number: store?.license_number,
        user_id: store?.user_id,
        store_id: store?.id,
        clinic_speciality: '',
        availability: available,
        picture: file ?? store?.picture,
        ...others,
        clinic_name: clinicName,
        phone_number: phone,
      };
    } else {
      payload = {
        license_number: userData.license_number,
        user_id: userData.id,
        availability: available,
        clinic_speciality: '',
        picture: file,
        ...others,
        clinic_name: clinicName,
        phone_number: phone,
      };
    }
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await addClinic(formData)
      .then((res) => {
        console.log(res);
        if (res.code) {
          toast.error(res.detail);
        } else {
          if (action && action === "edit") {
            toast.success("Store details edited successfully");
            setStore(null)
          } else {
            toast.success("Store added successfully");
          }

          window.history.back();
        }
      })
      .catch((err) => console.log(err));
  };

  const initialValues = {
    clinicName: "",
    email: "",
    phone: "",
    location: "",
  };

  const loadedData = {
    clinicName: store?.store_name,
    email: store?.email,
    phone: store?.phone_number,
    location: store?.location,
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
    validationSchema: clinic,
    onSubmit,
  });

  useEffect(() => {
    if (action && action == "edit") {
      if (store?.availability == 1) {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
      setPicture(store?.picture );
    }
  }, []);

  return (
    <div className=" bg-white h-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link to='/vet-clinic'
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className=" w-[90%] lg:w-[35%] md:w-[60%]"
        >
          <h2 className="title font-black text-center head__two">
            Clinic Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new clinic to your clinic list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText
                id="username"
                name="clinicName"
                value={values.clinicName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Clinic Name (Required) :</label>
            </span>
            {errors.clinicName && touched.clinicName && (
              <p className="error">{errors.clinicName}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="livestock">Email (Required) :</label>
            </span>
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Clinic Phone No (Required) :</label>
            </span>
            {errors.phone && touched.phone && (
              <p className="error">{errors.phone}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Location (Required) : </label>
            </span>
            {errors.location && touched.location && (
              <p className="error">{errors.location}</p>
            )}
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Availability Status - {avialability ? "Open" : "Closed"}
              <InputSwitch
                checked={avialability}
                onChange={() => setAvailability(!avialability)}
              />
            </div>
            {fileDataURL !== null || picture !== null ? (
              <>
                <img
                  src={fileDataURL ?? picture}
                  className="h-[200px] w-full object-cover border-[1px] rounded-md"
                />
                <div
                  className="underline cursor-pointer"
                  onClick={() => {
                    setFileDataURL(null), setPicture(null);
                  }}
                >
                  Remove Image
                </div>
              </>
            ) : (
              <input
                type="file"
                id="image"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => getImage(e)}
              />
            )}

            <button className="green__btn" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <i className="pi pi-spin pi-spinner !text-[20px]"></i>
              ) : (
                ""
              )}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
