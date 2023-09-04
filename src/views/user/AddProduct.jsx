import { useRecoilState, useRecoilValue } from "recoil";
import { actionState } from "../../atom/actionAtom";
import { user } from "../../atom/userAtom";
import { storeData } from "../../atom/storeAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../utils/userApiService";
import { toast } from "react-toastify";
import { product } from "../../validations/UserValidation";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";

export default function AddProduct() {
  const userData = useRecoilValue(user);
  const action = useRecoilValue(actionState);
  const [store, setStore] = useRecoilState(storeData);
  const [picture, setPicture] = useState(null);
  const [tags, setTags] = useState([]);
  const location = useNavigate();
  const [category, setCategory] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [file, setFile] = useState([]);
  const [avialability, setAvailability] = useState(false);

  const selectFiles = (event) => {
    let images = [];
    let dataImage = [];
    for (let i = 0; i < event.target.files.length; i++) {
      dataImage.push(event.target.files[i]);
      images.push(URL.createObjectURL(event.target.files[i]));

      console.log(event.target.files[i]);
      console.log(event.target.files);
    }
    setFile(event.target.files);
    setSelectedFiles(event.target.files);
    setImagePreviews(images);
  };

  const back = () => {
    window.history.back();
  };

  const categories = ["Poultry", "Fish", "Pig", "Sheep"];

  const checker = (route) => {
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    let imagess= new FormData();
    let available = 0;
    if (avialability) {
      available = 1;
    }
    let payload;
    if (action && action === "edit") {
      payload = {
        user_role: userData?.role,
        user_id: store?.user_id,
        store_id: store?.id,
        availability: available,
        tags: [...tags],
        category: category,
        images: [...selectedFiles],
        ...values,
      };
    } else {
      [...selectedFiles].forEach((images) => {
        imagess.append('image', images)
      });
      payload = {
        user_id: userData?.id,
        user_role: userData?.role,
        store_id: store?.id,
        availability: available,
        tags: JSON.stringify([...tags]),
        category: category,
        images: JSON.stringify(imagess),
        ...values,
      };
    }
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await addProduct(formData)
      .then((res) => {
        console.log(res);
        if (res.code) {
          toast.error(res.detail);
        } else {
          if (action && action === "edit") {
            toast.success("Product details edited successfully");
            setStore(null);
          } else {
            toast.success("Product added successfully");
          }

          window.history.back();
        }
      })
      .catch((err) => console.log(err));

  };

  const initialValues = {
    title: "",
    description: "",
    location: "",
    price: "",
    available_units: "",
  };

  const loadedData = {
    title: store?.title,
    description: store?.description,
    location: store?.location,
    price: store?.price,
    available_units: store?.available_units,
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
    initialValues: action === "add" ? initialValues : loadedData,
    validationSchema: product,
    onSubmit,
  });

  useEffect(() => {
    if (action && action == "edit") {
      if (store?.availability == 1) {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
      setPicture(store?.picture);
    }
  }, []);

  return (
    <div className=" bg-white h-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <button
        onClick={() => back()}
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </button>
      <div className="flex justify-center items-center pt-[10vh]">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className=" w-[90%] lg:w-[35%] md:w-[60%]"
        >
          <h2 className="title font-black text-center head__two">
            Product Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new product to your product list
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <InputText
                id="username"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Title :</label>
            </span>
            {errors.title && touched.title && (
              <p className="error">{errors.title}</p>
            )}
            <span className="p-float-label">
              <Dropdown
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories}
                placeholder="Select Category"
                className="w-full md:w-20rem"
              />

              <label htmlFor="username">Type of livestock (Required) : </label>
            </span>
            <span className="p-float-label">
              <Chips
                id="username"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <label htmlFor="username">Tags (Required) :</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="username"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Description (Required) :</label>
            </span>
            {errors.description && touched.description && (
              <p className="error">{errors.description}</p>
            )}

            <span className="p-float-label">
              <InputText
                id="username"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Location (Required) : </label>
            </span>
            {errors.location && touched.location && (
              <p className="error">{errors.location}</p>
            )}
            <div className=" flex items-center justify-between p-2 h-[60px]">
              Availability Status - {avialability ? "Open" : "Closed"}
              <InputSwitch
                checked={avialability}
                onChange={() => setAvailability(!avialability)}
              />
            </div>

            <span className="p-float-label">
              <InputText
                id="username"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Price (Required) : </label>
            </span>
            {errors.price && touched.price && (
              <p className="error">{errors.price}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="available_units"
                value={values.available_units}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Available Units (Required) : </label>
            </span>
            {errors.available_units && touched.available_units && (
              <p className="error">{errors.available_units}</p>
            )}
            {imagePreviews?.length > 0 ? (
              <>
                <div className=" imagePreviews ">
                  {imagePreviews?.map((img, i) => {
                    return (
                      <>
                        <div className=" h-[150px]">
                          <img
                            className="preview"
                            src={img}
                            alt={"image-" + i}
                            key={i}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div
                  className="underline cursor-pointer"
                  onClick={() => {
                    setImagePreviews(null);
                  }}
                >
                  Remove Image
                </div>
              </>
            ) : (
              <input
                type="file"
                id="image"
                multiple
                accept=".png, .jpg, .jpeg"
                onChange={selectFiles}
              />
            )}

            <button className="green__btn" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <i className="pi pi-spin pi-spinner !text-[20px]"></i>
              ) : (
                ""
              )}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
