/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user } from '../../atom/userAtom';
import { getUserById } from '../../utils/userApiService';
import { toast } from 'react-toastify';
import { adminLogin } from '../../utils/adminApiService';
import { useFormik } from 'formik';
import { loginAdmin } from '../../validations/UserValidation';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

export default function AdminLogin() {

    const location = useNavigate();
  const [data, setData] = useRecoilState(user);
 
  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    await adminLogin(payload)
      .then(({data}) => {
        if (!data.code) {
            location("/admin-dashboard");
            toast.success("Successfully logged in");
              setData({
                ...data,
              });
          }
        else {
          toast.error(data.detail);
        }
    }
      )
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
      staff_id: "",
      password: "",
    },
    validationSchema: loginAdmin,
    onSubmit,
  });

  return (
    <div className="login flex justify-center items-center h-[100vh] lg:h-[100vh]">
    <div className=" w-[80%] lg:w-[30%] md:w-[50%]">
      <h2 className="title font-black text-center head__two">Admin Login</h2>
      <div className="subtitle paragraph text-center">
        Secure access to your account
      </div>
      <form onSubmit={handleSubmit} className="form flex flex-col gap-3 pt-5">
        <span className="p-float-label">
          <InputText
            id="username"
            name="staff_id"
            value={values.staff_id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="username">Staff Id</label>
        </span>
        {errors.staff_id && touched.staff_id && (
          <p className="error">{errors.staff_id}</p>
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
      <div className=" flex items-center justify-center mt-5 gap-4">
      </div>
     
    </div>
  </div>
  )
}
