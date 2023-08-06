import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputSwitch } from "primereact/inputswitch";
import { addStore } from "../../utils/userApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { v4 } from "uuid";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { store } from "../../validations/UserValidation";

export default function AddStore() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const userData = useRecoilValue(user);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [avialability, setAvailability] = useState(false);
  function getImage(e) {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }

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
  console.log(fileDataURL);

  const onSubmit = async (values) => {
    const { storeName, phone, ...others } = values;
    const payload = {
      user_role: userData.role,
      user_id: userData.id,
      store_id: v4(),
      availability: avialability,
      picture: fileDataURL,
      ...others,
      store_name: storeName,
      phone_number: phone,
    };
    await addStore(payload)
      .then(() => {
       toast.success('Store added successfully')
       window.history.back()
      })
      .catch((err) => console.log(err));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        storeName: "",
        email: "",
        phone: "",
        location: "",
      },
      validationSchema: store,
      onSubmit,
    });
  return (
    <div className=" bg-white h-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/stores"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <form
          onSubmit={handleSubmit}
          className=" w-[90%] lg:w-[35%] md:w-[60%]"
        >
          <h2 className="title font-black text-center head__two">
            Store Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new store to your store list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText
                id="username"
                name="storeName"
                value={values.storeName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Store Name :</label>
            </span>
            {errors.storeName && touched.storeName && (
              <p className="error">{errors.storeName}</p>
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
                onChange={(e) => setAvailability(e.value)}
              />
            </div>
            {  fileDataURL !== null ? (
              <>
                <img
                  src={fileDataURL}
                  className="h-[200px] w-full object-cover border-[1px] rounded-md"
                />
                <div
                  className="underline cursor-pointer"
                  onClick={() => setFileDataURL(null)}
                >
                  Remove Image
                </div>
              </>
            ) : (
              <input
                type="file"
                id="image"
                accept=".png, .jpg, .jpeg"
                onChange={getImage}
              />
            )}

            <button className="green__btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
