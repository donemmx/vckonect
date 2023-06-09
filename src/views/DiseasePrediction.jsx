import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function DiseasePrediction() {
  const [specie, setSpecie] = useState(null);
  const [symptom, setSymptom] = useState(null);

  const animalSpecies = ["Poultry", "Dog", "Swine", "Goat", "Cattle", "Cat"];
  const symptoms = ["Loss of Appetite", "Weight Loss", "Diarrhea", "Rashes", "Inflammation in the limbs", "Abnormal Posture"];

  return (
    <div className="mt-14 lg:mt-4">
      <div className="flex justify-center items-center">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Disease Predictor
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            Find out what could likely be wrong with your pet or livestock
            through the noticeable signs and symptoms
          </div>
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <Dropdown
                value={specie}
                onChange={(e) => setSpecie(e.value)}
                options={animalSpecies}
                placeholder=" "
                className="w-full"
              />
              <label htmlFor="livestock">
                Select Animal Specie (Required):{" "}
              </label>
            </span>
            { specie !== null ?
              <span className="p-float-label">
                <MultiSelect
                  value={symptom}
                  onChange={(e) => setSymptom(e.value)}
                  options={symptoms}
                  filter
                  placeholder="Select Cities"
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem"
                />
                <label htmlFor="livestock">Likely Symptoms (Required): </label>
              </span>
              : ''
            }
            <button className="green__btn" disabled>
              Predict
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
