import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from "../assets/icons/linkedin.svg";
import google from "../assets/icons/google.svg";
import or from "../assets/icons/or.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../validations/UserValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { login } from "../utils/userApiService";
import { user } from "../atom/userAtom";
import { useRecoilState } from "recoil";

export default function Login() {
  const location = useNavigate();
  const [data, setData] = useRecoilState(user);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    await login(payload)
      .then((res) => {
        if (!res.code) {
          location("/dashboard");
          // if(res.account_activation === null){
          //   toast.error("Please activate your account");
          // }
          // else{
          //   toast.error("Successfully logged in");
            setData(res)
          // }

        } else {
          toast.error(res.detail);
        }
      })
      .catch((err) => console.log(err));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
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
          <button className="green__btn">
            Login
          </button>
          <div className=" flex items-center justify-center gap-4">
            <img
              src={linkedIn}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
            <img
              src={google}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </div>
          <img src={or} alt="" className=" w-full object-cover" />
          <Link to="/signup" className="secondary__btn mt-[-30px]">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
