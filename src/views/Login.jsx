/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import linkedIn from "../assets/icons/linkedin.svg";
import google from "../assets/icons/google.svg";
import or from "../assets/icons/or.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../validations/UserValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  googleCallback,
  linkedInCallback,
  login,
} from "../utils/userApiService";
import { user } from "../atom/userAtom";
import { useRecoilState } from "recoil";
import { log } from "deck.gl";

import { LoginSocialGoogle, LoginSocialLinkedin } from "reactjs-social-login";

export default function Login() {
  const location = useNavigate();
  const [data, setData] = useRecoilState(user);
  const googleClientId = '905736705694-be5othcfreqgko6km4qce2sci8od92ki.apps.googleusercontent.com'
  const linkedinClientId = '77c5cdjvez8wof'
  const linkedinSecretId = 'jM6eGS3zA6HgKbKN'
  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    await login(payload)
      .then((res) => {
        if (!res.code) {
          if (res.role === "Veternarian") {
            location("/vet-dashboard");
          } else if (res.role === "Animal Owner") {
            location("/animal-owner-dashboard");
          } else {
            location("/admin-dashboard");
          }
          // if(res.account_activation === null){
          //   toast.error("Please activate your account");
          // }
          // else{
          toast.success("Successfully logged in");
          setData(res);
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
          <button className="green__btn">Login</button>
        </form>
        <div className=" flex items-center justify-center mt-5 gap-4">
          {/* <button onClick={linkedinLogin} className=" bg-none border-none">
            <img
              src={linkedIn}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </button> */}
          {/* <button onClick={googleLogin} className=" bg-none border-none">
            <img
              src={google}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </button> */}
            <LoginSocialLinkedin
            client_id={linkedinClientId}
            client_secret={linkedinSecretId}
            response_type="code"
            scope="r_liteprofile%20r_emailaddress"
            redirect_uri='https://api.linkedin.com/v2/me?oauth2_access_token=AQVZmfOTTXG0UL1fh1qtEah0TrGI7gvGyl7tTWI9iekJwP59CEMwYbT4SS6UzqhgjWesZ3AOYoYkIRO90KCMDn3YRLq_CnQi9kXl7MiUDcxVslzvE9jP0ERfxr-KULHiRIRwwsoBdUxLq36UIBAyQdRSF3iu0bxzKnBHOdYsqr_ZfLM6JU5aALJa4bAJNium-hWCMBaZsbuVnGXnuum-7b9Y_p8y8qZ58b7owtPveNzjzPHA-OKLW-ub0prfkqVSqkc5G1RMxfGLzXDZmIZ8FKWOFdlDc2WQj5EKdT_Ah0YYTDP4bslluOfAif-9zzOP96nb33EMeN_AckBWY53qhvMHO_KBSg'
            onResolve={({ data }) => {
              linkedInCallback('AQVZmfOTTXG0UL1fh1qtEah0TrGI7gvGyl7tTWI9iekJwP59CEMwYbT4SS6UzqhgjWesZ3AOYoYkIRO90KCMDn3YRLq_CnQi9kXl7MiUDcxVslzvE9jP0ERfxr-KULHiRIRwwsoBdUxLq36UIBAyQdRSF3iu0bxzKnBHOdYsqr_ZfLM6JU5aALJa4bAJNium-hWCMBaZsbuVnGXnuum-7b9Y_p8y8qZ58b7owtPveNzjzPHA-OKLW-ub0prfkqVSqkc5G1RMxfGLzXDZmIZ8FKWOFdlDc2WQj5EKdT_Ah0YYTDP4bslluOfAif-9zzOP96nb33EMeN_AckBWY53qhvMHO_KBSg').then((res)=> {
                console.log(data);
              })
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
              <img
              src={linkedIn}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </LoginSocialLinkedin>
          <LoginSocialGoogle
            isOnlyGetToken
            client_id={googleClientId}
            redirect_uri={'https://vetkonect.com/backend/public/api/google/callback/'}
            onResolve={({ data }) => {
              // setData(data)
              googleCallback(data.access_token).then((res)=> {
                console.log(res);
              })

            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <img
              src={google}
              alt=""
              className="h-[35px] w-[35px] object-contain cursor-pointer"
            />
          </LoginSocialGoogle>
        
        </div>
        <img src={or} alt="" className=" w-full object-cover" />
        <Link to="/signup" className="secondary__btn mt-[-30px]">
          Create Account
        </Link>
      </div>
    </div>
  );
}
