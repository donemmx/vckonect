import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function FeedCalculator() {
  const [livestock, setlivestock] = useState(null);
  const [bridType, setBridType] = useState(null);
  const [feedType, setFeedType] = useState(null);
  const livestocks = [
    { name: "Poultry", value: "poultry" },
    { name: "Fishes", value: "fishes" },
    { name: "Pigs", value: "pigs" },
  ];

  const bridTypes = ["Broilers", "Layers"];
  const broilersFeedTypes = ["Starter", "Finisher"];
  const layersFeedTypes = ["Chick Mash", "Growers Mash", "Layers Mash/Pellet"];

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
          <div className="form flex flex-col gap-3 pt-6">
            <span className="p-float-label">
              <Dropdown
                value={livestock}
                onChange={(e) => setlivestock(e.value)}
                options={livestocks}
                optionLabel="name"
                placeholder=" "
                className="w-full"
              />
              <label htmlFor="livestock">Livestock Category (Required): </label>
            </span>
            {livestock === "poultry" ? (
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
            {livestock === "poultry" && bridType === "Broilers" ? (
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
            {livestock === "poultry" && bridType === "Layers" ? (
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
            {livestock === "poultry" && bridType !== null ? (
              <>
                {bridType === "Broilers" ? (
                  <span className="p-float-label">
                    <InputText id="username" />
                    <label htmlFor="username">Number of Weeks (Required)</label>
                  </span>
                ) : (
                  ""
                )}
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Number of Birds (Required)</label>
                </span>
              </>
            ) : (
              ""
            )}
            {livestock === "fishes" ? (
              <>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Size of Fish (Required): </label>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Number of Fish (Required): </label>
                </span>
              </>
            ) : (
              ""
            )}
            {livestock === "pigs" ? (
              <>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Number of Pigs (Required): </label>
                </span>
              </>
            ) : (
              ""
            )}
            <button className="green__btn" disabled>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
