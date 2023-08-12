import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addFarm } from "../../utils/animalOwnerApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { v4 } from "uuid";
import { farm } from "../../validations/UserValidation";

export default function AddFarm() {
  const userData = useRecoilValue(user);
  const [gender, setGender] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);


  const livestocks = [
     "Poultry" ,
     "Fish",
     "Pig",
     "Sheep"
  ];

  const getImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
    console.log(fileData);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);


  const onSubmit = async (values) => {
    const formData = new FormData();
    const { farmName,workers,livestockType, livestock, ...others } = values;

    const payload = {
      user_id: userData.id,
      farm_id: v4(),
      farm_name: farmName,
      picture: file,
      no_of_worker: workers,
      livestock_type:livestockType,
      no_of_livestock: livestock,
      ...others,
      
    };
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await addFarm(formData)
      .then((res) => {
        console.log(res);
        if (res.code) {
          toast.error(res.detail);
        } else {
          toast.success("Farm added successfully");
          window.history.back();
        }
      })
      .catch((err) => console.log(err));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        farmName: "",
        workers: "",
        livestockType: "",
        livestock: "",
        age: "",
        sex: "",
        location: "",
      },
      validationSchema: farm,
      onSubmit,
    });
  const Genders = ["Male", "Female"];
  return (
    <div className=" bg-white h-full pb-20 mb-10 rounded-md border-[1px] border-[#EBEBEB]">
      <Link
        to="/livestock"
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </Link>
      <div className="flex justify-center items-center pt-[10vh]">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Farm Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new farm to your farm list
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="form flex flex-col gap-3 pt-6"
          >
            <span className="p-float-label">
              <InputText
                id="username"
                name="farmName"
                value={values.farmName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Name of Farm (Required)</label>
            </span>
            {errors.farmName && touched.farmName && (
              <p className="error">{errors.farmName}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="livestock">Location / Address (Required) :</label>
            </span>
            {errors.location && touched.location && (
              <p className="error">{errors.location}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="workers"
                value={values.workers}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Number of Workers (Required) :</label>
            </span>
            {errors.workers && touched.workers && (
              <p className="error">{errors.workers}</p>
            )}
            <span className="p-float-label">
              <Dropdown
                name="livestockType"
                value={values.livestockType}
                onChange={handleChange}
                options={livestocks}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />

              <label htmlFor="username">Type of livestock (Required) : </label>
            </span>
            {errors.livestockType && touched.livestockType && (
              <p className="error">{errors.livestockType}</p>
            )}
            <span className="p-float-label">
              <Dropdown
                name="sex"
                value={values.sex}
                onChange={handleChange}
                onBlur={handleBlur}
                options={Genders}
                placeholder="Select Specialty"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Sex (Required) : </label>
            </span>
            {errors.sex && touched.sex && (
              <p className="error">{errors.sex}</p>
            )}
            <span className="p-float-label">
              <InputText
                id="username"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Age (Required) : </label>
            </span>
            {errors.age && touched.age && (
              <p className="error">{errors.age}</p>
            )}
            {fileDataURL !== null ? (
              <>
                <img
                  src={fileDataURL}
                  className="h-[200px] w-full object-cover border-[1px] rounded-md"
                />
                <div
                  className="underline cursor-pointer"
                  onClick={() => setFileDataURL(null)}
                >
                  Remove Image
                </div>
              </>
            ) : (
              <input
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => getImage(e)}
               />
            )}

            <button type="submit" className="green__btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
