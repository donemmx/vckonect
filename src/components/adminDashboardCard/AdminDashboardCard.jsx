import AdminWarningCard from "../AdminWarningCard/AdminWarningCard";
import CurrencyFormatter from "currency-formatter-react";
import AdminCardLoading from "../loading/AdminCardLoading";
import editIcon from "../../assets/account/edit-icon.svg";
import WarningCard from "../warningCard/WarningCard";
import { Avatar } from "primereact/avatar";
import React from 'react'
export default function AdminDashboardCard({
  image,
  title,
  name,
  time,
  approveButtonText,
  rejcetButtonText,
  approveFunction,
  message,
  duration,
  price,
  loading,
  edit,
  deleteCard,
  deleteFormDataFunction,
  editFunction,
}) {
  return (
    <>
      {loading ? (
        <AdminCardLoading />
      ) : (
        <div className=" bg-white grid md:grid-cols-[8fr_4fr] items-center flex-col gap-2 lg:flex-row justify-between p-5 border rounded-lg">
          <div className="flex items-center gap-4 w-full">
            {image && image.length > 64 ? (
              <div className=" h-[65px] w-[65px]">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            ) : (
              <Avatar
                    label={title.split("")[0].toUpperCase()}
                    size="xlarge"
                    className=" !bg-green-500 !text-white"
                    shape="circle"
                  />
            )}
            <div className="flex gap-6 items-center">
              <div className="">
                <div className="font-bold text-sm">{title}</div>
                <div className=" text-[11px]">{name}</div>
                {duration ? <div className=" text-[11px]">{duration}</div> : ""}
              </div>
              <div className="">
                {price ? (
                  <div className=" text-[26px] font-black">
                    <CurrencyFormatter
                      value={price.slice(3)}
                      thousandSeparator={true}
                      currency={price.slice(0, 3)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full">
            <AdminWarningCard
              approveButtonText={approveButtonText}
              rejcetButtonText={rejcetButtonText}
              acceptFunction={approveFunction}
              message={message}
              loading={loading}
            />
            <>
              {edit ? (
                <img
                  src={editIcon}
                  alt=""
                  className=" p-2 mb-2 h-[35px] w-[35px] bg-white rounded-full border-[1px] cursor-pointer border-[#EBEBEB] hover:border-green-400 hover:bg-green-100 transition-all ease-in-out"
                  onClick={editFunction}
                />
              ) : (
                ""
              )}
            </>
            <>
              {deleteCard ? (
                <WarningCard
                  message={message}
                  header="Confirmation"
                  acceptFunction={deleteFormDataFunction}
                />
              ) : (
                ""
              )}
            </>
            <>
              {time ? (
                <div className="text-[11px] bg-gray-100 flex text-center justify-center mr-auto lg:ml-auto p-2 w-[140px] px-4 border rounded-full">
                  {time}
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
}
