/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from "../assets/icons/linkedin.svg";
import google from "../assets/icons/google.svg";
import or from "../assets/icons/or.svg";
import { Link, useNavigate } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";
import { registerVeterinarian1 } from "../utils/vetApiService";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { registration } from "../atom/registrationAtom";
import { userOne } from "../validations/UserValidation";

export default function OnboardVetAccount() {
  const [data, setData] = useRecoilState(registration);
  const location = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      stage: 1,
      ...values,
    };
    await registerVeterinarian1(payload)
      .then((res) => {
        if (!res.code) {
          location("/onboard-vet-details");
          setData(values.email);
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
      validationSchema: userOne,
      onSubmit,
    });

  return (
    <div className="login flex justify-center items-center h-[140vh]">
      <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
        <h2 className="title font-black text-center head__two">
          Create Account
        </h2>
        <div className="pt-2 subtitle paragraph text-center">
          Create a new account to become a user or a veterinarians on vet konect
          by clicking on one of the cards below
        </div>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-6">
          <div className="progress flex w-[90%] mx-auto items-center justify-evenly">
            <div className="step1 w-[40px] text-[12px] text-center ]">
              <img src={accountlIcon} alt="" />
              <p className="text-green-800 font-bold">Account Details</p>
            </div>
            <img src={arrow} alt="" />
            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={personalIcon} alt="" />
              <p>Personal Info</p>
            </div>
            <img src={arrow} alt="" />

            <div className="step1 w-[40px] text-[12px] text-center">
              <img src={verifyIcon} alt="" />
              <p>Verify Account </p>
            </div>
          </div>
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
              name="password"
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
              toggleMask
              name="confirmPassword"
              feedback={false}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="password"> Confirm Password</label>
          </span>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button className="green__btn" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
            ) : (
              ""
            )}
            Proceed
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
          <Link to="/login" className="secondary__btn mt-[-30px]">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
