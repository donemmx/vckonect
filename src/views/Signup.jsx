import AccountCard from "../components/accountCard/AccountCard";
import animalOwner from '../assets/icons/create-account/animal-owner-signup-icon.svg'
import vetIcon from '../assets/icons/create-account/vet-signup-icon.svg'
import blueArrow from '../assets/icons/arrow-icons/next-icon-blue.svg';
export default function Signup() {
  return (
    <div className="login flex justify-center items-center h-[100vh]">
    <div className=" w-[80%] lg:w-[35%] md:w-[60%]">
      <h2 className="title font-black text-center head__two">Create Account</h2>
      <div className="pt-2 subtitle paragraph text-center">
      Create a new account to become a user or a veterinarians on vet konect by clicking on one of the cards below
      </div>
      <div className="form flex flex-col gap-3 pt-6">
        <AccountCard image={animalOwner} icon={blueArrow} title='As an Animal Owner' subtitle='Discover vets, vet clinics, and vendors around you' link={'/onboard-animal-owner-account'}  />
        <AccountCard image={vetIcon} icon={blueArrow} title='Become a Vet' subtitle='Join our pool of veterinarians on vet konect'  link={'/onboard-vet-account'}    />
       
      </div>
    </div>
  </div>
  )
}
