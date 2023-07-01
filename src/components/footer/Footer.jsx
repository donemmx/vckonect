import logo from "../../assets/logo/vc-logo.svg";
import icon1 from "../../assets/icons/socials/linkedin.svg";
import icon2 from "../../assets/icons/socials/twitter-icon.svg";
import icon3 from "../../assets/icons/socials/discord-icon.svg";
import icon4 from "../../assets/icons/socials/slack-icon.svg";
import icon5 from "../../assets/icons/socials/facebook-icon.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" w-[100vw] h-full pb-[7vh] lg:h-[38vh] bg-[#F1F1F1] ">
      <div className="w-[90%] grid gap-10 grid-cols-3 md:grid-cols-12 m-auto pt-10">
        <div className="group flex flex-col items-start gap-2 col-span-full md:col-span-4">
          <img src={logo} alt="" className="h-7" />
          <p className="pt-4 text-sm">100, Wuse Road, Abuja, Nigeria.</p>
          <p className="text-sm"> hello@vkonnect.com | +10020001234 </p>
          <div className="icons flex items-center gap-3">
            <img src={icon1} alt="" />
            <img src={icon2} alt="" />
            <img src={icon3} alt="" />
            <img src={icon4} alt="" />
            <img src={icon5} alt="" />
          </div>
          <p className="text-sm"> Copyright Vetkonect 2023 </p>
        </div>
        <div className="group col-span-full md:col-span-4">
          <div className="title">Quick Links</div>
          <div className="group list-none underline text-sm grid gap-2 pt-3 cursor-pointer">
            <Link to='/about-us'>About Us</Link>
            <Link to='/feed-calculator' >Feed Calculator</Link>
            <Link to='/disease-prediction'>Disease Predictor</Link>
            <li>Blog Post</li>
            <li>Chat Forum</li>
          </div>
        </div>
        <div className="group col-span-full  md:col-span-4">
          <div className="group flex justify-between items-center bg-white p-2 rounded-full">
            <input type="text" placeholder="enter email"  className=" outline-none w-full px-4"/>
            <div className="button flex text-sm p-3 bg-gray-700 text-white rounded-full" >
              <img src="" alt="" />
              Submit
            </div>
          </div>
          <p className="pt-3">Subscribe to our newsletter for update on our initiatives</p>
          <p className="text-sm underline pt-3 ">Privacy Policy</p>
          <p className="text-sm underline ">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
}
