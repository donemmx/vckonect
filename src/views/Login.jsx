/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import or from "../assets/icons/or.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../validations/UserValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  getUserById,
  googleCallback,
  linkedInCallback,
  login,
} from "../utils/userApiService";
import { user } from "../atom/userAtom";
import { useRecoilState } from "recoil";
import { log } from "deck.gl";
import SocialLogin from "../components/socialLogin/SocialLogin";


export default function Login() {
  const location = useNavigate();
  const [data, setData] = useRecoilState(user);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    await login(payload)
      .then(({data}) => {
        if (!data.code) {
          getUserById({ id: data.id, role: data.role }).then((res) => {
            setData({
              ...res.data,
              ...data,
            });
          });
          setData(data);
          if (data.role === "Veterinarian") {
            location("/vet-dashboard");
          }  else if (data.role === "Animal Owner") {
            location("/animal-owner-dashboard");
          } else {
            location("/admin-dashboard");
          }
          toast.success("Successfully logged in");
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
      email: "",
      password: "",
    },
    validationSchema: loginUser,
    onSubmit,
  });
  return (
    <div className="login flex justify-center items-center h-[100vh] lg:h-[120vh]">
      <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
        <h2 className="title font-black text-center head__two">Login</h2>
        <div className="subtitle paragraph text-center">
          Secure access to your account
        </div>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-5">
          <span className="p-float-label">
            <InputText
              id="username"
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
          <span className="p-float-label">
            <Password
              toggleMask
              feedback={false}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="password">Password</label>
          </span>
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
          <Link
            to="/forgot-password"
            className="text-sm underline cursor-pointer pt-2"
          >
            Forgot your password?
          </Link>
          <button className="green__btn" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Login
          </button>
        </form>
        <SocialLogin/>
        <img src={or} alt="" className=" w-full object-cover" />
        <Link to="/signup" className="secondary__btn mt-[-30px]">
          Create Account
        </Link>
      </div>
    </div>
  );
}
