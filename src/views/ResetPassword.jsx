import { Link, useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { userResetPassword } from "../validations/UserValidation";
import { useFormik } from "formik";
import { changePassword } from "../utils/userApiService";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { registration } from "../atom/registrationAtom";

export default function ResetPassword() {
  const userData= useRecoilValue(registration);

  const location = useNavigate();
  const onSubmit = async (values) => {
    const {confirmPassword , ...others} = values
    const payload = {
      email: 1,
      db_table: 1,
      id: 1,
      new_password: confirmPassword
    };
    await changePassword(payload)
      .then((res) => {
        if (!res.code) {
          location("/verified");
          toast.success(res.detail);
        } else {
          toast.error(res.detail);
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userResetPassword,
    onSubmit,
  });
  return (
    <div className="login flex justify-center items-center h-[100vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          Reset Password
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
          Kindly retrieve your password
        </div>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly"></div>

          <span className="p-float-label">
            <Password
              name="password"
              toggleMask
              feedback={false}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="password">Password</label>
          </span>
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
          <span className="p-float-label">
            <Password 
            name="confirmPassword"
            toggleMask
            feedback={false}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            <label htmlFor="password">Confirm Password</label>
          </span>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button className="green__btn"disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Confirm
          </button>
          <Link to="#" className="tertiary__btn">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
