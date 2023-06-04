import CardOne from "../components/cardOne/CardOne";
import Hero from "../components/hero/Hero";
import Section from "../components/section/Section";
import SectionTwo from "../components/sectionTwo/sectionTwo";
import vetClinic from "../assets/bg/vet-clinic.png";
import vetStore from "../assets/bg/vet-store.png";
import searchYellow from '../assets/icons/search-icons/search-icon-yellow.svg'
import searchBlue from '../assets/icons/search-icons/search-icon-blue.svg'
import vetIcon from '../assets/icons/search-icons/vet-icon-red.svg'
import storeIcon from '../assets/icons/search-icons/store-icon-green.svg'
import arrowGreen from '../assets/icons/arrow-icons/next-icon-green.svg'
import arrowYellow from '../assets/icons/arrow-icons/next-icon-yellow.svg'
import arrowBlue from '../assets/icons/arrow-icons/next-icon-blue.svg'
import arrowRed from '../assets/icons/arrow-icons/next-icon-red.svg'

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
                <CardOne image={searchBlue} title='Discover a vet clinic in your area' subtitle='Discover nearby vet clinics that can provides quality vet care for your pets/livestock via our platform.' btnText='Browse Now' icon={arrowBlue}/>
                <CardOne image={vetIcon} title='Register your vet clinic' subtitle='Create a vet Clinic account in (3) three simple step on our platform to make your clinic visible to nearby clients.' btnText='Get Started' icon={arrowRed} />
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
              <CardOne  title='Discover nearby vet vendor & stores' subtitle='Discover nearby vet store or vendor that can supply quality vet care products for your pets & livestock.' btnText='Browse Now' icon={arrowYellow} image={searchYellow}/>
              <CardOne title='Register your store' subtitle='Create a vet vendor account in (3) three simple step on to make your vet store visible to nearby customers.' btnText='Get Started' icon={arrowGreen} image={storeIcon}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
