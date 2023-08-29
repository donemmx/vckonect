import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { feedCalculator } from "../../utils/userApiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";

export default function FeedCalculator() {
  const userData = useRecoilValue(user)
  const location = useNavigate()

  const [livestock, setlivestock] = useState(null);
  // const [fishSize, setFishSize] = useState(null);
  const [noOfFish, setNoOfFish] = useState(null);
  const [noOfPigs, setNoOfPigs] = useState(null);
  const [bridType, setBridType] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [result, setResult] = useState(null);
  const [noOfBirds, setNoOfBirds] = useState(null);
  const [feedType, setFeedType] = useState(null);
  const livestocks = [
    { name: "Poultry", value: "Poultry" },
    { name: "Fishes", value: "Fish" },
    { name: "Pigs", value: "Pig" },
  ];

  const bridTypes = ["Broilers", "Layers"];
  const broilersFeedTypes = ["Starter", "Finisher"];
  const layersFeedTypes = ["Chick Mash", "Growers Mash", "Layers Mash/Pellet"];

  const restart = () => {
    setResult(null);
    setlivestock(null)
    // setFishSize(null)
    setNoOfFish(null)
    setNoOfPigs(null)
    setBridType(null)
    setNoOfBirds(null)
    setFeedType(null)
    setWeeks(null)
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let payload;
    if (livestock == "Poultry") {
      if (bridType == "Layers") {
        payload = {
          livestock_category: livestock,
          bird_type: bridType,
          feed_type: feedType,
          no_of_bird: noOfBirds,
        };
      } else {
        payload = {
          livestock_category: livestock,
          bird_type: bridType,
          feed_type: feedType,
          no_of_week: weeks,
          no_of_bird: noOfBirds,
        };
      }
    } else if (livestock == "Fish") {
      payload = {
        livestock_category: livestock,
        no_of_fish: noOfFish,
      };
    } else {
      payload = {
        livestock_category: livestock,
        no_of_pig: noOfPigs,
      };
    }

    feedCalculator(payload).then((res) => {
      setResult(res);
    });
  };


  const numberFormat = (data) => {
    if(typeof data  === 'number'){
      return Number(data.space_requires).toFixed(2);
    }
    return '-'
};

const format = (data) => {
  return Number(data.feed).toFixed(2);
}

  const header = (
    <div className="flex items-center justify-between gap-2">
        <span className="text-xl text-900 font-bold">{livestock}</span>
        <Button icon="pi pi-refresh" rounded raised onClick={restart}/>
    </div>
);

useEffect(()=> {
  if(userData.subscription === null || userData.subscription === 'Expired'){
    location("/vet-subscription");
  }
}, [])

  return (
    <div className="mt-14 lg:mt-4">
      <div className="flex justify-center items-center">
        <div className=" w-[90%] lg:w-[35%] md:w-[60%]">
          <h2 className="title font-black text-center head__two">
            Feed Calculator
          </h2>
          <div className="pt-2 subtitle paragraph text-center">
            Calculate Feed for your pets and livestocks
          </div>
          {!result ? (
            <form
              onSubmit={handleSubmit}
              className="form flex flex-col gap-3 pt-6"
            >
              <span className="p-float-label">
                <Dropdown
                  value={livestock}
                  onChange={(e) => setlivestock(e.value)}
                  options={livestocks}
                  optionLabel="name"
                  placeholder=" "
                  className="w-full"
                />
                <label htmlFor="livestock">
                  Livestock Category (Required):{" "}
                </label>
              </span>
              {livestock === "Poultry" ? (
                <span className="p-float-label">
                  <Dropdown
                    value={bridType}
                    onChange={(e) => setBridType(e.value)}
                    options={bridTypes}
                    placeholder=" "
                    className="w-full"
                  />
                  <label htmlFor="livestock">Bird Type (Required): </label>
                </span>
              ) : (
                ""
              )}
              {livestock === "Poultry" && bridType === "Broilers" ? (
                <span className="p-float-label">
                  <Dropdown
                    value={feedType}
                    onChange={(e) => setFeedType(e.value)}
                    options={broilersFeedTypes}
                    placeholder=" "
                    className="w-full"
                  />
                  <label htmlFor="livestock">Feed Type (Required): </label>
                </span>
              ) : (
                ""
              )}
              {livestock === "Poultry" && bridType === "Layers" ? (
                <span className="p-float-label">
                  <Dropdown
                    value={feedType}
                    onChange={(e) => setFeedType(e.value)}
                    options={layersFeedTypes}
                    placeholder=" "
                    className="w-full"
                  />
                  <label htmlFor="livestock">Feed Type (Required): </label>
                </span>
              ) : (
                ""
              )}
              {livestock === "Poultry" && bridType !== null ? (
                <>
                  {bridType === "Broilers" ? (
                    <span className="p-float-label">
                      <InputText
                        id="username"
                        value={weeks}
                        onChange={(e) => setWeeks(e.target.value)}
                      />
                      <label htmlFor="usernam">
                        Number of Weeks (Required)
                      </label>
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      value={noOfBirds}
                      onChange={(e) => setNoOfBirds(e.target.value)}
                    />
                    <label htmlFor="username">Number of Birds (Required)</label>
                  </span>
                </>
              ) : (
                ""
              )}
              {livestock === "Fish" ? (
                <>
                  {/* <span className="p-float-label">
                    <InputText
                      id="username"
                      value={fishSize}
                      onChange={(e) => setFishSize(e.target.value)}
                    />
                    <label htmlFor="username">Size of Fish (Required): </label>
                  </span> */}
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      value={noOfFish}
                      onChange={(e) => setNoOfFish(e.target.value)}
                    />
                    <label htmlFor="username">
                      Number of Fish (Required):{" "}
                    </label>
                  </span>
                </>
              ) : (
                ""
              )}
              {livestock === "Pig" ? (
                <>
                  <span className="p-float-label">
                    <InputText
                      id="username"
                      value={noOfPigs}
                      onChange={(e) => setNoOfPigs(e.target.value)}
                    />
                    <label htmlFor="username">
                      Number of Pigs (Required):{" "}
                    </label>
                  </span>
                </>
              ) : (
                ""
              )}
              <button type="submit" className="green__btn">
                Submit
              </button>
            </form>
          ) : 
           result.livestock_category === "Poultry" ? (
            <div className="mt-5 shadow-xl rounded-lg p-5">
              <h3 className="text-[60px] font-black text-center mt-4 text-[#1D2432]">
                {result.weight}
              </h3>
              <p className="p-2 text-center text-[#555555] text-md mt-2">
                Results
              </p>
              <p className="text-center text-[#555555] mt-5 text-md">
                Livestock Category
              </p>
              <p className="text-center text-md font-bold text-[#1D2432]">
                {result.livestock_category}
              </p>
              <p className="text-center text-[#555555] mt-5 mb-3 text-md">
                Birds Type
              </p>
              <p className="text-center text-md font-bold text-[#1D2432]">
                {result.bird_type}
              </p>
              <p className="text-center text-[#555555] mt-5 text-md">
                Feed Type
              </p>
              <p className="text-center text-md font-bold text-[#1D2432]">
                {result.feed_type}
              </p>
              <p className="text-center text-[#555555] mt-5 text-md">
                Number of Birds{" "}
              </p>
              <p className="text-center text-md font-bold text-[#1D2432]">
                {result.no_of_bird}
              </p>
              <p className="text-center text-[#555555] mt-5 text-md">Space </p>
              <p className="text-center text-md font-bold text-[#1D2432]">
                {result.space}
              </p>

              <div className=" grid gap-2 mt-10">
                <button className="tertiary__btn">Consult a Vet</button>
                <button className="green__btn" onClick={restart}>
                  Restart
                </button>
              </div>
            </div>
          ) :
          livestock === "Pig" ? (
            <div className="mt-5">
              <DataTable value={result} header={header}>
                <Column field="pellet_size" header="Pellet size"></Column>
                <Column field="feed" body={format} header="Feed"></Column>
                <Column field="space_requires" body={numberFormat} header="Space"></Column>
              </DataTable>
             
            </div>
          ) : (
            <div className="mt-5">
              <DataTable value={result} header={header}>
                <Column field="pellet_size" header="Pellet size"></Column>
                <Column field="feed" body={format} header="Feed"></Column>
                <Column field="space_requires" body={numberFormat} header="Space"></Column>
              </DataTable>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
