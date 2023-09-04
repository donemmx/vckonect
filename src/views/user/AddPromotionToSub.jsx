import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function AddPromotionToSub() {
    const [specialty, setSpecialty] = useState(null);
    const [file, setFile] = useState([]);
    const [avialability, setAvailability] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [imagePreviews, setImagePreviews] = useState([]);
    const userData = useRecoilValue(user)
    const [agree, setAgree] = useState(false);

    const selectFiles = (event) => {
      let images = [];
      let dataImage = [];
      for (let i = 0; i < event.target.files.length; i++) {
        dataImage.push(event.target.files[i]);
        images.push(URL.createObjectURL(event.target.files[i]));
      }
      setFile(event.target.files);
      setSelectedFiles(event.target.files);
      setImagePreviews(images);
    };


    const Specialties = [
      "Small Animal Medicine",
      "Avian Medicine",
      "Ruminant medicine",
      "Wildlife medicine",
    ];
  
    const onChange = () => {
      setAgree(!agree);
    };


    const checker = (route) => {
      if (userData?.role === "Veterinarian") {
        location(`/vet-${route}`);
      } else {
        location(`/animal-owner-${route}`);
      }
    }; 

  return (
    <div>
           <div className="activity mt-5  mb-5 p-5 lg:p-10 border bg-white rounded-lg w-full ">
           <button
        onClick={() => checker("promotion")}
        className="flex items-center gap-3 text-[.75rem] lg:text-[.9rem] cursor-pointer ml-10 mt-10"
      >
        <i className="pi pi-angle-left p-1 lg:p-3 h-[25px] w-[25px] lg:h-[45px] lg:w-[45px] bg-white rounded-full"></i>
        Back
      </button>
        <div className="flex items-center py-[10vh]">
          <div className="w-full">
            <h2 className="title font-black  head__two text-center">Ads Promotion</h2>
            <div className="pt-2 subtitle paragraph text-center ">
              You can add a new promotion to your list
            </div>
            <div className="form flex flex-col gap-3 pt-6 lg:w-[38%] mx-auto">
              <h3 className="font-bold mt-5">Product Details</h3>
              <span className="p-float-label">
                <Dropdown
                  value={specialty}
                  onChange={(e) => setSpecialty(e.value)}
                  options={Specialties}
                  placeholder="Select Product"
                  className="w-full md:w-20rem"
                />
                <label htmlFor="livestock">Select Product :</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Title or Product ID</label>
              </span>

              <span className="p-float-label">
                <Dropdown
                  value={specialty}
                  onChange={(e) => setSpecialty(e.value)}
                  options={Specialties}
                  placeholder="Product Category"
                  className="w-full md:w-20rem"
                />
                <label htmlFor="username">Product Category :</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Description</label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Product Tags : </label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">
                  Location - Eg: Lagos, Nigeria :{" "}
                </label>
              </span>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Price - $00.00 : </label>
              </span>
              <div className=" flex items-center justify-between p-2 h-[60px]">
                Availability Status - {avialability ? "Open" : "Closed"}
                <InputSwitch
                  checked={avialability}
                  onChange={(e) => setAvailability(e.value)}
                />
              </div>
              <span className="p-float-label">
                <InputText id="username" />
                <label htmlFor="username">Availabile Units - 20 : </label>
              </span>

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

              <div className="checkbox-group flex items-center mt-4">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  className="ml-3"
                  value="Cheese"
                  onChange={onChange}
                  checked={agree}
                />
                <label
                  htmlFor="ingredient1"
                  className=" text-gray-500 ml-5 lg:w-[75%] text-sm lg:text-[.85rem]"
                >
                  Confirm that you agree to our terms and conditions at Vet
                  Konect
                </label>
              </div>

            
              <button className="green__btn" disabled>
                Promote Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
