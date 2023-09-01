import { InputText } from "primereact/inputtext";
import or from '../assets/icons/or.svg'
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { resetPassword } from "../utils/userApiService";
import { registration } from "../atom/registrationAtom";
import { useFormik } from "formik";
import { resetUser } from "../validations/UserValidation";

export default function ForgotPassword() {
  const [data, setData] = useRecoilState(registration);
  const location = useNavigate();

  const onSubmit = async (values) => {
  
    await resetPassword(values)
      .then((res) => {
        if (!res.code) {
          location("/otp");
          setData(res);
          toast.success(res.detail);
        } else {
          toast.error(res.detail);
        }
      })
      .catch((err) => console.log(err));
  };

  const { values, errors,isValid, isSubmitting, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetUser,
      onSubmit,
    });
  return (
    <div className="login flex justify-center items-center h-[100vh]">
    <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
      <h2 className="title font-black text-center head__two">Forgot Password</h2>
      <div className="subtitle paragraph text-center">
      Kindly retrieve your password
      </div>
      <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-3">
        <span className="p-float-label">
          <InputText id="username"
           name="email"
           value={values.email}
           onChange={handleChange}
           onBlur={handleBlur}
          />
          <label htmlFor="username">Email</label>
        </span>
        {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        <button className="green__btn"disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
          Proceed</button>
        <img src={or} alt="" className=" w-full object-cover" />
        <Link to='/signup' className="secondary__btn mt-[-40px]">Create Account</Link>
      </form>
    </div>
  </div>
  )
}
