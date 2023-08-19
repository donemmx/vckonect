/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addPet } from "../../utils/animalOwnerApiService";
import { pet } from "../../validations/UserValidation";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { actionState } from "../../atom/actionAtom";
import { storeData } from "../../atom/storeAtom";

export default function AddPet() {
  const userData = useRecoilValue(user);
  const [petStore, setPetStore] = useRecoilState(storeData);
  const action = useRecoilValue(actionState);
  const [specie, setSpecie] = useState(null);
  const [gender, setGender] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [picture, setPicture] = useState(null)
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
    const { petName, breed, age } = values;
    let payload;
    if (action && action === "edit") {
      payload = {
        user_id: petStore?.user_id,
        pet_name: petName,
        specie: specie,
        breed: breed,
        sex: gender,
        picture: file ?? petStore?.picture,
        pet_id: petStore?.pet_id,
        age: age,
      };
    } else {
      payload = {
        user_id: userData.id,
        pet_name: petName,
        specie: specie,
        breed: breed,
        sex: gender,
        picture: file,
        age: age,
      };
    }
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(payload);

      await addPet(formData)
        .then((res) => {
          if (!res.code) {
            window.history.back();
            if(action&& action === 'edit'){
              toast.success("Pet details edited successfully");
            }
            else{
              toast.success("Pet added successfully");

            }
            setPetStore(null)
          } else {
            toast.error(res.detail);
          }
        })
        .catch((err) => console.log(err));
  };

  const initialValues = {
    petName: "",
    breed: "",
    age: "",
  };

  const loadedData = {
    petName: petStore?.pet_name,
    breed: petStore?.breed,
    age: petStore?.age,
  };

  const { values, errors, isValid, isSubmitting, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validateOnMount: true,
      initialValues: action === 'add' ?  initialValues : loadedData,
      validationSchema: pet,
      onSubmit,
    });

  useEffect(() => {
    if (action && action == "edit") {
      setGender(petStore?.sex);
      setSpecie(petStore?.specie);
      setPicture(petStore?.picture)
    }
  }, []);

  const species = ["Dog", "Cat", "Pig", "Sheep"];
  const Genders = ["Male", "Female"];

  return (
    <div className=" bg-white h-full pb-20  mb-10 rounded-md border-[1px] border-[#EBEBEB]">
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
            Pet Details
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            You can add a new pet to your pet list
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="form flex flex-col gap-3 pt-6"
          >
            <span className="p-float-label">
              <InputText
                id="username"
                name="petName"
                value={values.petName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Name of Pet (Required)</label>
            </span>
            {errors.petName && touched.petName && (
              <p className="error">{errors.petName}</p>
            )}
            <span className="p-float-label">
              <Dropdown
                value={specie}
                onChange={(e) => setSpecie(e.value)}
                options={species}
                placeholder="Select Specie"
                className="w-full md:w-20rem"
              />
              <label htmlFor="livestock">Specie (Required) :</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="breed"
                name="breed"
                value={values.breed}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="username">Breed (Required) :</label>
            </span>
            {specie !== "Poultry" ? (
              <span className="p-float-label">
                <Dropdown
                  value={gender}
                  onChange={(e) => setGender(e.value)}
                  options={Genders}
                  placeholder="Select Specialty"
                  className="w-full md:w-20rem"
                />
                <label htmlFor="username">Sex (Required) : </label>
              </span>
            ) : (
              ""
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
            {errors.age && touched.age && <p className="error">{errors.age}</p>}
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

            <button className="green__btn" disabled={!isValid || isSubmitting}>
              {isSubmitting?  <i className="pi pi-spin pi-spinner !text-[20px]"></i> : ''}
              Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
