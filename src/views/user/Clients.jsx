/* eslint-disable no-unused-vars */
import ClientCard from "../../components/clientCard/ClientCard";
import user2 from "../../assets/icons/user-2.png";
import { useEffect, useState } from "react";
import { getClient } from "../../utils/userApiService";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import AdminCardLoading from "../../components/loading/AdminCardLoading";
export default function Clients() {
  const userData = useRecoilValue(user);
  const [loading, setLoading] = useState(true);
  const [allClients, SetAllClients] = useState([]);

  useEffect(() => {
    getClient({ user_id: userData.id }).then((res) => {
      SetAllClients(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="">
      <div className=" font-black text-2xl">My Clients</div>
      {loading ? (
        <div className="grid gap-2">
          <AdminCardLoading />
          <AdminCardLoading />
          <AdminCardLoading />
        </div>
      ) : (
        <>
          {allClients?.map((res) => (
            <ClientCard key={res.id} data={res} />
          ))}
        </>
      )}
    </div>
  );
}
