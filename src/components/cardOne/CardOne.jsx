

export default function CardOne({image, title, icon, subtitle, btnText }) {
  return (
    <div className=" card w-[100%] md:w-[500px]">
            <img src={image} className=' h-10' alt="" />
        <div className="right flex flex-col">
            <div className="heading text-[.9rem] md:text-[1rem]">
           {title}
            </div>
            <div className="card__text">
          {subtitle}
            </div>
            <div className="bottom mt-3">
                <button className="small__btn">
                    {btnText}
                    <img src={icon} alt="" className=' h-5' />
                </button>
            </div>
        </div>
    </div>
  )
}
