import logo from "../../assets/logo/vc-logo.svg";
import icon1 from "../../assets/icons/socials/linkedin.svg";
import icon2 from "../../assets/icons/socials/twitter-icon.svg";
import icon4 from "../../assets/icons/socials/slack-icon.svg";
import icon5 from "../../assets/icons/socials/facebook-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { user } from "../../atom/userAtom";

export default function Footer() {
  const [data, setData] = useRecoilState(user);
  const location = useNavigate();
  const checker = (route) => {
    if (data?.role) {
      if (data?.role === "Veterinarian") {
        location(`/vet-${route}`);
      } else if (data?.role === "Animal Owner") {
        location(`/animal-owner-${route}`);
      } else {
        location(`/admin-${route}`);
      }
    } else {
      location("/login");
    }
  };

  return (
    <div className=" w-[100vw] h-full pb-[7vh] lg:h-[38vh] bg-[#F1F1F1] ">
      <div className="w-[90%] grid gap-10 grid-cols-3 md:grid-cols-12 m-auto pt-10">
        <div className="group flex flex-col items-start gap-2 col-span-full md:col-span-4">
          <img src={logo} alt="" className="h-7" />
          <p className="pt-4 text-sm">100, Wuse Road, Abuja, Nigeria.</p>
          <p className="text-sm"> hello@vkonnect.com | +10020001234 </p>
          <div className="icons flex items-center gap-3">
            <a
              href="https://twitter.com/vetkonect"
              target="_"
              referrerPolicy="no-referral"
            >
              {" "}
              <img src={icon2} alt="" />
            </a>
            <a
              href="https://facebook.com/vetkonect"
              target="_"
              referrerPolicy="no-referral"
            >
              {" "}
              <img src={icon5} alt="" />{" "}
            </a>
            <a
              href="https://linkedin.com/in/vet-konect-68a2b31a6"
              target="_"
              referrerPolicy="no-referral"
            >
              {" "}
              <img src={icon1} alt="" />{" "}
            </a>
            <a
              href="https://youtube.com/@vetkonect"
              target="_"
              referrerPolicy="no-referral"
            >
              {" "}
              <img src={icon4} alt="" />{" "}
            </a>
          </div>
          <p className="text-sm"> Copyright Vetkonect 2023 </p>
        </div>
        <div className="group col-span-full md:col-span-4">
          <div className="title">Quick Links</div>
          <div className="group list-none underline text-sm grid gap-2 pt-3 cursor-pointer">
            <Link to="/about-us">About Us</Link>
            <div
              onClick={() => checker("feed-calculator")}
              className=" cursor-pointer"
            >
              Feed Calculator
            </div>
            <div
              onClick={() => checker("disease-prediction")}
              className=" cursor-pointer"
            >
              Disease Predictor
            </div>
            <div onClick={() => checker("forum")} className=" cursor-pointer">
              Chat Forum
            </div>
          </div>
        </div>
        <div className="group col-span-full  md:col-span-4">
          <div className="group flex justify-between items-center bg-white p-2 rounded-full">
            <input
              type="text"
              placeholder="enter email"
              readOnly="true"
              className=" outline-none w-full px-4"
            />
            <div className="button flex text-sm p-3 bg-gray-700 text-white rounded-full">
              <img src="" alt="" />
              Submit
            </div>
          </div>
          <p className="pt-3">
            Subscribe to our newsletter for update on our initiatives
          </p>
          <div className=" flex flex-col">
            <Link to="/privacy-policy" className="text-sm underline pt-3 " onClick={() => window.scrollTo(0, 0)}>
              Privacy Policy
            </Link>
            <Link to="/privacy-policy" className="text-sm underline " onClick={() => window.scrollTo(0, 0)}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
