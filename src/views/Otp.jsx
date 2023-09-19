import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { confirmResetPasswordCode } from "../utils/userApiService";
import { useRecoilValue } from "recoil";
import { registration } from "../atom/registrationAtom";
import { useFormik } from "formik";
import { resetPin } from "../validations/UserValidation";
import { toast } from "react-toastify";

export default function Otp() {
  const userData = useRecoilValue(registration);
  const location = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      id: userData?.id,
      ...values,
    };
    await confirmResetPasswordCode(payload)
      .then(({data}) => {
        if (data.detail) {
          location("/reset-password");
          toast.success(data.detail);
        } else {
          toast.error(data.detail);
        }
      })
      .catch((err) => console.log(err));
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
    initialValues: {
      pin_code: "",
    },
    validationSchema: resetPin,
    onSubmit,
  });

  return (
    <div className="login flex justify-center items-center h-[100vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">OTP</h2>
        <div className="pt-2 subtitle paragraph text-center">
          Kindly retrieve your password
        </div>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly"></div>
          <div className="pt-2 subtitle paragraph text-center">
            Kindly enter the 6 digit code sent to your email in the input field
            below
          </div>
          <span className="p-float-label">
            <InputText
              id="username"
              name="pin_code"
              value={values.pin_code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">OTP Code</label>
          </span>
          {errors.pin_code && touched.pin_code && (
            <p className="error">{errors.pin_code}</p>
          )}
          <div className="pt-2 subtitle cursor-pointer paragraph underline text-center">
            Resend Code
          </div>
          <button
            className="green__btn"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Verify
          </button>
          <Link to="#" className="tertiary__btn">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
