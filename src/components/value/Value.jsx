import yellowTick from "../../assets/icons/tick-icon/tick-yellow.svg";
import lightGreenTick from "../../assets/icons/tick-icon/tick-green-light.svg";
import darkGreenTick from "../../assets/icons/tick-icon/tick-green-dark.svg";
import redTick from "../../assets/icons/tick-icon/tick-red.svg";
import orangeTick from "../../assets/icons/tick-icon/tick-orange.svg";
import CardOne from "../cardOne/CardOne";

export default function Value() {
  return (
    <div className="section pt-[10vh] pb-[5vh] w-full h-full lg:h-[80vh]  bg-[#F4F4FF]">
      <div className="main w-[90%] md:w-[85%] m-auto relative">
        <div className="title head__two  pb-5">Veterinarian</div>
        <div className=" grid lg:grid-cols-2 gap-1">
          <div className=" pt-5 left flex flex-col gap-4 ">
            <CardOne
              image={yellowTick}
              subtitle="Improving veterinary access across Africa by leveraging on digital innovations"
              title="Vision"
            />
            <CardOne
              image={lightGreenTick}
              subtitle="Connecting veterinarians, vet clinics, and vendors to pet owners and livestock farmers. 
Improving disease monitoring, prediction and diagnosis leveraging on artificial intelligence (AI). 
Improving efficiency in E-commerce across the pet and livestock value chains. 
Fostering partnerships, networking and growth opportunities among vet care community."
              title="Mission"
            />
          </div>
          <div className=" pt-5 left flex flex-col gap-4 ">
            <CardOne
              image={darkGreenTick}
              subtitle="Enabling possiblities for access to animal care"
              title="Tag-Line"
            />
            <CardOne
              image={redTick}
              subtitle="At Vet Konect, we believe it all begins with taking initiative."
              title="Culture"
            />
            <CardOne
              image={orangeTick}
              subtitle="Creative Innovation, Trust, Impact, and Belief"
              title="Core Value"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
