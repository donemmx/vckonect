/* eslint-disable no-unused-vars */
import moment from "moment";
import editIcon from "../../assets/account/edit-icon.svg";
import shareIcon from "../../assets/icons/share-icon.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeData } from "../../atom/storeAtom";
import { actionState } from "../../atom/actionAtom";
import { useNavigate } from "react-router-dom";
import WarningCard from "../warningCard/WarningCard";
import { deletePet } from "../../utils/animalOwnerApiService";
import { toast } from "react-toastify";
import useUpadateReload from "../../hooks/UpdateRelaod";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { deleteCase } from "../../utils/vetApiService";
import { user } from "../../atom/userAtom";

export default function CaseCard({ fullData }) {
  const [store, setStore] = useRecoilState(storeData);
  const [action, setAction] = useRecoilState(actionState);
  const [updateReload] = useUpadateReload();
  const userData = useRecoilValue(user);
  const [filtered, setFiltered] = useState();
  const [openDetail, setOpenDetail] = useState(null);
  const [open, setOpen] = useState(false)
  const location = useNavigate();
  const editPet = () => {
    setStore(fullData);
    setAction("edit");
    location("/vet-add-case");
  };

  const deleteMyCase = () => {
    const payload = {
      user_id: userData?.id,
      id: fullData?.id,
    };
    deleteCase(payload)
      .then(({ data }) => {
        toast.success(data.detail);
        updateReload();
      })
      .catch((err) => toast.error(err.detail));
  };

  const setData = (data, type) => {
    const payload = [data, type];
    setOpenDetail(payload);
  };

  return (
    <>
      <div className="border rounded-lg p-5">
        <div className="flex justify-between flex-wrap gap-2 cursor-pointer" onClick={()=> setOpen(!open)}>
          <div className="pet flex items-center gap-4">
            <div className=" flex flex-col font-bold text-2xl">
              {fullData?.case_title}
            </div>
          </div>
          <div className="flex items-center gap-2 w-fit ml-auto">
            <div className="text-[11px] bg-gray-100 flex items-center justify-center mr-auto lg:ml-auto w-[90px] p-2 border rounded-full">
              {moment(fullData?.date).utc().fromNow()}
            </div>
            <img
              src={editIcon}
              alt=""
              className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
              onClick={editPet}
            />
            <WarningCard
              message={`Are you sure you want to delete ${fullData.case_title}?`}
              header="Confirmation"
              acceptFunction={deleteMyCase}
            />
          </div>
        </div>
        {open ? <div className="py-4">
          {openDetail ? (
            <div className="user  flex flex-col justify-center items-center w-[65%] lg:w-[20%] mx-auto mt-[0vh]">
              <h4 className=" font-bold pt-3">Users’ {openDetail[1]}</h4>
              <p className="text-sm text-center text-[#666666]">
                {openDetail[0]}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Client Name</div>

            <div className="value">{fullData?.client_name}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Client Phone Number</div>

            <div className="value">{fullData?.client_phone}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Pet or Farm</div>

            <div className="value">{fullData?.case_type}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">
              {fullData?.case_type === "Pet" ? "Pet Name" : "Farm  Name"}
            </div>
            <div className="value">
              {fullData?.case_type === "Pet"
                ? fullData?.pet_name
                : fullData?.farm_name}
            </div>
          </div>
          {fullData?.case_type === "Pet" ? (
            <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
              <div className="title font-bold">Specie</div>
              <div className="value">{fullData?.specie}</div>
            </div>
          ) : (
            ""
          )}
          {fullData?.case_type === "Pet" ? (
            <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
              <div className="title font-bold">
                {fullData?.case_type === "Pet" ? "Breed" : ""}
              </div>
              <div className="value">{fullData?.breed}</div>
            </div>
          ) : (
            ""
          )}
          {fullData?.case_type === "Pet" ? (
            <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
              <div className="title font-bold">Age</div>
              <div className="value">{fullData?.age}</div>
            </div>
          ) : (
            ""
          )}
          {fullData?.case_type === "Pet" ? (
            <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
              <div className="title font-bold">
                Sex
              </div>
              <div className="value">{fullData?.sex}</div>
            </div>
          ) : (
            ""
          )}
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">
              {fullData?.case_type === "Pet" ? "Pet Number" : "Farm Number"}
            </div>
            <div className="value">
              {fullData?.case_type === "Pet"
                ? fullData?.pet_id
                : fullData.farm_id}
            </div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Disease Diagnosis</div>
            <div className="value">{fullData?.disease_diagnostic}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Clinical Signs</div>
            <div className="value">{fullData?.clinical_sign}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Date Occured</div>
            <div className="value">
              {moment(fullData?.date).format("DD-MM-YYYY")}
            </div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Date Reported</div>
            <div className="value">
              {/* {moment(fullData?.date).format("DD-MM-YYYY")} */}
            </div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">History</div>
            <div className="value">{fullData?.history}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Differential Diagnosis</div>
            <div className="value">{fullData?.differential_diagnosis}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Tentative Diagnosis</div>
            <div className="value">{fullData?.tentative_diagnoistic}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Confirmatory Diagnosis</div>
            <div className="value"></div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Mortality</div>
            <div className="value">{fullData?.motality}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Treatment Regimen</div>
            <div className="value">{fullData?.treatment_regiment}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Clinic Physical Address</div>
            <div className="value">{fullData?.clinic_physical_address}</div>
          </div>
          <div className="grouped-pets px-4 pt-1 flex items-center justify-between">
            <div className="title font-bold">Mobile Vet</div>
            <div className="value">{fullData?.mobile_veterinarian}</div>
          </div>
        </div> : ''}
      </div>
    </>
  );
}
//  {/* {moment(res[1]).format("DD-MM-YYYY")} */}
