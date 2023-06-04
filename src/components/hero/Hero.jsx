import heroImg from "../../assets/bg/hero-img.png";
import flags from "../../assets/bg/flags.png";
import location from "../../assets/icons/marker-icon.svg";
import search from "../../assets/icons/search-icons/search-icon-white.svg";
export default function Hero() {
  return (
    <div className="hero pt-[10vh] pb-10 w-[100%] h-[100%] md:h-[100vh] bg-hero bg-cover bg-bottom">
      <div className="hero__body w-[90%] md:w-[85%] h-[100%] flex flex-col-reverse m-auto space-y-2 md:flex md:flex-row space-x-2  justify-between">
        <div className="hero__left pt-[3rem] md:pt-[6rem] flex flex-col space-y-4 lg:w-[40%]">
          <div className="title font-black head__one ">
            Quality veterinary care at your fingertips
          </div>
          <div className="subtitle paragraph">
            An easy to use platform for everyone to get quality veterinary care
            quickly and easily.
          </div>
          <div className="search pt-5">
            <div className="form__group flex space-x-4 items-center p-2 bg-white rounded-full">
              <img src={location} alt="" className=" h-[26px] px-3 object-contain" />
              <input type="text" placeholder="Type in your location"  className=" outline-none p-1 w-full"/>
              <div className="search__btn  bg-gray-600 h-[45px] w-[80px] flex items-center justify-center rounded-r-full">
                <img src={search} alt="" className=" h-[15px]"  />
              </div>
            </div>
          </div>
          <div className="image w-[90%] pt-4">
            <img
              src={flags}
              alt=""
              className=" grayscale w-[100%] h-[100%]  object-contain"
            />
          </div>
        </div>
        <div className="hero__right h-[40vh] md:h-[80vh]">
          <img
            src={heroImg}
            alt=""
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
