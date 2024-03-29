import aboutImg from "../../assets/bg/about-img.png";
import Cardcolor from "../cardColor/Cardcolor";
import yellow from "../../assets/bg/yellow-shape-bg.svg";
import orange from "../../assets/bg/orange-shape-bg.svg";
import red from "../../assets/bg/light-red-shape-bg.svg";
import green from "../../assets/bg/green-shape-bg.svg";
import people from "../../assets/bg/people-img.png";
import { Link } from "react-router-dom";
import { usersCounter } from "../../utils/adminApiService";
import { useEffect, useState } from "react";

export default function Section() {
  const [counterData, setCounterData] = useState([]);

  const formatNumber = (number) => {
    if(number > 999){
      return `${(number/1000).toFixed(2)}k`
    }
    return number
  }



  const getCounterData = () => {
    usersCounter().then(({ data }) => {
      setCounterData(data);
    });
  };

  useEffect(() => {
    getCounterData();
  }, []);
  return (
    <div className="section pt-[10vh] pb-[10vh] w-[100%]  bg-[white]">
      <div className="main w-[90%] md:w-[85%] m-auto flex flex-col-reverse  md:grid grid-cols-12 ">
        <div className="section__left col-span-8">
          <div className="title head__two">About Vet Konect</div>
          <div className="sub pt-4 md:pt-10 md:w-[80%]">
            <p className=" font-bold text-xl">Overview</p>
            <p className="paragraph pt-3">
              Vet Konect is a digital platform that provides quick access to
              veterinary care by connecting veterinarians, veterinary clinics
              and vendors to pet owners and livestock farmers by leveraging the
              use of technology.
            </p>
            <div className="section__cards flex flex-wrap items-center justify-center md:justify-start pt-10 gap-2">
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
            <div className="people pt-10 flex items-center gap-4">
              <img
                src={people}
                alt=""
                className=" h-[40px] md:h-[60px] object-contain"
              />
              <div className="top font-black text-[1.5rem]">20+</div>
              <small>Team Members</small>
            </div>
            <Link to="/about-us" className="primary__btn mt-10 w-fit ">
              Read About Us
            </Link>
          </div>
        </div>
        <div className="section__right col-span-4">
          <img
            src={aboutImg}
            alt=""
            className=" h-[100%] w-[100%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
