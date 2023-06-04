
// eslint-disable-next-line react/prop-types
export default function Cardcolor({image, title, text}) {
  return (
    <div className=" h-[145px] w-[145px] bg-contain flex flex-col text-center justify-center items-center" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover'}} >
        <div className="top font-black text-[1.5rem]">
        {title}
        </div>
        <small className="text  px-5">
      {text}
        </small>
    </div>
  )
}
