import aboutImg from "../assets/bg/about-img.png";
import yellow from "../assets/bg/yellow-shape-bg.svg";
import orange from "../assets/bg/orange-shape-bg.svg";
import red from "../assets/bg/light-red-shape-bg.svg";
import green from "../assets/bg/green-shape-bg.svg";
import Cardcolor from "../components/cardColor/Cardcolor";


export default function About() {
  return (
    <div className="section pt-[20vh] pb-[10vh] w-[100%]  bg-[white]">
      <div className="main w-[90%] md:w-[85%] m-auto flex flex-col-reverse  md:grid grid-cols-12 ">
        <div className="section__left col-span-6">
          <div className="title head__two">About Vet Konect</div>
          <div className="sub pt-4 md:pt-10 md:w-[80%]">
            <p className=" font-bold text-xl">Overview</p>
            <p className="paragraph pt-3">
              Vet Konect is a digital platform that provides quick access to
              veterinary care by connecting veterinarians, veterinary clinics
              and vendors to pet owners and livestock farmers by leveraging the
              use of technology.
            </p>
            <div className="section__cards flex w-[90%] flex-wrap pt-10 gap-4">
              <Cardcolor
                text={"Number of Veterinarians"}
                title={"8k+"}
                image={green}
              />
              <Cardcolor
                text={"Number of Vet Clinics"}
                title={"5.7k+"}
                image={yellow}
              />
              <Cardcolor
                text={"Vet Vendor & Store"}
                title={"9.3k+"}
                image={orange}
              />
              <Cardcolor
                text={"Pet Owners & livestock Farmers"}
                title={"2m+"}
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
  )
}
