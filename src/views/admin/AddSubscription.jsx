/* eslint-disable no-unused-vars */
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { addSubscriptionPlan } from "../../utils/adminApiService";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { actionState } from "../../atom/actionAtom";
import { subscription } from "../../validations/UserValidation";
import { storeData } from "../../atom/storeAtom";

export default function AddSubscription() {
  const userData = useRecoilValue(user);
  const action = useRecoilValue(actionState);
  const [store, setStore] = useRecoilState(storeData);

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
    payload = {
      id: userData.id,
      permission_level: userData.permission_level,
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
    contact_info: "",
    direct_message: "",
    feed_calculator: "",
    disease_predictor: "",
    store: "",
    no_of_product: "",
    customer_support: "",
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
            <button
              type="submit"
              className="green__btn"
              disabled={!isValid || isSubmitting}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
