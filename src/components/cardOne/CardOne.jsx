import cardImg from '../../assets/icons/search-icons/search-icon-green.svg'
import arrow from '../../assets/icons/arrow-icons/next-icon-green.svg'

export default function CardOne() {
  return (
    <div className=" card w-[100%] md:w-[500px]">
            <img src={cardImg} className=' h-10' alt="" />
        <div className="right flex flex-col">
            <div className="heading text-[.9rem] md:text-[1rem]">
            Discover a vet in your area
            </div>
            <div className="card__text">
            Discover nearby veterinarians who can provide quality vet care for your pets/livestock via our platform.
            </div>
            <div className="bottom mt-3">
                <button className="small__btn">
                    Browse now
                    <img src={arrow} alt="" className=' h-5' />
                </button>
            </div>
        </div>
    </div>
  )
}
