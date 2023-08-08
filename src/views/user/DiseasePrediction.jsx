import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import {
  diseasePredictor,
  getLivestockDiseases,
} from "../../utils/userApiService";

export default function DiseasePrediction() {
  const [livestock, setLivestock] = useState(null);
  const [symptom, setSymptom] = useState(null);
  const [disease, setDisease] = useState(null);
  const [result, setResult] = useState(null);
  const animalSpecies = ["Poultry", "Piggery", "Goat", "Cattle",  "Sheep"];

  const predict = () => {
    const payload = {
      livestock_category: livestock,
      diseases: symptom,
    };
    diseasePredictor(payload).then((res) => setResult(res));
  };


  const restart = () => {
    setResult(null)
    setLivestock(null)
    setSymptom(null)
  }


  useEffect(() => {
    if(livestock){
      const payload = {
        livestock: livestock,
      };
      getLivestockDiseases(payload).then((res) => {
        setDisease(res);
        
      });
    }
  }, [livestock]);
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
          {!result ? (
            <div className="form flex flex-col gap-3 pt-6">
              <span className="p-float-label">
                <Dropdown
                  value={livestock}
                  onChange={(e) => setLivestock(e.value)}
                  options={animalSpecies}
                  placeholder=" "
                  className="w-full"
                />
                <label htmlFor="livestock">
                  Select Animal Specie (Required):{" "}
                </label>
              </span>
              {livestock !== null ? (
                <span className="p-float-label">
                  <MultiSelect
                    value={symptom}
                    onChange={(e) => setSymptom(e.value)}
                    options={disease}
                    filter
                    placeholder="Select Cities"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                  />
                  <label htmlFor="livestock">
                    Likely Symptoms (Required):{" "}
                  </label>
                </span>
              ) : (
                ""
              )}
              <button className="green__btn" onClick={predict}>
                Predict
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-center mt-4 text-[#1D2432]">
                Result
              </h3>
              <p className="p-2 text-center text-[#555555] text-md mt-2">
                {result}
              </p>
              <p className="text-center text-[#555555] mt-5 text-md">
                Selected Animal Specie
              </p>
              <p className="text-center text-md font-bold text-[#1D2432]">{livestock}</p>
              <p className="text-center text-[#555555] mt-5 mb-3 text-md">
                Likely Symptoms
              </p>
              {symptom.map((res) => (
                <p
                  className="text-center font-bold text-md text-[#1D2432] "
                  key={res}
                >
                  {res}
                </p>
              ))}
              <div className=" grid gap-2 mt-10">
                <button className="tertiary__btn">Consult a Vet</button>
                <button className="green__btn" onClick={restart}>Restart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
