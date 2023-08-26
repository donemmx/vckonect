/* eslint-disable no-unused-vars */
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { addSubscriptionPlan } from "../../utils/adminApiService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { actionState } from "../../atom/actionAtom";
import { subscription } from "../../validations/UserValidation";
import { storeData } from "../../atom/storeAtom";
import { InputSwitch } from "primereact/inputswitch";

export default function AddSubscription() {
  const userData = useRecoilValue(user);
  const action = useRecoilValue(actionState);
  const [store, setStore] = useRecoilState(storeData);
  const [contact, setContact] = useState(false);
  const [message, setMessage] = useState(false);
  const [calculator, setCalculator] = useState(false);
  const [predictor, setPredictor] = useState(false);
  const [support, setSupport] = useState(false);
  const currencies = ["NGN", "USD", "GBP"];

  const onSubmit = async (values) => {
    const formData = new FormData();
    let payload;
    //     if (action && action === "edit") {
    //      payload = {
    //       user_id: user?.user_id,
    //       farm_name: user?.farm_name,
    //       no_of_worker: workers,
    //       sex: gender,
    //       farm_id: store?.farm_id,
    //       livestock_type:store?.livestock_type,
    //       no_of_livestock: store?.no_of_livestock,
    //       ...others,
    //     };
    //   }
    //   else{
    let contact_info;
    let direct_message;
    let feed_calculator;
    let disease_predictor;
    let customer_support;

    if (contact) {
      contact_info = "Yes";
    } else {
      contact_info = "No";
    }
    if (message) {
      direct_message = "Yes";
    } else {
      direct_message = "No";
    }
    if (calculator) {
      feed_calculator = "Yes";
    } else {
      feed_calculator = "No";
    }
    if (predictor) {
      disease_predictor = "Yes";
    } else {
      disease_predictor = "No";
    }
    if (support) {
      customer_support = "Yes";
    } else {
      customer_support = "No";
    }

    payload = {
      id: userData.staff_id,
      permission_level: userData.permission_level,
      contact_info: contact_info,
      direct_message: direct_message,
      feed_calculator: feed_calculator,
      disease_predictor: disease_predictor,
      customer_support: customer_support,
      ...values,
    };
    //   }
    console.log(payload);
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    addSubscriptionPlan(formData)
      .then((res) => {
        console.log(res);
        if (res.code) {
          toast.error(res.detail);
        } else {
          toast.success("Subscription added successfully");
          setStore(null);
          window.history.back();
        }
      })
      .catch((err) => console.log(err));
  };

  const initialValues = {
    title: "",
    currency: "",
    price: "",
    vat: "",
    date_option: "",
    duration: "",
    case: "",
    store: "",
    no_of_product: "",
  };

  // const loadedData = {
  // title: "",
  // currency: "",
  // price: "",
  // vat: "",
  // date_option: "",
  // duration: "",
  // case: "",
  // contact_info: "",
  // direct_message: "",
  // feed_calculator: "",
  // disease_predictor: "",
  // store: "",
  // no_of_product: "",
  // customer_support: "",
  //   };

  const {
    values,
    isValid,
    isSubmitting,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    validationSchema: subscription,
    onSubmit,
  });

  useEffect(() => {}, []);
  return (
    <div className=" bg-white h-full w-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/subscriptions"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Add New Subscription
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can customize your subscription plans
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="form flex flex-col gap-3 pt-6"
          >
            <span className="p-float-label">
              <InputText
                id="username"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Title (Required)</label>
            </span>
            {errors.title && touched.title && (
              <p className="error">{errors.title}</p>
            )}
            <span className="p-float-label">
              <Dropdown
                name="currency"
                value={values.currency}
                options={currencies}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select Currency"
                className="w-full md:w-20rem"
              />

              <label htmlFor="username">Currency (Required) : </label>
            </span>
            {errors.currency && touched.currency && (
              <p className="error">{errors.currency}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Price (Required) :</label>
            </span>
            {errors.price && touched.price && (
              <p className="error">{errors.price}</p>
            )}

            <span className="p-float-label">
              <InputText
                id="username"
                name="vat"
                value={values.vat}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">VAT (Required) :</label>
            </span>

            {errors.vat && touched.vat && <p className="error">{errors.vat}</p>}

            <span className="p-float-label">
              <InputText
                id="username"
                name="date_option"
                value={values.date_option}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Date Option (Required) : </label>
            </span>
            {errors.date_option && touched.date_option && (
              <p className="error">{errors.date_option}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="duration"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Duration (Required) : </label>
            </span>
            {errors.duration && touched.duration && (
              <p className="error">{errors.duration}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="case"
                value={values.case}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Case (Required) : </label>
            </span>
            {errors.case && touched.case && (
              <p className="error">{errors.case}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="no_of_product"
                value={values.no_of_product}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">No of Product (Required) : </label>
            </span>
            {errors.no_of_product && touched.no_of_product && (
              <p className="error">{errors.no_of_product}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="store"
                value={values.store}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Store (Required) : </label>
            </span>
            {errors.store && touched.store && (
              <p className="error">{errors.store}</p>
            )}

            <div className=" flex items-center justify-between p-2 h-[60px]">
              Contact Info - {contact ? "Yes" : "No"}
              <InputSwitch
                checked={contact}
                onChange={() => setContact(!contact)}
              />
            </div>
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Direct Message - {message ? "Yes" : "No"}
              <InputSwitch
                checked={message}
                onChange={() => setMessage(!message)}
              />
            </div>
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Feed Calculator - {calculator ? "Yes" : "No"}
              <InputSwitch
                checked={calculator}
                onChange={() => setCalculator(!calculator)}
              />
            </div>
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Disease Predictor - {predictor ? "Yes" : "No"}
              <InputSwitch
                checked={predictor}
                onChange={() => setPredictor(!predictor)}
              />
            </div>
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Customer Support - {support ? "Yes" : "No"}
              <InputSwitch
                checked={support}
                onChange={() => setSupport(!support)}
              />
            </div>
            <button
              type="submit"
              className="green__btn"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <i className="pi pi-spin pi-spinner !text-[20px]"></i>
              ) : (
                ""
              )}
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
