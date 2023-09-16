import vetImg from "../../assets/bg/vet-img.png";
import CardOne from "../cardOne/CardOne";
import vetIcon from "../../assets/icons/search-icons/vet-yellow.svg";
import arrowGreen from "../../assets/icons/arrow-icons/next-icon-green.svg";
import arrowYellow from "../../assets/icons/arrow-icons/next-icon-yellow.svg";
import searchGreen from "../../assets/icons/search-icons/search-icon-green.svg";

export default function SectionTwo() {
  return (
    <div className="section pt-[10vh] pb-[5vh] w-full h-[100vh]  bg-[#FBFBFB]">
      <div className="main w-[90%] md:w-[85%] m-auto relative ">
        <div className="title head__two">Veterinarian</div>
        <div className="left absolute top-10 lg:top-[14%] ">
          <CardOne
            image={searchGreen}
            btnText="Browse Now"
            icon={arrowGreen}
            subtitle="Discover nearby veterinarians who can provide quality vet care for your pets/livestock via our platform.."
            title="Discover a vet in your area"
            route={"/search"}
          />
        </div>
        <div className="right absolute bottom-[-30%]  lg:bottom-[-10%] lg:top-[38%] right-[0%]">
          <CardOne
            image={vetIcon}
            btnText="Get Started"
            icon={arrowYellow}
            subtitle="Create a vet account in (3) three simple step to be visible to nearby clients as a licensed Veterinarian."
            title="Register as a vet"
            route={"/onboard-vet-account"}
          />
        </div>
        <div className="sectionBg flex items-center justify-center">
          <img
            src={vetImg}
            alt=""
            className=" w-[75vh] pt-[22vh] lg:w-[100vh] md:pt-2  lg:h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
