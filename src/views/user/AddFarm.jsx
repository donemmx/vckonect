import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addFarm } from "../../utils/animalOwnerApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { v4 } from "uuid";
import { farm } from "../../validations/UserValidation";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";

export default function AddFarm() {
  const userData = useRecoilValue(user);
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState(null);
  const [livestock, setLivestock] = useState(null);
  const [store, setStore] = useRecoilState(storeData);
  const action = useRecoilValue(actionState);
  const [picture, setPicture] = useState(null)

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
    const { farmName,workers, livestockNumber, ...others } = values;
    let payload;
    if (action && action === "edit") {
     payload = {
      user_id: store?.user_id,
      farm_name: store?.farm_name,
      picture:  file ?? store?.picture,
      no_of_worker: workers,
      sex: gender,
      farm_id: store?.farm_id,
      livestock_type:store?.livestock_type,
      no_of_livestock: store?.no_of_livestock,
      ...others,
    };
  }
  else{
    payload = {
      user_id: userData.id,
      farm_id: v4(),
      farm_name: farmName,
      picture: file,
      no_of_worker: workers,
      sex: gender,
      livestock_type:livestock,
      no_of_livestock: livestockNumber,
      ...others,
    };
  }
    console.log(payload);
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

  const initialValues =  {
    farmName: "",
    workers: "",
    age: "",
    location: "",
    livestockNumber: ""
  }

  const loadedData = {
    farmName: store?.farm_name,
    workers: store?.no_of_worker,
    age: store?.age,
    location: store?.location,
    livestockNumber: store?.no_of_livestock
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: action === 'add' ?  initialValues : loadedData,
      validationSchema: farm,
      onSubmit,
    });
  const Genders = ["Male", "Female"];

  useEffect(() => {
    if (action && action == "edit") {
      setGender(store?.sex);
      setLivestock(store?.livestock_type);
      setPicture(store?.picture)
    }
  }, []);

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
                value={livestock}
                onChange={(e)=> setLivestock(e.target.value)}
                options={livestocks}
                placeholder="Select Livestock"
                className="w-full md:w-20rem"
              />

              <label htmlFor="username">Type of livestock (Required) : </label>
            </span>
            <span className="p-float-label">
              <InputText
                id="username"
                name="livestockNumber"
                value={values.livestockNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Number of Livestock (Required) :</label>
            </span>
            <span className="p-float-label">
              <Dropdown
                name="sex"
                value={gender}
                onChange={(e)=> setGender(e.target.value)}
                options={Genders}
                placeholder="Select Sex"
                className="w-full md:w-20rem"
              />
              <label htmlFor="username">Sex (Required) : </label>
            </span>
           
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
            {fileDataURL !== null || picture !== null ? (
              <>
                <img
                  src={fileDataURL ?? picture}
                  className="h-[200px] w-full object-cover border-[1px] rounded-md"
                />
                <div
                  className="underline cursor-pointer"
                  onClick={() => {setFileDataURL(null), setPicture(null)}}
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
