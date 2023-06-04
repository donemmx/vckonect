import vetImg from "../../assets/bg/vet-img.png";
import CardOne from "../cardOne/CardOne";

export default function SectionTwo() {
  return (
    <div className="section pt-[10vh] pb-[5vh] w-full h-[100vh]  bg-[#FBFBFB]">
      <div className="main w-[90%] md:w-[85%] m-auto relative ">
        <div className="title head__two">Veterinarian</div>
        <div className="left absolute top-10 lg:top-[14%] ">
          <CardOne />
        </div>
        <div className="right absolute bottom-[-20%]  lg:bottom-[-10%] lg:top-[38%] right-[0%]">
          <CardOne />
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
