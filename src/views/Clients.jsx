import ClientCard from "../components/clientCard/ClientCard";
import user2 from "../assets/icons/user-2.png";
import user3 from "../assets/icons/user-3.png";
export default function Clients() {

  return (
  <div className="">
        <div className=" font-black text-2xl">My Clients</div>

      <ClientCard user={user2}  name='Dr. Amechi'  />
      <ClientCard user={user3} name='Treequote Store'  />
  </div>
  )
  
}
