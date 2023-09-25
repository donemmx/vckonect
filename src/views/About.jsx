import aboutImg from "../assets/bg/about-img.png";
import yellow from "../assets/bg/yellow-shape-bg.svg";
import orange from "../assets/bg/orange-shape-bg.svg";
import red from "../assets/bg/light-red-shape-bg.svg";
import green from "../assets/bg/green-shape-bg.svg";
import Cardcolor from "../components/cardColor/Cardcolor";
import Value from "../components/value/Value";
import Footer from "../components/footer/Footer";
import flags from "../assets/icons/flag-high.svg";
import { useEffect, useState } from "react";
import { usersCounter } from "../utils/adminApiService";

export default function About() {
  const [counterData, setCounterData] = useState([])
  const formatNumber = (number) => {
    if(number > 999){
      return `${(number/1000).toFixed(2)}k`
    }
    return number
  }

  
  const getCounterData = () => {
    usersCounter().then(({data})=> {
     setCounterData(data)
    })
  }

  useEffect(()=> {
      getCounterData()
  }, [])
  return (
    <>
      <div className="section pt-[20vh] pb-[10vh] w-[100%]  bg-[white]">
        <div className="main w-[90%] md:w-[85%] m-auto flex flex-col-reverse  md:grid grid-cols-12 ">
          <div className="section__left col-span-6">
            <div className="title head__two">About Vet Konect</div>
            <div className="sub pt-4 md:pt-10 md:w-[80%]">
              <p className=" font-bold text-xl">Overview</p>
              <p className="paragraph pt-3">
                Vet Konect is a digital platform that provides quick access to
                veterinary care by connecting veterinarians, veterinary clinics
                and vendors to pet owners and livestock farmers by leveraging
                the use of technology.
              </p>
              <div className="section__cards flex w-[100%] md:w-[90%] flex-wrap items-center justify-center pt-10 gap-4">
              <Cardcolor
                text={"Number of Veterinarians"}
                title={formatNumber(counterData?.veterinarian)}
                image={green}
              />
              <Cardcolor
                text={"Number of Vet Clinics"}
                title={formatNumber(counterData?.clinic)}
                image={yellow}
              />
              <Cardcolor
                text={"Store"}
                title={formatNumber(counterData?.store)}
                image={orange}
              />
              <Cardcolor
                text={"Pets / Farms"}
                title={formatNumber(counterData?.farm + counterData?.pet)}
                image={red}
              />
              </div>
            </div>
          </div>
          <div className="section__right col-span-6">
            <img
              src={aboutImg}
              alt=""
              className=" h-[100%] w-[100%] object-contain"
            />
          </div>
        </div>
      </div>
      <Value />
      <div className="section h-[40vh] flex items-center justify-center  bg-[#FFFAF4]">
        <div className="main gap-4  w-[90%] md:w-[85%] m-auto flex flex-col justify-center ">
          <div className="title text-center font-black head__two pb-4 ">
            Area Covered on Map (Africa)
          </div>
          <div className="flex justify-center items-center">
            <img
              src={flags}
              alt=""
              className="  w-[70%] h-[70%]  object-contain"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
