import CardOne from "../components/cardOne/CardOne";
import Hero from "../components/hero/Hero";
import Section from "../components/section/Section";
import SectionTwo from "../components/sectionTwo/SectionTwo";
import vetClinic from "../assets/bg/vet-clinic.png";
import vetStore from "../assets/bg/vet-store.png";
import chatImg from "../assets/bg/chat-img.png";
import searchYellow from "../assets/icons/search-icons/search-icon-yellow.svg";
import searchBlue from "../assets/icons/search-icons/search-icon-blue.svg";
import diseaseIcon from "../assets/icons/search-icons/disease-predictor-icon.svg";
import calculatorIcon from "../assets/icons/search-icons/feed-calculator-icon.svg";
import vetIcon from "../assets/icons/search-icons/vet-icon-red.svg";
import chatIcon from "../assets/icons/search-icons/chat-icon-yellow.svg";
import sendIcon from "../assets/icons/search-icons/send-icon-green.svg";
import storeIcon from "../assets/icons/search-icons/store-icon-green.svg";
import arrowGreen from "../assets/icons/arrow-icons/next-icon-green.svg";
import arrowYellow from "../assets/icons/arrow-icons/next-icon-yellow.svg";
import arrowMixed from "../assets/icons/arrow-icons/next-icon-mixed.svg";
import arrowOrange from "../assets/icons/arrow-icons/next-icon-orange.svg";
import arrowBlue from "../assets/icons/arrow-icons/next-icon-blue.svg";
import arrowRed from "../assets/icons/arrow-icons/next-icon-red.svg";
import Footer from "../components/footer/Footer";
import Vetcard from "../components/vetCard/Vetcard";
import { useEffect, useState } from "react";
import { getVeterinarianByFilter } from "../utils/vetApiService";
import Loading from "../components/loading/Loading";
import userImage from '../assets/account/image-1.png'

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [vets, setVets] = useState([]);

  const getVetsData = async () => {
    await getVeterinarianByFilter({ name: "" }).then(({ data }) => {
      setVets(data.slice(0, 4));
      setLoading(false);
    });
  };

  useEffect(() => {
    getVetsData();
  }, []);
  return (
    <div>
      <Hero />
      <Section />
      <SectionTwo />
      <div className="vetClinic flex pt-[10vh] pb-10 w-[100%] h-[100%]  md:h-[50vh] lg:h-[100vh] bg-cover bg-[#F4F4FF]">
        <div className="flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black head__two ">Vet Clinic</div>
          <div className="grouped flex flex-col-reverse md:flex md:flex-row space-x-2  justify-between">
            <div className="left pt-[4%]">
              <div className="grouped flex flex-col gap-5">
                <CardOne
                  image={searchBlue}
                  title="Discover a vet clinic in your area"
                  subtitle="Discover nearby vet clinics that can provides quality vet care for your pets/livestock via our platform."
                  btnText="Browse Now"
                  icon={arrowBlue}
                  route={"/search"}
                />
                <CardOne
                  image={vetIcon}
                  title="Register your vet clinic"
                  subtitle="Create a vet Clinic account in (3) three simple step on our platform to make your clinic visible to nearby clients."
                  btnText="Get Started"
                  icon={arrowRed}
                  route={"/vet-add-clinic"}
                />
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
      <div className="vetVendor  flex pt-[10vh] pb-10 w-[100%] h-[100%]  md:h-[50vh] lg:h-[100vh] bg-cover bg-[#FBFBFB]">
        <div className="body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black head__two ">Vet Vendor & Stores</div>
          <div className="grouped flex flex-col-reverse md:flex md:flex-row space-x-2  justify-between">
            <div className="left lg:w-[50%]">
              <img
                src={vetStore}
                alt=""
                className=" h-full pt-[4%] w-full object-contain"
              />
            </div>
            <div className="right pt-[4%] flex flex-col gap-5">
              <CardOne
                title="Discover nearby vet vendor & stores"
                subtitle="Discover nearby vet store or vendor that can supply quality vet care products for your pets & livestock."
                btnText="Browse Now"
                icon={arrowYellow}
                image={searchYellow}
                route={"/vet-home"}
              />
              <CardOne
                title="Register your store"
                subtitle="Create a vet vendor account in (3) three simple step on to make your vet store visible to nearby customers."
                btnText="Get Started"
                icon={arrowGreen}
                image={storeIcon}
                route={"/vet-stores"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="calculator flex pt-[10vh] pb-10 w-[100%] h-[100%] md:h-[50vh] bg-[#FFFAF4]">
        <div className="main hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black text-center head__two ">
            Feed Calculator & Disease Predictor
          </div>
          <div className="grouped flex justify-center flex-wrap items-center gap-4 pt-10">
            <CardOne
              image={calculatorIcon}
              title="Feed Calculator"
              subtitle="Discover the appropriate amount of feed to give your livestock to stay healthy and productive"
              btnText="Try it Now"
              icon={arrowOrange}
              route={"/vet-feed-calculator"}
            />
            <CardOne
              image={diseaseIcon}
              title="Disease Predictor"
              subtitle="Diagnose and treat various diseases in animals to improving their health and well-being"
              btnText="Try it Now"
              icon={arrowMixed}
              route={"/vet-disease-prediction"}
            />
          </div>
        </div>
      </div>
      <div className="vetClinic flex pt-[10vh] pb-10 w-[100%] h-[100%] md:h-[50vh] lg:h-[100vh] bg-cover bg-[#FBFBFB]">
        <div className="flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="title font-black head__two ">
            Forum Chat & Direct Messages
          </div>
          <div className="grouped flex flex-col md:flex md:flex-row space-x-2  justify-between">
            <div className="left pt-[4%]">
              <div className="grouped flex flex-col gap-5">
                <CardOne
                  image={chatIcon}
                  title="Join our forum chat"
                  route={"/vet-forum"}
                  subtitle="Connect with others to share and receive knowledge, experiences, and advice on pet and livestock health and behavior issues"
                  btnText="Browse Now"
                  icon={arrowYellow}
                />
                <CardOne
                  image={sendIcon}
                  title="Send a direct message"
                  route={"/vet-forum"}
                  subtitle="Connect with others by sending a direct message, and also receiving and replying the messages on the direct message tab option on the forum chat page."
                  btnText="Get Started"
                  icon={arrowGreen}
                />
              </div>
            </div>
            <div className="right">
              <img
                src={chatImg}
                alt=""
                className=" h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section flex pt-[10vh] pb-10 w-[100%] h-[100%] lg:h-[100vh] bg-cover bg-[#FFFAF4]">
        <div className="body flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <div className="flex justify-between">
            <div className="text-3xl font-extrabold">Testimonials</div>
            <div className="flex items-center gap-3">
              <button className="h-12 w-12 shadow-lg rounded-full bg-white justify-center items-center flex text-slate-300">
                &larr;
              </button>
              <button className="h-12 w-12 shadow-lg rounded-full bg-white justify-center items-center flex">
                &rarr;
              </button>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-lg">
              <div className="text-2xl lg:text-3xl text-center font-semibold leading-10 mb-20">What are people saying about Vetkonect?</div>
              <div className="bg-white rounded-xl shadow-lg relative p-10">
                <div className="h-20 w-20     absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-0.5">
                  <img src={userImage} alt="" className="w-full h-full object-cover shadow-lg rounded-full" />
                </div>
                <div className="text-center mt-7">
                  <div className="mb-12">
                    &quot;On the Window&apos;s talking painted pasture yet it express parties use.
                    Sure last upon he came as knew next. Of believed or diverted no.&quot;
                  </div>
                  <div className="text-lg">
                    <div className="font-semibold">Dr. Amaechi Anayor</div>
                    <div className="mb-5 text-xs font-thin">Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section flex pt-[10vh] pb-10 w-[100%] h-[100%] lg:h-[100vh] bg-cover bg-[#fff]">
        <div className="body flexBody hero__body w-[90%] md:w-[85%] h-[100%] m-auto">
          <p className="text-sm">
            You can see the list of most contacted veterinarians around you
          </p>
          <div className="title font-black head__two ">
            Most Contacted Nearby Vet
          </div>
          <div className=" grid md:grid-col-2 lg:grid-cols-4 gap-4 w-full mb-10">
            {loading
              ? [1, 2, 3, 4].map((data) => (
                  <div className="w-full mt-10" key={data}>
                    <Loading />
                  </div>
                ))
              : ""}
          </div>
          <div className="grid md:grid-col-2 lg:grid-cols-4 gap-4 w-full">
            {vets?.map((res) => (
              <Vetcard key={res} fullData={res} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
