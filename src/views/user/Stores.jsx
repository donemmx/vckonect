/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import addIcon from "../../assets/icons/add-icon.svg";
import StoreCard from "../../components/storeCard/StoreCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStore } from "../../utils/userApiService";
import Loading from "../../components/loading/Loading";
import { reloadStore } from "../../atom/reloadAtom";
import { actionState } from "../../atom/actionAtom";
import { Paginator } from "primereact/paginator";

export default function Stores() {
  const userData = useRecoilValue(user);
  const reload = useRecoilValue(reloadStore);
  const [action, setAction] = useRecoilState(actionState);
  const location = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allStores, setAllStores] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    const myData = allStores.slice(event.first, event.rows + event.first);
    setCurrentPage(myData);
    console.log(myData);
    console.log(allStores);

  };

  const checker = (route) => {
    setAction("add");
    if (userData?.role === "Veterinarian") {
      location(`/vet-${route}`);
    } else {
      location(`/animal-owner-${route}`);
    }
  };

  useEffect(() => {
    getStore({ id: userData?.id, role: userData?.role }).then(({ data }) => {
      setAllStores(data);
      setLoading(false);
      const event ={
        first: 0,
        rows: 10
      }
      onPageChange(event)
      
    });
  }, [reload]);

  return (
    <div>
      <div className=" font-black text-2xl">Store</div>
      <button
        onClick={() => checker("add-store")}
        className="border-[1px] hover:border-[#52CE06] cursor-pointer  flex items-center justify-between p-3 rounded-[18px] mt-5 mb-5 w-full"
      >
        <p className="font-bold px-2">Add New Store</p>
        <img src={addIcon} alt="" className="w-[40px]" />
      </button>

      <div className=" grid md:grid-col-2 lg:grid-cols-4 gap-4 w-full mb-10">
        {loading
          ? [1, 2, 3, 4].map((data) => (
              <div className="w-full mt-10" key={data}>
                <Loading />
              </div>
            ))
          : ""}
      </div>
      <div className="">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-center">
          {currentPage?.map((res) => (
            <StoreCard
              availability={res.availability}
              storeName={res.store_name}
              storeLocation={res.location}
              storePhone={res.phone_number}
              image={res.picture}
              fullData={res}
              store_id={res.id}
              key={res.id}
            />
          ))}
        </div>
        <Paginator
        className="mt-10"
          first={first}
          rows={rows}
          totalRecords={120}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
