import CardOne from "../components/cardOne/CardOne";
import Hero from "../components/hero/Hero";
import Section from "../components/section/Section";
import SectionTwo from "../components/sectionTwo/sectionTwo";
import vetClinic from "../assets/bg/vet-clinic.png";
import vetStore from "../assets/bg/vet-store.png";
export default function Home() {
  return (
    <div>
      <Hero />
      <Section />
      <SectionTwo />
      <div className="vetClinic flex pt-[10vh] pb-10 w-[100%] h-[100%] md:h-[100vh] bg-cover bg-[#F4F4FF]">
        <div className="flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black head__two ">Vet Clinic</div>
          <div className="grouped flex flex-col-reverse md:flex md:flex-row space-x-2  justify-between">
            <div className="left pt-[4%]">
              <div className="grouped flex flex-col gap-5">
                <CardOne />
                <CardOne />
              </div>
            </div>
            <div className="right">
              <img
                src={vetClinic}
                alt=""
                className=" h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="vetVendor  flex pt-[10vh] pb-10 w-[100%] h-[100%] md:h-[95vh] bg-cover bg-[#FBFBFB]">
        <div className="body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black head__two ">Vet Vendor & Stores</div>
          <div className="grouped flex flex-col md:flex md:flex-row space-x-2  justify-between">
            <div className="left lg:w-[50%]">
            <img
                src={vetStore}
                alt=""
                className=" h-full pt-[4%] w-full object-contain"
              />
            </div>
            <div className="right pt-[4%] flex flex-col gap-5" >
              <CardOne />
              <CardOne />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
