import { Link } from "react-router-dom";

export default function AccountCard({ image, title, icon, subtitle, link }) {
  return (
    <Link to={link} className=" accountCard w-[100%]">
      <div className="flex items-center justify-center">
        <img
          src={image}
          className="  w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px] object-cover ml-4"
          alt=""
        />
      </div>
      <div className=" flex flex-col">
        <div className="heading text-[.95rem] md:text-[1.1rem]">{title}</div>
        <div className="card__text ">{subtitle}</div>
      </div>
      <div className="bottom flex items-center justify-center">
        <img src={icon} alt="" className="" />
      </div>
    </Link>
  );
}
