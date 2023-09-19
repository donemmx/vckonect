import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import accountlIcon from "../assets/icons/create-account/onboard/account-details-icon.svg";
import personalIcon from "../assets/icons/create-account/onboard/personal-info-icon.svg";
import verifyIcon from "../assets/icons/create-account/onboard/verify-account-icon.svg";
import arrow from "../assets/icons/create-account/onboard/arrow-account-next.svg";
import { useRecoilValue } from "recoil";
import { useFormik } from "formik";
import { registration } from "../atom/registrationAtom";
import { toast } from "react-toastify";
import { verify } from "../validations/UserValidation";
import { registerVeterinarian3 } from "../utils/vetApiService";
import SubscriptionCard from "../components/subscriptionCard/SubscriptionCard";
import { OtpResend } from "../utils/userApiService";

export default function OnboardVetVerify() {
  const regEmail = useRecoilValue(registration);
  const location = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      stage: 3,
      email: regEmail?.email,
      ...values,
    };
    await registerVeterinarian3(payload)
      .then(({data}) => {
        if (!data.code) {
          location("/verified");
          toast.success(data.detail);
        } else {
          toast.error(data.detail);
        }
      })
      .catch((err) => console.log(err));
  };

  const resendUserOtp = async () => {
    await OtpResend(regEmail.email)
    .then(({data}) => {

      if (!data.code) {
        toast.success('OTP resent to your email');
      } else {
        toast.error(data.detail);
      }
    })
    .catch((err) => console.log(err));
  }
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
      activation_code: "",
    },
    validationSchema: verify,
    onSubmit,
  });

  return (
    <div className="login flex justify-center items-center h-[100vh] lg:h-[105vh]">
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
              <img className="greenOverlay" src={personalIcon} alt="" />
              <p className="text-green-800 font-bold">Personal Info</p>
            </div>
            <img src={arrow} alt="" />

            <Link
              to="/"
              className="cursor-pointer step1 w-[40px] text-[12px] text-center"
            >
              <img className="greenOverlay" src={verifyIcon} alt="" />
              <p className="text-green-800 font-bold">Verify Account </p>
            </Link>
          </div>
          <div className="pt-2 subtitle paragraph text-center">
            Kindly enter the 4 digit code sent to your email in the input field
            below
          </div>
          <span className="p-float-label">
            <InputText
              id="username"
              name="activation_code"
              value={values.activation_code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username">OTP Code</label>
          </span>
          {errors.activation_code && touched.activation_code && (
            <p className="error">{errors.activation_code}</p>
          )}
          <div className="pt-2 subtitle cursor-pointer paragraph underline text-center" onClick={resendUserOtp}>
            Resend Code
          </div>
          <button className="green__btn" disabled={!isValid || isSubmitting}>
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

        {/* <SubscriptionCard/> */}
      </div>
    </div>
  );
}
