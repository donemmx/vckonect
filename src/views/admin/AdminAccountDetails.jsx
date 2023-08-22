import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { user } from "../../atom/userAtom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { updateUser } from "../../validations/UserValidation";
import { updateAdminProfile } from "../../utils/adminApiService";

export default function AdminAccountDetails() {
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [picture, setPicture] = useState(null);
    const [userData, setUserData] = useRecoilState(user);
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
      const { address, firstName, lastName, phone_number ,password, confirmPassword } = values;
      let payload;
      if (open) {
        payload = {
          phone_number: phone_number,
          first_name: firstName,
          last_name: lastName,
          location: address,
          email: userData?.email,
          id: userData?.id,
          role: userData?.role,
          password: password,
          staff_id: userData?.staff_id,
          confirmPassword: confirmPassword,
          profile_picture: file ?? userData.profile_picture,
        };
  
      } else {
        payload = {
          phone_number: phone_number,
          first_name: firstName,
          email: userData?.email,
          last_name: lastName,
          location: address,
          id: userData?.id,
          role: userData?.role,
          staff_id: userData?.staff_id,
          profile_picture: file ?? userData.profile_picture,
        };
      }
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      await updateAdminProfile(formData)
        .then((res) => {
          if (!res.code) {
            toast.success("User data updated");
              setUserData({
                ...res.data,
            });
            window.history.back();
          } else {
            toast.error(res.detail);
          }
        })
        .catch((err) => console.log(err));
    };
  
    const initialValue = {
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone_number: userData.phone_number,
      address: userData.location,
      password: "",
      confirmPassword: "",
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
      initialValues: initialValue,
      validationSchema: updateUser,
      onSubmit,
    });
  
    useEffect(() => {
      setPicture(userData?.profile_picture);
    }, []);
  
    return (
      <div className=" bg-white h-[140vh] w-full mb-10 rounded-md border-[1px] border-[#EBEBEB]">
        <Link
        to='/admin-account'
          className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
        >
          <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
          Back
        </Link>
        <div className="flex justify-center items-center pt-[10vh]">
          <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
            <h2 className="title font-black text-center head__two">
              Account Details
            </h2>
            <div className="pt-2 subtitle paragraph text-center">
              You can update your profile information by filling the field below
            </div>
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="form flex flex-col gap-3 pt-6"
            >
              <span className="p-float-label">
                <InputText
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="livestock">Address (Required): </label>
              </span>
              {errors.address && touched.address && (
                <p className="error">{errors.address}</p>
              )}
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="username">First Name (Required)</label>
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
                <label htmlFor="username">Last Name (Required): </label>
              </span>
              {errors.lastName && touched.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="username">Phone No. (Required): </label>
              </span>
              {errors.phone_number && touched.phone_number && (
                <p className="error">{errors.phone_number}</p>
              )}
              {open ? (
                <>
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="username">New Password (Required): </label>
                  </span>
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="username">
                      Comfirm Password (Required):{" "}
                    </label>
                  </span>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </>
              ) : (
                ""
              )}
  
              {!open ? (
                <button className="secondary__btn" onClick={() => setOpen(!open)}>
                  Change Password
                </button>
              ) : (
                ""
              )}
  
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
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  